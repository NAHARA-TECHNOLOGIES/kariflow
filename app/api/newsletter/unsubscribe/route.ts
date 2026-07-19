import { NextRequest, NextResponse } from 'next/server';
// 🎯 Import your central instance instead (adjust this path to where your db instance actually lives)
import { prisma } from '@/libs/db'; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email address parameter is required.' }, 
        { status: 400 }
      );
    }

    const targetEmail = email.trim().toLowerCase();

    // 1. Look up subscriber using your global 'db' instance
    const existingSubscriber = await prisma.waitlist.findUnique({
      where: { email: targetEmail },
    });

    if (!existingSubscriber) {
      return NextResponse.json(
        { error: 'This email address could not be found on our active subscription record lists.' }, 
        { status: 444 }
      );
    }

    // 2. Delete subscriber using your global 'db' instance
    await prisma.waitlist.delete({
      where: { email: targetEmail },
    });

    return NextResponse.json(
      { success: true, message: 'Successfully removed record subscription parameters.' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('API Newsletter Unsubscribe Error:', error);
    return NextResponse.json(
      { error: 'Internal system engine processing failures encountered during execution.' }, 
      { status: 500 }
    );
  }
}