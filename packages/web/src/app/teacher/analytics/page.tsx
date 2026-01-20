"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

export default function TeacherAnalyticsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Statistika</h1>
            <p className="mt-1 text-gray-600">
              Talabalar faoliyati va o'zlashtirish ko'rsatkichlari
            </p>
          </div>

          {/* Under Development Notice */}
          <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                <svg
                  className="h-16 w-16 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ishlab chiqish jarayonida
              </h2>
              <p className="mt-3 max-w-md text-gray-600">
                Bu bo'lim hozirda ishlab chiqilmoqda. Tez orada to'liq
                statistika, grafiklar, hisobotlar va tahlillar mavjud bo'ladi.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <svg
                    className="mb-2 h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">
                    Grafiklar
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <svg
                    className="mb-2 h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">
                    O'zlashtirish
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-600"
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
                  <span className="text-xs font-medium text-gray-700">
                    Faollik
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <svg
                    className="mb-2 h-8 w-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">
                    Hisobotlar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
