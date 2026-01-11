import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Get token from cookies or headers
  const token = request.cookies.get("auth-storage")?.value

  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/student", "/teacher"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (isProtectedRoute && !token) {
    // Redirect to auth if no token
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // If authenticated and trying to access auth page, redirect to dashboard
  if (pathname === "/auth" && token) {
    // We can't parse the token here easily, so let the page handle it
    // This is a basic check
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
