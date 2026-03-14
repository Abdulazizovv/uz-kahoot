"use client"

import EarthMagneticFieldSimulator from "@/components/labs/EarthMagneticFieldSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function Lab11Page() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0 lg:ml-72">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 sm:p-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
              <Link href="/teacher/dashboard" className="hover:text-blue-600">
                Bosh sahifa
              </Link>
              <span>/</span>
              <Link href="/teacher/labs" className="hover:text-blue-600">
                Laboratoriyalar
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">Laboratoriya 11</span>
            </div>

            {/* Sarlavha */}
            <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Labaratoriya ishi №11
                  </h1>
                  <h2 className="text-xl font-semibold text-emerald-700 sm:text-2xl">
                    Yer magnit maydonini o&apos;lchash (Tangens-galvanometr)
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-emerald-600 bg-emerald-50 px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-emerald-700">11</div>
                  <div className="text-sm text-gray-600">Laboratoriya</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Davomiyligi
                  </p>
                  <p className="text-lg font-bold text-gray-900">60 daqiqa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Qiyinchilik darajasi
                  </p>
                  <p className="text-lg font-bold text-gray-900">Qiyin</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Bo&apos;lim</p>
                  <p className="text-lg font-bold text-gray-900">Geomagnetizm</p>
                </div>
              </div>
            </div>

            {/* Maqsad */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  🎯
                </span>
                Maqsad
              </h3>
              <ul className="ml-12 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-700"></span>
                  <span>
                    Tangens qonuni orqali Yer maydonining gorizontal tashkil
                    etuvchisini aniqlash.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-700"></span>
                  <span>
                    θ diapazoni tanlash va o&apos;lchash xatoligini muhokama qilish.
                  </span>
                </li>
              </ul>
            </div>

            {/* Nazariya */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  📖
                </span>
                Nazariy asos
              </h3>
              <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-6">
                <p className="mb-2 text-center text-sm font-semibold text-gray-700">
                  Tangens-galvanometr:
                </p>
                <p className="text-center text-3xl font-extrabold text-emerald-700">
                  tanθ = B<sub>coil</sub> / B<sub>earth</sub>
                </p>
                <div className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                  <p>
                    <strong>Bcoil</strong> = μ₀ N I / (2R)
                  </p>
                  <p>
                    <strong>Bearth</strong> = Bcoil / tanθ
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border-l-4 border-teal-600 bg-teal-50 p-4 text-sm text-gray-700">
                θ juda kichik bo&apos;lsa tanθ kichrayadi va hisob natijasi beqaror
                bo&apos;lishi mumkin. Amaliy mashg&apos;ulotda 25–65° qulay.
              </div>
            </div>

            {/* Simulator */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  🔬
                </span>
                Interaktiv simulator
              </h3>
              <EarthMagneticFieldSimulator />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

