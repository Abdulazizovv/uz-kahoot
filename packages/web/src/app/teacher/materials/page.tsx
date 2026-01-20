"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

export default function TeacherMaterialsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Ma'ruza matnlar
            </h1>
            <p className="mt-1 text-gray-600">
              Talabalar uchun dars materiallari va ma'ruzalar
            </p>
          </div>

          {/* Under Development Notice */}
          <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
            <div className="max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-100">
                <svg
                  className="h-16 w-16 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ishlab chiqish jarayonida
              </h2>
              <p className="mt-3 text-gray-600">
                Bu bo'lim hozirda ishlab chiqilmoqda. Tez orada bu yerda dars
                materiallari va ma'ruza matnlarini yuklash, tahrirlash va
                talabalar bilan ulashish imkoniyati mavjud bo'ladi.
              </p>

              {/* Features Preview */}
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Qo'shilishi rejalashtirilgan imkoniyatlar:
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Materiallar yuklash
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        PDF, Word, PowerPoint va boshqa formatdagi fayllarni
                        yuklash
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-green-100 p-2">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Mavzular bo'yicha tashkil qilish
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Ma'ruzalarni mavzular va fanlar bo'yicha papkalarga
                        ajratish
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <svg
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Guruhlar bilan ulashish
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Materiallarni tanlangan guruhlar bilan ulashish va
                        ruxsatlarni boshqarish
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <svg
                        className="h-6 w-6 text-orange-600"
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Ko'rish statistikasi
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Talabalar tomonidan materiallarning ko'rilishi va yuklab
                        olinishini kuzatish
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-teal-100 p-2">
                      <svg
                        className="h-6 w-6 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Izohlar va savol-javoblar
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Talabalar bilan material bo'yicha muhokama va savollar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="rounded-lg bg-pink-100 p-2">
                      <svg
                        className="h-6 w-6 text-pink-600"
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
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        Versiyalarni boshqarish
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Materiallarni yangilash va eski versiyalarni saqlash
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900">
                      Qo'shimcha ma'lumot
                    </p>
                    <p className="mt-1 text-sm text-blue-700">
                      Bu bo'lim talabalarning o'qish jarayonini
                      yengillashtirishga va o'qituvchilarga dars materiallari
                      bilan ishlashni qulay qilishga mo'ljallangan. Barcha
                      yuklanadigan materiallar xavfsiz serverda saqlanadi va
                      faqat ruxsat etilgan guruhlar tomonidan ko'rish mumkin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
