import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function POST(req: NextRequest) {
  try {
    const { inquiryId, message, adminEmail } = await req.json();

    if (!inquiryId || !message.trim()) {
      return NextResponse.json({ error: 'Missing log constraints.' }, { status: 400 });
    }

    // Execute the write operations safely inside an atomic transaction block
    const [replyLog] = await prisma.$transaction([
      prisma.inquiryReply.create({
        data: {
          inquiryId,
          message: message.trim(),
          adminEmail: adminEmail || 'Admin'
        }
      }),
      prisma.inquiry.update({
        where: { id: inquiryId },
        data: { status: 'replied' }
      })
    ]);

    return NextResponse.json(replyLog, { status: 201 });
  } catch (error) {
    console.error('Reply processing failure:', error);
    return NextResponse.json({ error: 'Could not log execution thread.' }, { status: 500 });
  }
}