/**
 * POLANITAS — Middleware
 *
 * Auth bypass: Login and registration features are removed.
 * Any visits to /login, /register, or /setup-profile are directly redirected to /dashboard.
 * All /dashboard routes are publicly accessible without authentication.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect auth pages directly to /dashboard
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/setup-profile"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public/ assets
     */
    "/((?!_next/static|_next/image|favicon.ico|logo/|public/).*)",
  ],
};

