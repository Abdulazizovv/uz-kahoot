"use client"

import { useAuthStore } from "@/stores/auth"
import { useEffect, useRef } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: ("student" | "teacher")[]
}

export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const hasRedirected = useRef(false)

  useEffect(() => {
    // Hydration kutish
    if (!isHydrated) return

    // Redirect loop oldini olish
    if (hasRedirected.current) return

    // Autentifikatsiya tekshiruvi
    if (!isAuthenticated || !user) {
      hasRedirected.current = true
      window.location.href = "/auth"
      return
    }

    // Rol tekshiruvi
    if (allowedUserTypes && !allowedUserTypes.includes(user.user_type)) {
      hasRedirected.current = true
      const redirectUrl =
        user.user_type === "student"
          ? "/student/dashboard"
          : "/teacher/dashboard"
      window.location.href = redirectUrl
    }
  }, [isAuthenticated, user, allowedUserTypes, isHydrated])

  // Hydration kutilmoqda
  if (!isHydrated) {
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

  // Autentifikatsiya kutilmoqda
  if (!isAuthenticated || !user) {
    return null // Redirect bo'layotganda hech narsa ko'rsatmaslik
  }

  // Rol tekshiruvi
  if (allowedUserTypes && !allowedUserTypes.includes(user.user_type)) {
    return null // Redirect bo'layotganda hech narsa ko'rsatmaslik
  }

  return <>{children}</>
}
