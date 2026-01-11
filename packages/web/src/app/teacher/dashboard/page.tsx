"use client"

import { useAuthStore } from "@eduarena/web/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const TeacherDashboard = () => {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    if (user && user.user_type !== "teacher") {
      router.push("/student/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.user_type !== "teacher") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Salom, {user.first_name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Teacher Dashboard - Tez orada tayyor bo'ladi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Test yaratish
            </h3>
            <p className="text-gray-600">Yangi o'yin testlari yaratish</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Sinf boshqarish
            </h3>
            <p className="text-gray-600">
              O'quvchilarni va sinflarni boshqarish
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Analytics
            </h3>
            <p className="text-gray-600">Natijalarni tahlil qilish</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
