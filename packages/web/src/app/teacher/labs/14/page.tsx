"use client"

import TransformerSimulator from "@/components/labs/TransformerSimulator"
import Link from "next/link"

export default function Lab14Page() {
  return (
    <div className="space-y-6">
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
              <span className="font-medium text-gray-900">Laboratoriya 14</span>
            </div>

            {/* Sarlavha */}
            <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Labaratoriya ishi №14
                  </h1>
                  <h2 className="text-xl font-semibold text-orange-700 sm:text-2xl">
                    Transformator F.I.K. va o&apos;zgaruvchan tok qonunlari
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-orange-600 bg-orange-50 px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-orange-700">14</div>
                  <div className="text-sm text-gray-600">Laboratoriya</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Davomiyligi
                  </p>
                  <p className="text-lg font-bold text-gray-900">65 daqiqa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Qiyinchilik darajasi
                  </p>
                  <p className="text-lg font-bold text-gray-900">Qiyin</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Bo&apos;lim</p>
                  <p className="text-lg font-bold text-gray-900">
                    O&apos;zgaruvchan tok
                  </p>
                </div>
              </div>
            </div>

            {/* Maqsad */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  🎯
                </span>
                Maqsad
              </h3>
              <ul className="ml-12 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-700"></span>
                  <span>
                    O&apos;ramlar nisbati orqali kuchlanish va tok nisbatlarini
                    amaliy tahlil qilish.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-700"></span>
                  <span>
                    F.I.K. va yo&apos;qotishlar (mis, yadro) sabablarini muhokama
                    qilish.
                  </span>
                </li>
              </ul>
            </div>

            {/* Nazariya */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  📖
                </span>
                Nazariy asos
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-5">
                  <p className="text-sm font-semibold text-gray-700">
                    Transformatsiya:
                  </p>
                  <p className="mt-2 text-center text-2xl font-extrabold text-orange-700">
                    V₂/V₁ = N₂/N₁
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Ideal holda quvvat taxminan saqlanadi: Pout ≈ Pin.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-semibold text-gray-700">F.I.K.:</p>
                  <p className="mt-2 text-center text-2xl font-extrabold text-amber-700">
                    η = Pout/Pin
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Yo&apos;qotishlar: Joule yo&apos;qotishlari, gisterezis, girdob toklar.
                  </p>
                </div>
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
              <TransformerSimulator />
            </div>
    </div>
  )
}
