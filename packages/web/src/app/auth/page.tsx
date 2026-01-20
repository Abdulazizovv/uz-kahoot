"use client"

import AuthForm from "@/components/auth/AuthForm"
import { LoadingScreen } from "@/components/LoadingScreen"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

/**
 * Authentication Page
 * Handles login/signup with proper hydration and redirect flow
 */
const AuthPage = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    // Wait for hydration to complete before any auth checks
    if (!isHydrated) return

    // Prevent multiple redirect attempts
    if (hasRedirectedRef.current) return

    // Redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      hasRedirectedRef.current = true
      setIsRedirecting(true)

      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"

      // Use router.replace() to avoid adding to history stack
      router.replace(redirectUrl)
    }

    // Cleanup function to reset redirect flag if component unmounts
    return () => {
      hasRedirectedRef.current = false
    }
  }, [isHydrated, isAuthenticated, user, router])

  // Show loading screen while waiting for hydration
  if (!isHydrated) {
    return <LoadingScreen message="Yuklanmoqda..." />
  }

  // Show redirecting state for authenticated users
  if (isRedirecting || (isAuthenticated && user)) {
    return <LoadingScreen message="Yo'naltirilmoqda..." />
  }

  // Show auth form for unauthenticated users
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  )
}

export default AuthPage
