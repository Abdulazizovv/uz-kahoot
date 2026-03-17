"use client"

import EarthMagneticFieldSimulator from "@/components/labs/EarthMagneticFieldSimulator"

export default function StudentLab11Page() {
  return (
    <div className="space-y-6 lg:space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-bold text-white shadow-lg">
                  11
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Labaratoriya ishi №11
                  </h1>
                  <p className="text-base text-emerald-700 sm:text-lg">
                    Yer magnit maydonini o&apos;lchash
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                Tangens-galvanometr usuli orqali Yer magnit maydonining
                gorizontal tashkil etuvchisini aniqlash:{" "}
                <span className="font-mono">tanθ = Bcoil / Bearth</span>.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-extrabold text-emerald-700">
                60 daqiqa
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-white to-emerald-50 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-emerald-700">Qiyin</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-teal-50 p-4 text-center">
              <div className="text-3xl">🌍</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo&apos;lim
              </div>
              <div className="text-lg font-bold text-teal-700">
                Geomagnetizm
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-sky-50 p-4 text-center">
              <div className="text-3xl">🎯</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Vazifalar
              </div>
              <div className="text-lg font-bold text-sky-700">3 ta</div>
            </div>
          </div>
        </div>

        {/* Maqsadlar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
              <h3 className="font-bold text-gray-900">
                1) Tangens qonunini qo&apos;llash
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Coil maydoni va Yer maydoni nisbatini og&apos;ish burchagi orqali
                aniqlash.
              </p>
            </div>
            <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5">
              <h3 className="font-bold text-gray-900">2) O&apos;lchash aniqligi</h3>
              <p className="mt-2 text-sm text-gray-700">
                θ juda kichik bo&apos;lganda xatolik ortishini tushunish va optimal
                diapazonni tanlash (25–65°).
              </p>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-xl text-white">
              🔬
            </span>
            Interaktiv simulator
          </h2>
          <EarthMagneticFieldSimulator />
        </div>

        {/* Vazifalar */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
            Vazifalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">1) θ bo&apos;yicha Bearth</h3>
              <ol className="mt-2 ml-5 list-decimal space-y-2 text-sm text-gray-700">
                <li>N = 20, R = 15 cm, I = 0.5 A qabul qiling.</li>
                <li>
                  θ = 25°, 35°, 45°, 55°, 65° qiymatlar uchun Bearth ni yozing.
                </li>
                <li>Natijalarning barqarorligini taqqoslang.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-teal-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                2) Tok oshsa nimalar bo&apos;ladi?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                I ni 0.2 A dan 0.8 A gacha o&apos;zgartirib, Bearth qiymati
                nazariy jihatdan o&apos;zgarmas qolishi kerakligini tekshiring
                (θ mos ravishda o&apos;zgarsa).
              </p>
            </div>

            <div className="rounded-xl border border-sky-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">3) Xulosa</h3>
              <p className="mt-2 text-sm text-gray-700">
                Olingan Bearth qiymatini µT birlikda yozing va real hayotdagi
                tipik diapazon (taxminan 20–65 µT) bilan solishtiring.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}
