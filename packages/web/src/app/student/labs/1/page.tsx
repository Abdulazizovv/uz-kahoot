import ElectrostaticsSimulator from "@/components/labs/ElectrostaticsSimulator"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function StudentLab1Page() {
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
            <span className="font-semibold text-gray-900">Laboratoriya #1</span>
          </div>

          {/* Header */}
          <div className="mb-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white">
                LAB #1
              </span>
              <span className="rounded-lg bg-green-400 px-3 py-1 text-sm font-bold text-gray-900">
                OSON
              </span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white">
              Elektrostatika. Kulon qonuni
            </h1>
            <p className="text-lg text-blue-100">
              Elektr zaryadlari o'zaro ta'sirini o'rganish va Kulon qonunini
              eksperimental tekshirish
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
                  Kulon qonuni va uning matematik ifodasini o'rganish
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Zaryadlar orasidagi kuch va masofa bog'liqligini aniqlash
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Elektr maydon kuchlanganligi tushunchasini o'zlashtirish
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">
                  Tortilish va itarilish hodisalarini kuzatish
                </span>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <ElectrostaticsSimulator />

          {/* Conclusion */}
          <div className="mt-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">📝 Xulosa</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Kulon qonuni – elektrostatikaning asosiy qonunlaridan biri. U
                ikki nuqtaviy zaryad orasidagi o'zaro ta'sir kuchini belgilaydi.
              </p>
              <p>
                Kuch zaryadlar ko'paytmasiga to'g'ri va ular orasidagi
                masofaning kvadratiga teskari proporsionaldir.
              </p>
              <p className="rounded-lg bg-green-100 p-4 font-semibold text-green-900">
                💡 Kulon qonuni elektr maydon nazariyasining asosini tashkil
                etadi va zamonaviy elektronikaning fundamental printsipi
                hisoblanadi.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
