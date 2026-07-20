import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, frequency, categories } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const targetEmail = email.trim().toLowerCase();
    const targetFrequency = frequency || 'weekly';
    const categoryNames = Array.isArray(categories) ? categories : [];

    // Look up or connect the parsed categories in the database
    const upsertedCategories = await Promise.all(
      categoryNames.map(async (name: string) => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return prisma.category.upsert({
          where: { name },
          update: {},
          create: { name, slug },
        });
      })
    );

    // Upsert the subscriber record
    const subscriber = await prisma.waitlist.upsert({
      where: { email: targetEmail },
      update: {
        frequency: targetFrequency,
        categories: {
          set: upsertedCategories.map(c => ({ id: c.id })),
        },
      },
      create: {
        email: targetEmail,
        fullName: '',
        businessType: '',
        country: '',
        state: '',
        frequency: targetFrequency,
        categories: {
          connect: upsertedCategories.map(c => ({ id: c.id })),
        },
      },
    });

    // Check if this was an update or a new subscription
    const isUpdated = subscriber.updatedAt.getTime() - subscriber.createdAt.getTime() > 1000;

    return NextResponse.json({ success: true, updated: isUpdated }, { status: 200 });
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}