"use client"

import AuthForm from "@eduarena/web/components/auth/AuthForm"
import { useAuthStore } from "@eduarena/web/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AuthPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Already authenticated, redirect to dashboard
      if (user.user_type === "student") {
        router.push("/student/dashboard")
      } else if (user.user_type === "teacher") {
        router.push("/teacher/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  )
}

export default AuthPage
