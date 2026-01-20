"use client"

import HeatingDeviceSimulator from "@/components/labs/HeatingDeviceSimulator"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import Link from "next/link"

export default function StudentLab6Page() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/student/dashboard" className="hover:text-blue-600">
              Bosh sahifa
            </Link>
            <span>/</span>
            <Link href="/student/labs" className="hover:text-blue-600">
              Laboratoriyalar
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Laboratoriya 6</span>
          </div>

          {/* Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
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
                  o'rganish
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-lg border border-yellow-200 bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                O'rta daraja
              </span>
              <span className="rounded-lg border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                ⏱ 55 daqiqa
              </span>
              <span className="rounded-lg border border-purple-200 bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
                🔥 Termodinamika
              </span>
            </div>
          </div>

          {/* Maqsadlar */}
          <div className="mb-8 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <span className="text-2xl">🎯</span>
              Laboratoriya maqsadlari
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                  ⚡
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Elektr energiyasi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sarflangan elektr energiyasini hisoblashni o'rganish
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-xl">
                  🔥
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Issiqlik energiyasi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Foydali issiqlik energiyasini aniqlash
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-xl">
                  📊
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    F.I.K. hisoblash
                  </h3>
                  <p className="text-sm text-gray-600">
                    Foydali ish koeffitsientini topish
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-xl">
                  💨
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Yo'qotishlar</h3>
                  <p className="text-sm text-gray-600">
                    Energiya yo'qotishlarini tahlil qilish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <div className="mb-8">
            <div className="mb-4 rounded-xl border border-indigo-200 bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                🔬 Interaktiv Simulyator
              </h2>
              <p className="text-gray-700">
                Isitish qurilmasining turli parametrlarini o'zgartiring va
                F.I.K. ni kuzating.
              </p>
            </div>

            <HeatingDeviceSimulator />
          </div>

          {/* Topshiriqlar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              📝 Bajarilishi kerak bo'lgan topshiriqlar
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Standart sharoitda tajriba
                  </h3>
                </div>
                <p className="mb-3 text-sm text-gray-700">
                  Quyidagi parametrlar bilan tajriba o'tkazing va F.I.K. ni
                  hisoblang:
                </p>
                <div className="ml-9 grid gap-2 text-sm text-gray-700">
                  <p>
                    • Kuchlanish: <strong>U = 220 V</strong>
                  </p>
                  <p>
                    • Tok kuchi: <strong>I = 5 A</strong>
                  </p>
                  <p>
                    • Vaqt: <strong>t = 10 daqiqa</strong>
                  </p>
                  <p>
                    • Suv massasi: <strong>m = 2 kg</strong>
                  </p>
                  <p>
                    • Harorat: <strong>20°C → 80°C</strong>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Quvvatning ta'sirini tekshirish
                  </h3>
                </div>
                <p className="ml-9 text-sm text-gray-700">
                  Tok kuchini 2 A dan 8 A gacha o'zgartirib, quvvatning F.I.K.
                  ga ta'sirini o'rganing. Har bir qiymat uchun F.I.K. ni yozib
                  boring.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Suv massasining ta'siri
                  </h3>
                </div>
                <p className="ml-9 text-sm text-gray-700">
                  Suv massasini 0.5 kg dan 5 kg gacha o'zgartiring va F.I.K.
                  ning o'zgarishini kuzating. Grafikda ifoda etishga harakat
                  qiling.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Optimal sharoitni topish
                  </h3>
                </div>
                <p className="ml-9 text-sm text-gray-700">
                  Turli kombinatsiyalarni sinab ko'rib, eng yuqori F.I.K.
                  beradigan parametrlar to'plamini aniqlang. Natijalaringizni
                  asoslang.
                </p>
              </div>
            </div>
          </div>

          {/* Xulosa */}
          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-900">✅ Eslatma</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                Laboratoriya ishini bajarayotganda quyidagilarga e'tibor bering:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600">✓</span>
                  <span>
                    Barcha parametrlarni to'g'ri o'rnatganingizga ishonch hosil
                    qiling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600">✓</span>
                  <span>Har bir tajriba natijasini yozib boring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600">✓</span>
                  <span>
                    F.I.K. ning 100% dan kam bo'lishining sabablarini
                    tushunishga harakat qiling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600">✓</span>
                  <span>Nazariy va amaliy natijalarni taqqoslang</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
