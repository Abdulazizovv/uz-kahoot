"use client"

import TransformerSimulator from "@/components/labs/TransformerSimulator"

export default function StudentLab14Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-rose-600 text-2xl font-bold text-white shadow-lg">
                  14
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Labaratoriya ishi №14
                  </h1>
                  <p className="text-base text-orange-700 sm:text-lg">
                    Transformator F.I.K. va o&apos;zgaruvchan tok qonunlari
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                O&apos;ramlar nisbati orqali kuchlanish va tokning o&apos;zgarishini
                tahlil qilish, yuklama ostida quvvat va F.I.K. ni baholash.
              </p>
            </div>
            <div className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-center">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-extrabold text-orange-700">
                65 daqiqa
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-white to-amber-50 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-amber-700">Qiyin</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-orange-50 p-4 text-center">
              <div className="text-3xl">⚡</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo&apos;lim
              </div>
              <div className="text-lg font-bold text-orange-700">
                O&apos;zgaruvchan tok
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-rose-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5">
              <h3 className="font-bold text-gray-900">
                1) Transformatsiya koeffitsienti
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">V₂/V₁ = N₂/N₁</span> bog&apos;lanishini
                qo&apos;llash va yuklama ostidagi oqibatlarini tahlil qilish.
              </p>
            </div>
            <div className="rounded-xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white p-5">
              <h3 className="font-bold text-gray-900">2) F.I.K. va yo&apos;qotishlar</h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">η = Pout/Pin</span> orqali quvvat
                balansini ko&apos;rish va yo&apos;qotish sabablarini tushunish.
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
          <TransformerSimulator />
        </div>

        {/* Vazifalar */}
        <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
            Vazifalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-orange-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                1) Step-down va step-up holatlari
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                V₁ = 220 V bo&apos;lsin. N₁ = 500, N₂ = 100 (step-down) va N₂ = 1000
                (step-up) holatlarda V₂ ni solishtiring.
              </p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">2) Yuklama ta&apos;siri</h3>
              <p className="mt-2 text-sm text-gray-700">
                R ni 10 Ω dan 100 Ω gacha o&apos;zgartirib, I₂ va Pout qanday
                o&apos;zgarishini kuzating. Qaysi R da quvvat katta?
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">3) F.I.K. pasaysa nima bo&apos;ladi?</h3>
              <p className="mt-2 text-sm text-gray-700">
                η ni 95% dan 80% gacha kamaytiring. Pin va yo&apos;qotish quvvati
                qanday ortadi? Xulosa yozing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

