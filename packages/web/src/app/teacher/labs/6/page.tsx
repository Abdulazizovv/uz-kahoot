"use client"

import HeatingDeviceSimulator from "@/components/labs/HeatingDeviceSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function Lab6Page() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-8">
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
              <span className="font-medium text-gray-900">Laboratoriya 6</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-bold text-white shadow-lg">
                  6
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Isitish qurilmalarining F.I.K.
                  </h1>
                  <p className="text-gray-600">
                    Elektr isitish qurilmalarining foydali ish koeffitsientini
                    aniqlash
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-lg border border-yellow-200 bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                  O'rta qiyinlik
                </span>
                <span className="rounded-lg border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                  55 daqiqa
                </span>
                <span className="rounded-lg border border-purple-200 bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
                  Termodinamika
                </span>
              </div>
            </div>

            {/* Maqsad */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                🎯 Laboratoriya maqsadi
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  Ushbu laboratoriya ishida talabalar elektr isitish
                  qurilmalarining foydali ish koeffitsientini (F.I.K.)
                  o'rganishadi va amaliy tajribalar orqali energiya
                  yo'qotishlarini tahlil qilishadi.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Elektr energiyasi
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sarflangan elektr energiyasini hisoblash
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Issiqlik energiyasi
                      </h3>
                      <p className="text-sm text-gray-600">
                        Foydali issiqlik energiyasini aniqlash
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-4">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        F.I.K. hisoblash
                      </h3>
                      <p className="text-sm text-gray-600">
                        Foydali ish koeffitsientini aniqlash
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4">
                    <span className="text-2xl">💨</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Yo'qotishlar tahlili
                      </h3>
                      <p className="text-sm text-gray-600">
                        Energiya yo'qotishlarini o'rganish
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nazariy qism */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                📖 Nazariy ma'lumotlar
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    1. Foydali Ish Koeffitsienti (F.I.K.)
                  </h3>
                  <p className="mb-3 leading-relaxed text-gray-700">
                    F.I.K. (η - eta) qurilma tomonidan sarflangan energiyaning
                    qancha qismi foydali ishga sarflanishini ko'rsatadi. U
                    quyidagi formula bilan hisoblanadi:
                  </p>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-center font-mono text-xl font-bold text-blue-900">
                      η = (Q₁ / Q) × 100%
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-gray-700">
                      <p>
                        • <strong>η</strong> - Foydali ish koeffitsienti (%)
                      </p>
                      <p>
                        • <strong>Q₁</strong> - Foydali energiya (suvni isitish
                        uchun sarflangan)
                      </p>
                      <p>
                        • <strong>Q</strong> - Sarflangan elektr energiyasi
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    2. Sarflangan elektr energiyasi
                  </h3>
                  <p className="mb-3 leading-relaxed text-gray-700">
                    Elektr isitgich tomonidan sarflangan energiya:
                  </p>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <p className="text-center font-mono text-xl font-bold text-purple-900">
                      Q = P × t = U × I × t
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-gray-700">
                      <p>
                        • <strong>P</strong> - Quvvat (Watt)
                      </p>
                      <p>
                        • <strong>U</strong> - Kuchlanish (Volt)
                      </p>
                      <p>
                        • <strong>I</strong> - Tok kuchi (Amper)
                      </p>
                      <p>
                        • <strong>t</strong> - Vaqt (sekund)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    3. Moddani isitish uchun zarur energiya
                  </h3>
                  <p className="mb-3 leading-relaxed text-gray-700">
                    Suvni ma'lum haroratgacha isitish uchun zarur bo'lgan
                    issiqlik miqdori:
                  </p>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-center font-mono text-xl font-bold text-green-900">
                      Q₁ = m × c × Δt
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-gray-700">
                      <p>
                        • <strong>m</strong> - Suv massasi (kg)
                      </p>
                      <p>
                        • <strong>c</strong> - Solishtirma issiqlik sig'imi
                        (J/(kg·K))
                      </p>
                      <p>
                        • <strong>Δt</strong> - Harorat o'zgarishi (K yoki °C)
                      </p>
                      <p>• Suv uchun: c = 4200 J/(kg·K)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    4. Energiya yo'qotishlari
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Real sharoitlarda energiyaning bir qismi quyidagi yo'llar
                    bilan yo'qotiladi:
                  </p>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">▸</span>
                      <span>
                        Issiqlik o'tkazuvchanlik orqali atrof-muhitga tarqalish
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">▸</span>
                      <span>
                        Konveksiya (issiq suvning harakati) orqali yo'qotish
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">▸</span>
                      <span>Issiqlik nurlanishi orqali yo'qotish</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">▸</span>
                      <span>Bug'lanish jarayonida energiya yo'qotish</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">
                    ⚠️ Muhim eslatma:
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Haqiqiy isitish qurilmalarida F.I.K. odatda 60-85%
                    oralig'ida bo'ladi. 100% ga yaqin qiymatlar ideal holat
                    bo'lib, amalda amalga oshirilmaydi, chunki energiya
                    yo'qotishlarini butunlay bartaraf etish mumkin emas. Yaxshi
                    izolyatsiya va zamonaviy texnologiyalar F.I.K. ni oshirishga
                    yordam beradi.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulator */}
            <div className="mb-8">
              <div className="mb-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  🔬 Interaktiv Simulator
                </h2>
                <p className="text-gray-700">
                  Quyidagi simulyator yordamida turli parametrlarni o'zgartirib,
                  isitish qurilmasining F.I.K. ini aniqlang va energiya
                  yo'qotishlarini tahlil qiling.
                </p>
              </div>

              <HeatingDeviceSimulator />
            </div>

            {/* Topshiriqlar */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                📝 Amaliy topshiriqlar
              </h2>

              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Topshiriq 1: Standart sharoitda F.I.K. aniqlash
                  </h3>
                  <p className="mb-3 text-sm text-gray-700">
                    Quyidagi parametrlar bilan isitgichning F.I.K. ini
                    hisoblang:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Kuchlanish: U = 220 V</li>
                    <li>• Tok kuchi: I = 5 A</li>
                    <li>• Vaqt: t = 10 daqiqa</li>
                    <li>• Suv massasi: m = 2 kg</li>
                    <li>• Boshlang'ich harorat: t₁ = 20°C</li>
                    <li>• Yakuniy harorat: t₂ = 80°C</li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Topshiriq 2: Quvvatning F.I.K. ga ta'siri
                  </h3>
                  <p className="text-sm text-gray-700">
                    Tok kuchini 2 A dan 8 A gacha o'zgartirib, quvvatning F.I.K.
                    ga ta'sirini tekshiring. Natijalarni taqqoslang va xulosalar
                    chiqaring.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Topshiriq 3: Suv massasining ta'siri
                  </h3>
                  <p className="text-sm text-gray-700">
                    Suv massasini 0.5 kg dan 5 kg gacha o'zgartiring. Massa
                    ortishi bilan F.I.K. qanday o'zgarishini kuzating. Sabablari
                    haqida fikr bildiring.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Topshiriq 4: Optimal rejimni aniqlash
                  </h3>
                  <p className="text-sm text-gray-700">
                    Turli parametrlar kombinatsiyasini sinab ko'rib, eng yuqori
                    F.I.K. ga erishadigan optimal isitish rejimini aniqlang.
                    Topilgan rejimni asoslang.
                  </p>
                </div>
              </div>
            </div>

            {/* Xulosa */}
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                ✅ Xulosa va tavsiyalar
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  Elektr isitish qurilmalarining F.I.K. ko'p omillarga bog'liq:
                  isitgichning quvvati, suv massasi, issiqlik izolyatsiyasi,
                  isitish vaqti va boshqalar. Yuqori F.I.K. ga erishish uchun:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-600">✓</span>
                    <span>Yaxshi issiqlik izolyatsiyasidan foydalaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-600">✓</span>
                    <span>Isitgich quvvatini optimal darajada saqlang</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-600">✓</span>
                    <span>
                      Ortiqcha isitishdan saqlaning (energiya isrofgarchiligini
                      kamaytiring)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-600">✓</span>
                    <span>
                      Zamonaviy energiya tejovchi texnologiyalardan foydalaning
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
