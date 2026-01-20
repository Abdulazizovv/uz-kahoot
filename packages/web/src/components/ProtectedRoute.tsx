"use client"

import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import { LoadingScreen } from "./LoadingScreen"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: ("student" | "teacher")[]
}

/**
 * ProtectedRoute Component
 * Provides client-side route protection with proper hydration handling
 * Server-side protection is handled by middleware.ts
 */
export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const router = useRouter()
  const hasRedirectedRef = useRef(false)

  // Memoize user type check to prevent unnecessary re-renders
  const isAuthorized = useMemo(() => {
    if (!user || !allowedUserTypes) return true
    return allowedUserTypes.includes(user.user_type)
  }, [user, allowedUserTypes])

  useEffect(() => {
    // Wait for hydration to complete before any auth checks
    if (!isHydrated) return

    // Prevent multiple redirect attempts
    if (hasRedirectedRef.current) return

    // Check authentication status
    if (!isAuthenticated || !user) {
      hasRedirectedRef.current = true
      router.replace("/auth")
      return
    }

    // Check authorization (user type matches allowed types)
    if (!isAuthorized) {
      hasRedirectedRef.current = true
      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"
      router.replace(redirectUrl)
      return
    }

    // Cleanup function to reset redirect flag
    return () => {
      hasRedirectedRef.current = false
    }
  }, [isHydrated, isAuthenticated, user, isAuthorized, router])

  // Show loading screen while waiting for hydration
  if (!isHydrated) {
    return <LoadingScreen message="Yuklanmoqda..." />
  }

  // Show loading during authentication check
  if (!isAuthenticated || !user) {
    return null // Middleware should redirect, but show nothing while it happens
  }

  // Show loading during authorization check
  if (!isAuthorized) {
    return null // Middleware should redirect, but show nothing while it happens
  }

  // User is authenticated and authorized, render children
  return <>{children}</>
}
