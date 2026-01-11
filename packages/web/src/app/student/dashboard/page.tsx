"use client"

import { useAuthStore } from "@eduarena/web/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    if (user && user.user_type !== "student") {
      router.push("/teacher/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.user_type !== "student") {
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
            Student Dashboard - Tez orada tayyor bo'ladi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              O'yinlarga qo'shilish
            </h3>
            <p className="text-gray-600">Mavjud test o'yinlariga qo'shiling</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Dars materiallari
            </h3>
            <p className="text-gray-600">Video va PDF materiallarni ko'ring</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Simulyatorlar
            </h3>
            <p className="text-gray-600">Fizik tajribalarni virtual bajarish</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
