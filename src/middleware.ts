import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicApiRoutes = ['/api/enhance', '/api/analyze', '/api/image-prompt'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/') && !publicApiRoutes.includes(pathname)) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();

  response.headers.set('X-Robots-Tag', 'noindex, nofollow');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
