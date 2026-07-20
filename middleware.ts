// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic tracking map for demonstration (resets on instance spin-down)
interface RateLimitData {
  count: number;
  resetTime: number;
}

const ipCache = new Map<string, RateLimitData>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 🎯 FIXED: Extract IP from headers safely instead of using non-existent request.ip
  const ip = 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    '127.0.0.1';

  // 1. Core Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "upgrade-insecure-requests");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // 2. Targeted Rate Limiting for the Waitlist API
  if (request.nextUrl.pathname.startsWith('/api/waitlist')) {
    const now = Date.now();
    const clientData = ipCache.get(ip);

    if (!clientData || now > clientData.resetTime) {
      // Window expired or first visit: allow 5 requests per minute
      ipCache.set(ip, { count: 1, resetTime: now + 60000 });
    } else {
      clientData.count++;
      if (clientData.count > 5) {
        return new NextResponse(
          JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};