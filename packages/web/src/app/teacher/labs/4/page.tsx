import WheatstoneSimulator from "@/components/labs/WheatstoneSimulator"

export default function Lab4Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <a href="/teacher/labs" className="hover:text-blue-600">
            Laboratoriyalar
          </a>
          <span>/</span>
          <span className="font-semibold text-gray-900">Laboratoriya #4</span>
        </div>

        {/* Header */}
        <div className="mb-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white">
              LAB #4
            </span>
            <span className="rounded-lg bg-yellow-400 px-3 py-1 text-sm font-bold text-gray-900">
              O'RTA
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">
            Uitston ko'prigi yordamida qarshilikni o'lchash
          </h1>
          <p className="text-lg text-blue-100">
            Uitston ko'prigi prinsipini o'rganish va noma'lum qarshiliklarni
            yuqori aniqlikda o'lchash
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
                Uitston ko'prigi tuzilishi va ishlash prinsipini o'rganish
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Ko'prik muvozanat shartini eksperimental tekshirish
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                Noma'lum qarshilikni yuqori aniqlikda o'lchash ko'nikmasi
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">
                O'lchash xatoliklarini baholash va kamaytirish usullari
              </span>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <WheatstoneSimulator />

        {/* Conclusion */}
        <div className="mt-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">📝 Xulosa</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              Uitston ko'prigi elektrotexnikada noma'lum qarshiliklarni
              o'lchashning eng aniq usullaridan biridir. Ko'prik sxemasida
              to'rtta qarshilik va galvanometr ishlatiladi.
            </p>
            <p>
              Muvozanat sharti <strong>R₁/R₂ = R₃/Rₓ</strong> bajarilganda
              galvanometrdan tok o'tmaydi va noma'lum qarshilikni aniqlash
              mumkin bo'ladi.
            </p>
            <p className="rounded-lg bg-green-100 p-4 font-semibold text-green-900">
              💡 Amalda: Uitston ko'prigi sezgir o'lchash asboblari,
              termometrlar, tenzometrlar va boshqa sensorlarni kalibrlashda keng
              qo'llaniladi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
