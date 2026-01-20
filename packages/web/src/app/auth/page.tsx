"use client"

import AuthForm from "@/components/auth/AuthForm"
import { useAuthStore } from "@/stores/auth"
import { useEffect, useRef } from "react"

const AuthPage = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const hasRedirected = useRef(false)

  useEffect(() => {
    // Hydration kutish
    if (!isHydrated) return

    // Redirect loop oldini olish
    if (hasRedirected.current) return

    // Autentifikatsiyalangan bo'lsa dashboard'ga yo'naltirish
    if (isAuthenticated && user) {
      hasRedirected.current = true
      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"
      window.location.href = redirectUrl
    }
  }, [isAuthenticated, user, isHydrated])

  // Hydration kutilmoqda
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    )
  }

  // Redirect bo'layotganda
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-white">Yo'naltirilmoqda...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  )
}

export default AuthPage
