import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

/**
 * Parse auth data from localStorage-based cookie
 * Zustand persist stores data in a specific format in cookies
 */
function parseAuthCookie(cookieValue: string | undefined): {
  isAuthenticated: boolean
  userType: "student" | "teacher" | null
} {
  if (!cookieValue) {
    return { isAuthenticated: false, userType: null }
  }

  try {
    // Decode URL-encoded cookie value
    const decoded = decodeURIComponent(cookieValue)
    const data = JSON.parse(decoded)

    // Check for auth state in the parsed data
    // The structure depends on how Zustand persist stores the data
    const state = data.state || data
    const isAuthenticated = state.isAuthenticated === true
    const userType = state.user?.user_type || null

    return { isAuthenticated, userType }
  } catch (error) {
    // Cookie parsing failed, treat as unauthenticated
    console.error("Failed to parse auth cookie:", error)
    return { isAuthenticated: false, userType: null }
  }
}

/**
 * Next.js Middleware for server-side authentication and authorization
 * Handles redirects before page renders to prevent flash of wrong content
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Parse auth-storage cookie (contains Zustand persisted state)
  const authCookie = request.cookies.get("auth-storage")?.value
  const { isAuthenticated, userType } = parseAuthCookie(authCookie)

  // Handle root path redirect
  if (pathname === "/") {
    if (isAuthenticated && userType) {
      const dashboardUrl =
        userType === "student" ? "/student/dashboard" : "/teacher/dashboard"
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Handle /auth page
  if (pathname === "/auth") {
    // Redirect authenticated users away from auth page
    if (isAuthenticated && userType) {
      const dashboardUrl =
        userType === "student" ? "/student/dashboard" : "/teacher/dashboard"
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }
    // Let unauthenticated users access auth page
    return NextResponse.next()
  }

  // Handle /student/* routes
  if (pathname.startsWith("/student")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
    // Validate user type matches route
    if (userType !== "student") {
      return NextResponse.redirect(new URL("/teacher/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Handle /teacher/* routes
  if (pathname.startsWith("/teacher")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
    // Validate user type matches route
    if (userType !== "teacher") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/student/:path*",
    "/teacher/:path*",
    // Exclude API routes, static files, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|sounds).*)",
  ],
}
