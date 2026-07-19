import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { preferences, userAgent, location, anonymousId } = body;

    if (!preferences || !anonymousId) {
      return NextResponse.json({ error: 'Missing core consent parameters.' }, { status: 400 });
    }

    const consentLog = await prisma.cookieConsentLog.create({
      data: {
        anonymousId,
        necessary: preferences.necessary,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        userAgent: userAgent || 'Unknown',
        country: location?.country || null,
        city: location?.city || null,
      },
    });

    return NextResponse.json({ success: true, id: consentLog.id }, { status: 201 });
  } catch (error) {
    console.error('Consent Logging Error:', error);
    return NextResponse.json({ error: 'Internal audit tracking failure.' }, { status: 500 });
  }
}