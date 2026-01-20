"use client"

import AuthForm from "@/components/auth/AuthForm"
import { useAuthStore } from "@/stores/auth"
import { useEffect, useRef } from "react"

const AuthPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const hasRedirected = useRef(false)

  useEffect(() => {
    // Faqat bir marta redirect qilish
    if (isAuthenticated && user && !hasRedirected.current) {
      hasRedirected.current = true
      
      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"
      
      window.location.href = redirectUrl
    }
  }, [isAuthenticated, user])

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
