import PNJunctionSimulator from "@/components/labs/PNJunctionSimulator"
import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"

export default function Lab8Student() {
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
            <span className="font-medium text-gray-900">Laboratoriya 8</span>
          </div>

          {/* Lab Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-2xl font-bold text-white shadow-lg">
                8
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Yarim o'tkazgichlar va p-n o'tish
                </h1>
                <p className="text-lg text-gray-600">
                  P-N o'tishning volt-amper xarakteristikasi va Shockley
                  tenglamasi
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
                Murakkab
              </span>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                70 daqiqa
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
                Yarim o'tkazgichlar
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
                <span className="text-3xl">🔬</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Yarim o'tkazgichlar
                  </h3>
                  <p className="text-sm text-gray-700">
                    P-tipi va N-tipi yarim o'tkazgichlarning xossalarini
                    o'rganish
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    P-N o'tish
                  </h3>
                  <p className="text-sm text-gray-700">
                    Kambekor qatlam va potensial to'siq haqida tushuncha
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    VAX o'lchash
                  </h3>
                  <p className="text-sm text-gray-700">
                    To'g'ri va teskari siljish rejimlarida xarakteristika olish
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                <span className="text-3xl">📐</span>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Shockley qonuni
                  </h3>
                  <p className="text-sm text-gray-700">
                    Diod tenglamasini eksperimental tekshirish
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <div className="mb-8">
            <PNJunctionSimulator />
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
                    To'g'ri siljish xarakteristikasini o'lchash
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium">Quyidagi qadamlarni bajaring:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>"To'g'ri siljish" rejimini tanlang</li>
                    <li>
                      Kuchlanishni ketma-ket{" "}
                      <strong>
                        0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0, 1.2 V
                      </strong>{" "}
                      qilib o'zgartiring
                    </li>
                    <li>Har bir kuchlanish uchun tok qiymatini yozib oling</li>
                    <li>
                      Jadvalni to'ldiring:
                      <div className="mt-2 overflow-hidden rounded-lg border border-gray-300">
                        <table className="min-w-full text-xs">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="border border-gray-300 px-2 py-1">
                                V (V)
                              </th>
                              <th className="border border-gray-300 px-2 py-1">
                                I (mA)
                              </th>
                              <th className="border border-gray-300 px-2 py-1">
                                ln(I)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                0.6
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
                                0.7
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
                                0.8
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
                                1.0
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
                    <li>I = f(V) va ln(I) = f(V) grafiklarini chizing</li>
                  </ol>
                  <div className="mt-4 rounded-lg border border-blue-300 bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">
                      Javob bering:
                    </p>
                    <ol className="ml-6 list-decimal space-y-1 text-sm text-gray-700">
                      <li>Ochilish kuchlanishi (threshold voltage) qancha?</li>
                      <li>Tok eksponensial ravishda ortadimi?</li>
                      <li>0.6 V dan yuqorida tok qanday o'zgaradi?</li>
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
                    Shockley parametrlarini topish
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Diod parametrlarini eksperimental aniqlang:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>
                      To'g'ri siljish rejimida 0.6 - 1.0 V oralig'ida 5-6 ta
                      o'lchov oling
                    </li>
                    <li>Har bir nuqta uchun ln(I) ni hisoblang</li>
                    <li>ln(I) = f(V) grafigini millimetrli qog'ozda chizing</li>
                    <li>To'g'ri chiziq moyilligi orqali n×V_t ni toping</li>
                    <li>
                      V_t = 26 mV deb, ideallik koeffitsienti <strong>n</strong>{" "}
                      ni hisoblang
                    </li>
                    <li>
                      Y o'qi bilan kesishish nuqtasidan to'yinish toki{" "}
                      <strong>I_s</strong> ni aniqlang
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg border border-green-300 bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Formula:</p>
                    <p className="text-center font-mono text-sm text-gray-900">
                      I = I_s × (e^(V/(n×V_t)) - 1)
                    </p>
                    <p className="mt-2 text-center text-xs text-gray-600">
                      ln(I) = ln(I_s) + V/(n×V_t)
                    </p>
                  </div>
                </div>
              </div>

              {/* Vazifa 3 */}
              <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Teskari siljish va to'yinish toki
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Teskari siljish xususiyatlarini tadqiq qiling:</p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>"Teskari siljish" rejimini tanlang</li>
                    <li>
                      Kuchlanishni <strong>0, 2, 4, 6, 8, 10 V</strong> qilib
                      oshiring
                    </li>
                    <li>Har bir nuqtada tok qiymatini o'lchang</li>
                    <li>Tok deyarli o'zgarmasligini (I ≈ const) kuzating</li>
                    <li>Bu qiymat to'yinish toki I_s hisoblanadi</li>
                    <li>
                      Haroratni <strong>T = 300, 330, 360, 390 K</strong> qilib
                      o'zgartiring va har birida I_s ni o'lchang
                    </li>
                    <li>I_s(T) grafigini chizing va tahlil qiling</li>
                  </ol>
                  <div className="mt-4 rounded-lg border border-purple-300 bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Xulosa:</p>
                    <p className="text-sm text-gray-700">
                      Teskari siljishda tok juda kichik va deyarli o'zgarmas.
                      Harorat ortishi bilan to'yinish toki eksponensial ravishda
                      ortadi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vazifa 4 */}
              <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-lg">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Aralashma darajasining ta'siri
                  </h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Aralashma konsentratsiyasining diod parametrlariga ta'sirini
                    o'rganing:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>To'g'ri siljish rejimini tanlang</li>
                    <li>
                      Kuchlanishni doimiy qiymatga <strong>V = 0.8 V</strong>{" "}
                      qo'ying
                    </li>
                    <li>
                      Aralashma darajasini ketma-ket{" "}
                      <strong>10¹⁴, 10¹⁵, 10¹⁶, 10¹⁷, 10¹⁸ cm⁻³</strong> qilib
                      o'zgartiring
                    </li>
                    <li>
                      Har bir holatda tok, qarshilik va sig'im qiymatlarini
                      yozib oling
                    </li>
                    <li>
                      Kambekor qatlam kengligi qanday o'zgarishini kuzating
                    </li>
                    <li>
                      Grafiklar chizing: I = f(N_d), W = f(N_d), C = f(N_d)
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg border border-orange-300 bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Tahlil:</p>
                    <p className="text-sm text-gray-700">
                      Aralashma darajasi yuqori bo'lganda kambekor qatlam
                      torayadi va sig'im ortadi. Bu xususiyat varaktor
                      (o'zgaruvchan sig'im) diodlarida ishlatiladi.
                    </p>
                  </div>
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
                  Barcha o'lchov natijalarini jadvalga to'g'ri va aniq kiriting
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Grafiklarni millimetrli qog'ozda yoki Excel dasturida chizing
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Shockley parametrlari (n va I_s) ni aniq hisoblashga e'tibor
                  bering
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Teskari siljishda kuchlanishni ehtiyotkorlik bilan oshiring
                  (buzilish xavfi!)
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Hisobotda barcha formulalar, jadvallar va grafiklarni to'liq
                  keltiring
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
