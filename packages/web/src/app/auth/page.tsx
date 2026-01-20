"use client"

import AuthForm from "@/components/auth/AuthForm"
import { useAuthStore } from "@/stores/auth"
import { useEffect, useRef, useState } from "react"

const AuthPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const [hasHydrated, setHasHydrated] = useState(false)
  const hasRedirected = useRef(false)

  // Client-side hydration tracking
  useEffect(() => {
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    // Zustand hydration kutish
    if (!hasHydrated) return

    // Redirect loop oldini olish
    if (hasRedirected.current) return

    // Faqat bir marta redirect qilish
    if (isAuthenticated && user) {
      hasRedirected.current = true

      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"

      window.location.href = redirectUrl
    }
  }, [isAuthenticated, user, hasHydrated])

  // Hydration kutilmoqda
  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    )
  }

  // Agar redirect bo'layotgan bo'lsa, loading ko'rsatish
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
