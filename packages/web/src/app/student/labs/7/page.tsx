import VacuumDiodeSimulator from "@/components/labs/VacuumDiodeSimulator"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function Lab7Student() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex flex-1 flex-col">
        <StudentHeader />
        <main className="flex-1 overflow-y-auto p-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <span className="hover:text-indigo-600">Bosh sahifa</span>
            <span className="mx-2">→</span>
            <span className="hover:text-indigo-600">Laboratoriyalar</span>
            <span className="mx-2">→</span>
            <span className="font-medium text-gray-900">Laboratoriya 7</span>
          </div>

          {/* Lab Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-bold text-white shadow-lg">
                7
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Vakuumli diodning volt-amper xarakteristikasi
                </h1>
                <p className="text-lg text-gray-600">
                  Termoelektron emissiya va Child-Langmuir qonunini o'rganish
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
                O'rta
              </span>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                60 daqiqa
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
                Elektronika
              </span>
            </div>
          </div>

          {/* Maqsadlar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              🎯 Laboratoriya maqsadlari
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Termoelektron emissiya
                  </h3>
                  <p className="text-sm text-gray-700">
                    Qizigan metaldan elektronlar chiqish jarayonini tushunish
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    VAX o'lchash
                  </h3>
                  <p className="text-sm text-gray-700">
                    Diodning tok-kuchlanish xarakteristikasini tajriba orqali
                    aniqlash
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <span className="text-3xl">⚙️</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Child-Langmuir qonuni
                  </h3>
                  <p className="text-sm text-gray-700">
                    I ∝ U^(3/2) munosabatini eksperimental tekshirish
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-3xl">🔬</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    To'yinish jarayoni
                  </h3>
                  <p className="text-sm text-gray-700">
                    Haroratga bog'liq to'yinish tokini o'rganish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <div className="mb-8">
            <VacuumDiodeSimulator />
          </div>

          {/* Vazifalar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              ✍️ Bajarilishi kerak bo'lgan vazifalar
            </h2>

            <div className="space-y-6">
              {/* Vazifa 1 */}
              <div className="rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    VAX xarakteristikasini avtomatik o'lchash
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium">
                    Quyidagi parametrlarni o'rnating:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm">
                    <li>
                      Katod harorati: <strong>T = 2000 K</strong>
                    </li>
                    <li>
                      Elektrodlar oralig'i: <strong>d = 5 mm</strong>
                    </li>
                  </ul>
                  <p className="text-sm">
                    "Avtomatik o'lchash" tugmasini bosing va kuchlanish 0 dan
                    200 V gacha o'zgarishini kuzating.
                  </p>
                  <div className="mt-4 rounded-lg border border-blue-300 bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">
                      Javob bering:
                    </p>
                    <ol className="ml-6 list-decimal space-y-1 text-sm text-gray-700">
                      <li>Grafikda qanday ikki soha ko'rinadi?</li>
                      <li>Fazoviy zaryad sohasida tok qanday o'zgaradi?</li>
                      <li>To'yinish toki qancha?</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Vazifa 2 */}
              <div className="rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Child-Langmuir qonunini sinash
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Quyidagi qadamlarni bajaring:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      Kuchlanishni <strong>U = 25, 50, 75, 100 V</strong>{" "}
                      qiymatlariga o'rnating
                    </li>
                    <li>Har bir kuchlanish uchun anod tokini yozib oling</li>
                    <li>
                      Jadvalni to'ldiring:
                      <div className="mt-2 overflow-hidden rounded-lg border border-gray-300">
                        <table className="min-w-full text-xs">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="border border-gray-300 px-2 py-1">
                                U (V)
                              </th>
                              <th className="border border-gray-300 px-2 py-1">
                                I (mA)
                              </th>
                              <th className="border border-gray-300 px-2 py-1">
                                U^(3/2)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                25
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                50
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                75
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                100
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ...
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>
                    <li>
                      I = f(U^(3/2)) grafigini chizing va to'g'ri chiziq ekanini
                      tekshiring
                    </li>
                  </ol>
                </div>
              </div>

              {/* Vazifa 3 */}
              <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Katod haroratining ta'siri
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Haroratning to'yinish tokiga ta'sirini o'rganing:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      Anod kuchlanishini maksimal qiymatga (200 V) qo'ying
                    </li>
                    <li>
                      Katod haroratini ketma-ket{" "}
                      <strong>T = 1500, 1800, 2000, 2200, 2500 K</strong> qilib
                      o'zgartiring
                    </li>
                    <li>
                      Har safar to'yinish toki qiymatini o'lchang va yozib oling
                    </li>
                    <li>I_to'yinish = f(T) grafigini chizing</li>
                    <li>
                      Grafik tahlili: Harorat ortganda to'yinish toki qanday
                      o'zgaradi? Bu Richardson-Dushman qonuniga mosmi?
                    </li>
                  </ol>
                </div>
              </div>

              {/* Vazifa 4 */}
              <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-lg">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Elektrodlar oralig'ining ta'siri
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Masofa o'zgarishining anod tokiga ta'sirini tekshiring:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      Kuchlanishni doimiy qiymatga <strong>U = 100 V</strong>{" "}
                      qo'ying
                    </li>
                    <li>
                      Katod haroratini <strong>T = 2000 K</strong> da saqlang
                    </li>
                    <li>
                      Elektrodlar oralig'ini ketma-ket{" "}
                      <strong>d = 2, 4, 6, 8, 10, 12 mm</strong> qilib
                      o'zgartiring
                    </li>
                    <li>Har bir masofa uchun anod tokini yozib oling</li>
                    <li>
                      I = f(1/d²) grafigini chizing va to'g'ri chiziq ekanligini
                      tekshiring (Child-Langmuir qonuniga mos)
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Eslatma */}
          <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              📌 Eslatma
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Har bir o'lchov natijasini diqqat bilan yozib boring va
                  grafiklarni aniq chizing
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  VAX xarakteristikasida fazoviy zaryad va to'yinish sohalarini
                  ajrating
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Child-Langmuir qonuni faqat fazoviy zaryad sohasida o'rinlidir
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Hisobotda barcha formula va grafiklarga izoh bering
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
