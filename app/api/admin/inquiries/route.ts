import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function GET(_req: NextRequest) {
  try {
    // TODO: Integrate your NextAuth/Clerk admin session check check here!
    
    const inquiries = await prisma.inquiry.findMany({
      include: {
        replies: {
          orderBy: { sentAt: 'desc' }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    console.error('Inquiries Fetch API Error:', error);
    return NextResponse.json({ error: 'Internal server safety error.' }, { status: 500 });
  }
}