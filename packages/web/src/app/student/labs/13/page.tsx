"use client"

import LCOscillationsSimulator from "@/components/labs/LCOscillationsSimulator"

export default function StudentLab13Page() {
  return (
    <div className="space-y-6 lg:space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-2xl font-bold text-white shadow-lg">
                  13
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Labaratoriya ishi №13
                  </h1>
                  <p className="text-base text-indigo-700 sm:text-lg">
                    Erkin elektromagnit tebranishlar (LC kontur)
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                LC konturda tebranish chastotasi va davrini aniqlash, energiya
                almashinuvini kuzatish va Thomson formulasini amalda qo&apos;llash.
              </p>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4 text-center">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-extrabold text-indigo-700">
                70 daqiqa
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-white to-indigo-50 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-indigo-700">Qiyin</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-white to-purple-50 p-4 text-center">
              <div className="text-3xl">〰️</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo&apos;lim
              </div>
              <div className="text-lg font-bold text-purple-700">
                Tebranishlar
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5">
              <h3 className="font-bold text-gray-900">1) Thomson formulasi</h3>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-mono">T = 2π√(LC)</span> va{" "}
                <span className="font-mono">f = 1/(2π√(LC))</span> bog&apos;lanishini
                tekshirish.
              </p>
            </div>
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5">
              <h3 className="font-bold text-gray-900">
                2) Energiya almashinuvini kuzatish
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Kondensator elektr energiyasi va g&apos;altak magnit energiyasi
                orasidagi davriy almashinuvni tushunish.
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
          <LCOscillationsSimulator />
        </div>

        {/* Vazifalar */}
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
            Vazifalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-indigo-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">1) L va C ta&apos;siri</h3>
              <p className="mt-2 text-sm text-gray-700">
                C ni 10 µF da qoldirib, L ni 10, 25, 50 mH qiymatlarga o&apos;zgartiring.
                T qanday o&apos;zgarishini jadval ko&apos;rinishida yozing.
              </p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                2) Energiya ulushi (W<sub>e</sub> va W<sub>m</sub>)
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Vaqt slayderi yordamida energiya foizlari qanday almashishini
                kuzating. Qaysi paytda elektr energiyasi maksimal?
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">3) Boshlang&apos;ich shartlar</h3>
              <p className="mt-2 text-sm text-gray-700">
                V₀ ni o&apos;zgartirib, Q₀ va maksimal tok qiymati qanday
                o&apos;zgarishini tushuntiring.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}
