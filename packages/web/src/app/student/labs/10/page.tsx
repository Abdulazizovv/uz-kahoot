"use client"

import StraightWireCoilSimulator from "@/components/labs/StraightWireCoilSimulator"

export default function StudentLab10Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
                  10
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Labaratoriya ishi №10
                  </h1>
                  <p className="text-base text-sky-700 sm:text-lg">
                    To&apos;g&apos;ri o&apos;tkazgich va g&apos;altakning magnit
                    maydoni
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                Bio–Savar–Laplas qonuni asosida magnit induksiya qiymatini
                baholash: to&apos;g&apos;ri sim atrofida va solenoid
                (g&apos;altak) ichida.
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-4 text-center">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-extrabold text-sky-700">
                55 daqiqa
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-white to-sky-50 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-sky-700">O&apos;rta</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-indigo-50 p-4 text-center">
              <div className="text-3xl">🧲</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo&apos;lim
              </div>
              <div className="text-lg font-bold text-indigo-700">
                Elektromagnetizm
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-emerald-50 p-4 text-center">
              <div className="text-3xl">🎯</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Vazifalar
              </div>
              <div className="text-lg font-bold text-emerald-700">3 ta</div>
            </div>
          </div>
        </div>

        {/* Maqsadlar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5">
              <h3 className="font-bold text-gray-900">
                1) To&apos;g&apos;ri sim atrofidagi maydon
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">B = μ₀ I / (2πr)</span> bog&apos;lanishini
                tushunish va r oshganda maydonning kamayishini kuzatish.
              </p>
            </div>
            <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5">
              <h3 className="font-bold text-gray-900">2) Solenoid ichidagi maydon</h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">B = μ₀ (N/L) I</span> bog&apos;lanishini
                tekshirish: o&apos;ramlar zichligi va tokning ta&apos;siri.
              </p>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white">
              🔬
            </span>
            Interaktiv simulator
          </h2>
          <StraightWireCoilSimulator />
        </div>

        {/* Vazifalar */}
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
            Vazifalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-sky-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                1) B(r) bog&apos;liqligi
              </h3>
              <ol className="mt-2 ml-5 list-decimal space-y-2 text-sm text-gray-700">
                <li>Tokni I = 5 A qilib oling.</li>
                <li>
                  Masofani r = 1, 2, 3, 5, 10 cm qiymatlarda o&apos;zgartiring.
                </li>
                <li>B qiymatlari bo&apos;yicha 1/r qonunini xulosa qiling.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                2) Solenoidda N/L ta&apos;siri
              </h3>
              <ol className="mt-2 ml-5 list-decimal space-y-2 text-sm text-gray-700">
                <li>Tokni I = 2 A qilib oling.</li>
                <li>
                  N va L ni shunday tanlangki,{" "}
                  <span className="font-mono">N/L</span> 2 barobar oshsin.
                </li>
                <li>B qanday o&apos;zgarganini tahlil qiling.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                3) Natijani bir xil birliklarda ifodalash
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                B qiymatlarini <strong>µT</strong> va <strong>mT</strong>{" "}
                birliklarida solishtiring. Qaysi holatda qaysi birlik qulayroq?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

