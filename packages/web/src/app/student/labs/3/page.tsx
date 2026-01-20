import OhmsLawSimulator from "@/components/labs/OhmsLawSimulator"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentLab3Page() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <StudentSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <a href="/student/labs" className="hover:text-blue-600">
              Laboratoriyalar
            </a>
            <span>/</span>
            <span className="font-semibold text-gray-900">Laboratoriya #3</span>
          </div>

          {/* Header */}
          <div className="mb-8 rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-600 to-emerald-600 p-8 shadow-lg">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white">
                LAB #3
              </span>
              <span className="rounded-lg bg-green-400 px-3 py-1 text-sm font-bold text-gray-900">
                OSON
              </span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">
              Om qonuni. Ketma-ket va parallel ulanishlar
            </h1>
            <p className="text-lg text-green-100">
              Om qonunini o'rganish, tok kuchi, kuchlanish va qarshilik
              bog'lanishini tekshirish
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
                  Om qonuni va uning matematik ifodasini o'rganish
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni
                  aniqlash
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Elektr quvvati va energiyasini hisoblash
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Elektr zanjiri elementlarini o'rganish
                </span>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <OhmsLawSimulator />

          {/* Conclusion */}
          <div className="mt-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">📝 Xulosa</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Om qonuni – elektr zanjiridagi tok kuchi, kuchlanish va
                qarshilik orasidagi asosiy bog'liqlikni ifodalaydi. Bu qonun
                elektrotexnikaning fundamental qonunidir.
              </p>
              <p>
                Tok kuchi kuchlanishga to'g'ri va qarshilikka teskari
                proporsionaldir: <strong>I = V/R</strong>
              </p>
              <p className="rounded-lg bg-green-100 p-4 font-semibold text-green-900">
                💡 Om qonuni barcha elektr qurilmalari va elektronik sxemalarni
                loyihalash va tahlil qilishning asosiy vositasidir.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
