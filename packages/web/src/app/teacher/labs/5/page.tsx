import KirchhoffSimulator from "@/components/labs/KirchhoffSimulator"

export default function Lab5Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <a href="/teacher/labs" className="hover:text-blue-600">
            Laboratoriyalar
          </a>
          <span>/</span>
          <span className="font-semibold text-gray-900">Laboratoriya #5</span>
        </div>

        {/* Header */}
        <div className="mb-8 rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 shadow-lg">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white">
              LAB #5
            </span>
            <span className="rounded-lg bg-red-400 px-3 py-1 text-sm font-bold text-white">
              QIYIN
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">
            Kirxgof qonunlarini o'rganish va tekshirish
          </h1>
          <p className="text-lg text-indigo-100">
            Ampermetr va voltmetr yordamida murakkab elektr zanjirlarda Kirxgof
            qonunlarini eksperimental tekshirish
          </p>
        </div>

        {/* Objectives */}
        <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            🎯 Ishning maqsadlari
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Kirxgofning 1-qonuni (tugunlar uchun) ni o'rganish
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Kirxgofning 2-qonuni (konturlar uchun) ni o'rganish
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Ampermetr va voltmetr bilan ishlash ko'nikmasini oshirish
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Murakkab zanjirlarda toklarni hisoblash usulini o'zlashtirish
              </span>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <KirchhoffSimulator />

        {/* Conclusion */}
        <div className="mt-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">📝 Xulosa</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Kirxgofning 1-qonuni</strong> – zanjirning biror tuguniga
              kirayotgan toklarning algebraik yig'indisi nolga teng. Bu qonun
              zaryad saqlanish qonunining natijasi.
            </p>
            <p>
              <strong>Kirxgofning 2-qonuni</strong> – elektr zanjirining
              ixtiyoriy yopiq konturida barcha EYuKlarning algebraik yig'indisi
              shu konturdagi kuchlanish tushishlarining yig'indisiga teng.
            </p>
            <p className="rounded-lg bg-green-100 p-4 font-semibold text-green-900">
              💡 Bu qonunlar murakkab elektr zanjirlardagi toklarni va
              kuchlanishlarni hisoblashning asosiy vositasidir. Ular
              elektrotexnika va elektronikada keng qo'llaniladi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
