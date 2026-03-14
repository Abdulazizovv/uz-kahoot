"use client"

import FaradayInductionSimulator from "@/components/labs/FaradayInductionSimulator"

export default function StudentLab12Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-violet-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-2xl font-bold text-white shadow-lg">
                  12
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Labaratoriya ishi №12
                  </h1>
                  <p className="text-base text-violet-700 sm:text-lg">
                    Elektromagnit induksiya. Faradey qonuni
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                Magnit oqimining vaqt bo&apos;yicha o&apos;zgarishi natijasida hosil
                bo&apos;ladigan induksiya EYuK ni o&apos;rganish:{" "}
                <span className="font-mono">ε = -N dΦ/dt</span>.
              </p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 text-center">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-extrabold text-violet-700">
                50 daqiqa
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-white to-violet-50 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-violet-700">
                O&apos;rta
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-fuchsia-50 p-4 text-center">
              <div className="text-3xl">🔄</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo&apos;lim
              </div>
              <div className="text-lg font-bold text-fuchsia-700">
                Induksiya
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-rose-50 p-4 text-center">
              <div className="text-3xl">🎯</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Vazifalar
              </div>
              <div className="text-lg font-bold text-rose-700">3 ta</div>
            </div>
          </div>
        </div>

        {/* Maqsadlar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900 sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5">
              <h3 className="font-bold text-gray-900">1) Oqim va EYuK</h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">Φ = B·A</span> va{" "}
                <span className="font-mono">ε = -N dΦ/dt</span> bog&apos;lanishini
                mustahkamlash.
              </p>
            </div>
            <div className="rounded-xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-white p-5">
              <h3 className="font-bold text-gray-900">
                2) Maksimal EYuK shartlari
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                N, A, B₀ va f parametrlari oshishi bilan εmax qanday
                o&apos;sishini tahlil qilish.
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
          <FaradayInductionSimulator />
        </div>

        {/* Vazifalar */}
        <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
            Vazifalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-violet-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">1) N bo&apos;yicha εmax</h3>
              <p className="mt-2 text-sm text-gray-700">
                A = 20 cm², B₀ = 50 mT, f = 2 Hz qabul qiling. N ni 100, 200,
                400 qilib, εmax qiymatlarini yozing va chiziqlilikni tekshiring.
              </p>
            </div>

            <div className="rounded-xl border border-fuchsia-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                2) f ta&apos;siri (tezlik)
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                f = 0.5, 1, 2, 4 Hz bo&apos;lganda εmax qanday o&apos;zgaradi? Xulosa
                sifatida εmax ~ f bog&apos;liqligini yozing.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">3) Lents qoidasi</h3>
              <p className="mt-2 text-sm text-gray-700">
                Grafikda ε(t) ning B(t) ga nisbatan faza siljishini kuzating va
                manfiy ishora (qarshilik) ma&apos;nosini izohlang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

