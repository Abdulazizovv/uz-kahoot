"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

export default function TeacherQuizzesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Testlar</h1>
            <p className="mt-1 text-gray-600">
              Talabalar uchun testlar yaratish va boshqarish
            </p>
          </div>

          {/* Under Development Notice */}
          <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                <svg
                  className="h-16 w-16 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ishlab chiqish jarayonida
              </h2>
              <p className="mt-3 max-w-md text-gray-600">
                Bu bo'lim hozirda ishlab chiqilmoqda. Tez orada testlar
                yaratish, natijalarni ko'rish va tahlil qilish imkoniyatlari
                qo'shiladi.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Test yaratish
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Natijalar
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Tahlil
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
