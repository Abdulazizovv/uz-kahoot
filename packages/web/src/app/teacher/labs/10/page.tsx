"use client"

import StraightWireCoilSimulator from "@/components/labs/StraightWireCoilSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function Lab10Page() {
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
              <span className="font-medium text-gray-900">Laboratoriya 10</span>
            </div>

            {/* Sarlavha */}
            <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Labaratoriya ishi №10
                  </h1>
                  <h2 className="text-xl font-semibold text-sky-700 sm:text-2xl">
                    To&apos;g&apos;ri o&apos;tkazgich va solenoidning magnit maydoni
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-sky-600 bg-sky-50 px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-sky-700">10</div>
                  <div className="text-sm text-gray-600">Laboratoriya</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Davomiyligi
                  </p>
                  <p className="text-lg font-bold text-gray-900">55 daqiqa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Qiyinchilik darajasi
                  </p>
                  <p className="text-lg font-bold text-gray-900">O&apos;rta</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Bo&apos;lim</p>
                  <p className="text-lg font-bold text-gray-900">
                    Elektromagnetizm
                  </p>
                </div>
              </div>
            </div>

            {/* Maqsad */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  🎯
                </span>
                Maqsad
              </h3>
              <ul className="ml-12 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-700"></span>
                  <span>
                    To&apos;g&apos;ri sim atrofidagi magnit induksiya{" "}
                    <span className="font-mono">B ~ 1/r</span> bog&apos;lanishini
                    tushuntirish.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-700"></span>
                  <span>
                    Solenoid ichida{" "}
                    <span className="font-mono">B = μ₀ (N/L) I</span> ning
                    chiziqliligini ko&apos;rsatish.
                  </span>
                </li>
              </ul>
            </div>

            {/* Nazariya */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  📖
                </span>
                Nazariy asos
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-2 border-sky-200 bg-sky-50 p-5">
                  <p className="text-sm font-semibold text-gray-700">
                    To&apos;g&apos;ri sim:
                  </p>
                  <p className="mt-2 text-center text-2xl font-extrabold text-sky-700">
                    B = μ₀ I / (2πr)
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    r — masofa (m), I — tok (A).
                  </p>
                </div>
                <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-5">
                  <p className="text-sm font-semibold text-gray-700">
                    Solenoid:
                  </p>
                  <p className="mt-2 text-center text-2xl font-extrabold text-indigo-700">
                    B = μ₀ (N/L) I
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    N — o&apos;ramlar soni, L — uzunlik (m).
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border-l-4 border-sky-600 bg-sky-50 p-4 text-sm text-gray-700">
                O&apos;quvchilarga birliklarni (T, mT, µT) to&apos;g&apos;ri tanlash va
                r ni metrga o&apos;tkazish eslatib o&apos;tiladi.
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
              <StraightWireCoilSimulator />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

