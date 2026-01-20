"use client"

import ElectrostaticsSimulator from "@eduarena/web/components/labs/ElectrostaticsSimulator"
import Header from "@eduarena/web/components/teacher/Header"
import Sidebar from "@eduarena/web/components/teacher/Sidebar"
import { useAuthStore } from "@eduarena/web/stores/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Lab1Page = () => {
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex-1">
        <Header />

        <main className="p-8">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/teacher/labs" className="hover:text-blue-600">
              Laboratoriyalar
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Lab 1</span>
          </div>

          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-5xl">⚡</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Elektrostatikaning asosiy tajribalari
                  </h1>
                  <p className="text-gray-600">
                    Elektrometrik kuchaytirgich yordamida elektrostatik
                    hodisalarni o'rganish
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  O'rta
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  45 daqiqa
                </span>
              </div>
            </div>
            <Link
              href="/teacher/labs"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-all hover:shadow-md"
            >
              ← Orqaga
            </Link>
          </div>

          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              🎯 Maqsadlar
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>Kulonning qonunini amalda tasdiqlash</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>
                  Zaryadlangan jismlar orasidagi ta'sir kuchini o'lchash
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>Elektr maydon kuchlanganligini hisoblash</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>
                  Zaryadlar orasidagi tortish va itarish hodisalarini o'rganish
                </span>
              </li>
            </ul>
          </div>

          <ElectrostaticsSimulator />
        </main>
      </div>
    </div>
  )
}

export default Lab1Page
