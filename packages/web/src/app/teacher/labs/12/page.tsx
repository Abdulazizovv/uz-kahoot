"use client"

import FaradayInductionSimulator from "@/components/labs/FaradayInductionSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function Lab12Page() {
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
              <span className="font-medium text-gray-900">Laboratoriya 12</span>
            </div>

            {/* Sarlavha */}
            <div className="rounded-xl border border-violet-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Labaratoriya ishi №12
                  </h1>
                  <h2 className="text-xl font-semibold text-violet-700 sm:text-2xl">
                    Elektromagnit induksiya. Faradey qonuni
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-violet-600 bg-violet-50 px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-violet-700">12</div>
                  <div className="text-sm text-gray-600">Laboratoriya</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Davomiyligi
                  </p>
                  <p className="text-lg font-bold text-gray-900">50 daqiqa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Qiyinchilik darajasi
                  </p>
                  <p className="text-lg font-bold text-gray-900">O&apos;rta</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Bo&apos;lim</p>
                  <p className="text-lg font-bold text-gray-900">Induksiya</p>
                </div>
              </div>
            </div>

            {/* Maqsad */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                  🎯
                </span>
                Maqsad
              </h3>
              <ul className="ml-12 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-700"></span>
                  <span>
                    Magnit oqimining o&apos;zgarishidan induksiya EYuK hosil
                    bo&apos;lishini tushuntirish.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-700"></span>
                  <span>
                    Parametrlar (N, A, B₀, f) bilan εmax bog&apos;liqligini
                    eksperimental ko&apos;rsatish.
                  </span>
                </li>
              </ul>
            </div>

            {/* Nazariya */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700">
                  📖
                </span>
                Nazariy asos
              </h3>
              <div className="rounded-lg border-2 border-violet-200 bg-violet-50 p-6">
                <p className="mb-2 text-center text-sm font-semibold text-gray-700">
                  Faradey qonuni:
                </p>
                <p className="text-center text-3xl font-extrabold text-violet-700">
                  ε = -N dΦ/dt
                </p>
                <p className="mt-4 text-sm text-gray-700">
                  Φ = B·A, shuning uchun B(t) sinusoidal bo&apos;lsa ε(t) kosinusoidal
                  bo&apos;lib, faza bo&apos;yicha 90° siljiydi (Lents qoidasi manfiy
                  ishora orqali).
                </p>
              </div>
            </div>

            {/* Simulator */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  🔬
                </span>
                Interaktiv simulator
              </h3>
              <FaradayInductionSimulator />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

