"use client"

import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: ("student" | "teacher")[]
}

export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Autentifikatsiya tekshiruvi
    if (!isAuthenticated || !user) {
      router.push("/auth")
      return
    }

    // Rol tekshiruvi
    if (allowedUserTypes && !allowedUserTypes.includes(user.user_type)) {
      // Noto'g'ri rol - o'z dashboard'iga yo'naltirish
      if (user.user_type === "student") {
        router.push("/student/dashboard")
      } else if (user.user_type === "teacher") {
        router.push("/teacher/dashboard")
      }
    }
  }, [isAuthenticated, user, allowedUserTypes, router])

  // Autentifikatsiya kutilmoqda
  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Yuklanmoqda...
          </p>
        </div>
      </div>
    )
  }

  // Rol tekshiruvi
  if (allowedUserTypes && !allowedUserTypes.includes(user.user_type)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Yo'naltirilmoqda...
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
