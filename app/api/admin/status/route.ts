import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !['unread', 'read', 'replied'].includes(status)) {
      return NextResponse.json({ error: 'Invalid parameters provided.' }, { status: 400 });
    }

    const updated = await (prisma as any).inquiry.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Status Patch API Error:', error);
    return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 });
  }
}