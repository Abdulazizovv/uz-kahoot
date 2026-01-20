"use client"

import AuthForm from "@/components/auth/AuthForm"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AuthPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Already authenticated, redirect to dashboard
      if (user.user_type === "student") {
        window.location.href = "/student/dashboard"
      } else if (user.user_type === "teacher") {
        window.location.href = "/teacher/dashboard"
      }
    }
  }, [isAuthenticated, user])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  )
}

export default AuthPage
