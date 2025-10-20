import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware disabled for now - authentication handled client-side
  // This prevents blocking of login page and other admin routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};