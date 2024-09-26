import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";

// Auth middleware for protected routes
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define paths that require authentication
  const isNotPublicPath = path === '/recipe_form' || path === '/profile' || path === '/auth/changePassword';
  const isAuthPath = path === '/logIn' || path === '/signUp';

  // Get JWT token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET! });

  // Redirect to login if user tries to access protected routes without a token
  if (isNotPublicPath && !token) {
    return NextResponse.redirect(new URL('/logIn', req.url));
  }

  // Redirect authenticated users away from login or signup pages
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Protects all routes except specific ones
};
