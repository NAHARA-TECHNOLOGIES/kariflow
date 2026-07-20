import { NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(categories, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}