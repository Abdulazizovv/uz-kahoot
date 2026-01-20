"use client"

import CapacitorSimulator from "@/components/labs/CapacitorSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import { useAuthStore } from "@/stores/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Lab2Page = () => {
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
            <span className="font-medium text-gray-900">Lab 2</span>
          </div>

          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-5xl">🔋</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Kondensatorlar elektr sig'imi
                  </h1>
                  <p className="text-gray-600">
                    Turli xil kondensatorlarning sig'imini aniqlash va tahlil
                    qilish
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Oson
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
                  30 daqiqa
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
                <span>
                  Kondensator sig'imini aniqlash formulasini o'rganish
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>Turli dielektriklarning ta'sirini taqqoslash</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>Kondensatorda saqlanadigan energiyani hisoblash</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600">✓</span>
                <span>Zaryadlash va razryadlash jarayonlarini kuzatish</span>
              </li>
            </ul>
          </div>

          <CapacitorSimulator />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                💡 Amaliy qo'llanish
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Elektron qurilmalarda energiya saqlash</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Filtr sxemalarida signal tozalash</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Quvvat omilini yaxshilash</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Flesh kameralarida</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                📊 Dielektriklar xususiyatlari
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium">Vakuum/Havo:</span>
                  <span className="font-semibold text-blue-600">εᵣ = 1</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium">Qog'oz:</span>
                  <span className="font-semibold text-blue-600">εᵣ = 3.7</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium">Shisha:</span>
                  <span className="font-semibold text-blue-600">εᵣ = 4.5</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium">Titan oksidi:</span>
                  <span className="font-semibold text-blue-600">εᵣ = 100</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Lab2Page
