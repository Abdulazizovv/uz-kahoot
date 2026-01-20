import PNJunctionSimulator from "@/components/labs/PNJunctionSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

export default function Lab8() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="ml-72 flex flex-1 flex-col">
        <Header />
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
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-start gap-4">
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

          {/* Maqsad va vazifalar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              🎯 Ishning maqsadi
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">🔬</span> Yarim o'tkazgichlar
                </h3>
                <p className="text-sm text-gray-700">
                  P-tipi va N-tipi yarim o'tkazgichlarning xossalari va
                  o'tkazuvchanlik mexanizmini o'rganish
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">⚡</span> P-N o'tish
                </h3>
                <p className="text-sm text-gray-700">
                  P-N o'tish hosil bo'lishi, kambekor qatlam va potensial to'siq
                  haqida tushuncha
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">📊</span> VAX xarakteristikasi
                </h3>
                <p className="text-sm text-gray-700">
                  To'g'ri va teskari siljish rejimlarida volt-amper
                  xarakteristikasini o'lchash
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">📐</span> Shockley tenglamasi
                </h3>
                <p className="text-sm text-gray-700">
                  Diod tenglamasini eksperimental tekshirish va parametrlarni
                  aniqlash
                </p>
              </div>
            </div>
          </div>

          {/* Nazariy ma'lumot */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              📚 Nazariy asoslar
            </h2>

            <div className="space-y-6">
              {/* 1. Yarim o'tkazgichlar */}
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  1. Yarim o'tkazgichlar va ularning turlari
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  <strong>Yarim o'tkazgichlar</strong> - elektr o'tkazuvchanligi
                  temperaturaga, yorug'likka va aralashma miqdoriga bog'liq
                  bo'lgan moddalar. Silitsiy (Si) va germaniy (Ge) eng ko'p
                  qo'llaniladigan yarim o'tkazgichlardir.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-green-900">
                      📗 N-tipi yarim o'tkazgich:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Donor aralashmalar bilan aralashtirilgan (masalan,
                        fosfor, mishyak)
                      </li>
                      <li>
                        Asosiy zaryad tashuvchilar:{" "}
                        <strong>elektronlar (e⁻)</strong>
                      </li>
                      <li>Minoritar zaryad tashuvchilar: teshiklar (h⁺)</li>
                      <li>Elektronlar soni teshiklar sonidan ko'p</li>
                      <li>Donor atomlari ortiqcha elektron beradi</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-orange-900">
                      📙 P-tipi yarim o'tkazgich:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Akseptor aralashmalar bilan aralashtirilgan (masalan,
                        bor, galliy)
                      </li>
                      <li>
                        Asosiy zaryad tashuvchilar:{" "}
                        <strong>teshiklar (h⁺)</strong>
                      </li>
                      <li>Minoritar zaryad tashuvchilar: elektronlar (e⁻)</li>
                      <li>Teshiklar soni elektronlar sonidan ko'p</li>
                      <li>
                        Akseptor atomlari elektron qabul qiladi (teshik hosil
                        qiladi)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. P-N o'tish */}
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  2. P-N o'tish va uning hosil bo'lishi
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  P-tipi va N-tipi yarim o'tkazgichlar bir-biriga
                  tutashtirilganda ularning chegarasida
                  <strong> p-n o'tish</strong> hosil bo'ladi. Bu o'tish
                  zamonaviy elektronikaning asosiy elementi hisoblanadi.
                </p>

                <div className="mb-4 rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-bold text-gray-900">
                    P-N o'tish hosil bo'lish jarayoni:
                  </h4>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>Diffuziya:</strong> P-sohadan teshiklar N-sohaga,
                      N-sohadan elektronlar P-sohaga diffuziya qiladi
                      (konsentratsiya gradienti ta'sirida)
                    </li>
                    <li>
                      <strong>Rekombinatsiya:</strong> O'tish chegarasida
                      elektronlar va teshiklar rekombinatsiya qiladi (bir-birini
                      yo'q qiladi)
                    </li>
                    <li>
                      <strong>Kambekor qatlam:</strong> O'tish chegarasida erkin
                      zaryad tashuvchilar bo'lmagan soha -{" "}
                      <strong>kambekor qatlam</strong> (depletion layer) hosil
                      bo'ladi
                    </li>
                    <li>
                      <strong>Ichki elektr maydon:</strong> Kambekor qatlamda
                      qoladigan ionlashgan atomlar (donorlar va akseptorlar)
                      ichki elektr maydon hosil qiladi
                    </li>
                    <li>
                      <strong>Muvozanat:</strong> Elektr maydon keyingi zaryad
                      tashuvchilarning diffuziyasiga qarshilik ko'rsatadi va
                      muvozanat qaror topadi
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-bold text-gray-900">
                    Kambekor qatlam xususiyatlari:
                  </h4>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                    <li>
                      Erkin zaryad tashuvchilar mavjud emas (faqat ionlashgan
                      atomlar)
                    </li>
                    <li>Yuqori elektr maydon kuchlangani mavjud</li>
                    <li>Yuqori elektr qarshilikka ega (dielektrik kabi)</li>
                    <li>
                      Kengligi aralashma konsentratsiyasiga bog'liq (10⁻⁶ - 10⁻⁵
                      m)
                    </li>
                    <li>Tashqi kuchlanish ta'sirida kengligi o'zgaradi</li>
                  </ul>
                </div>
              </div>

              {/* 3. Potensial to'siq */}
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  3. Potensial to'siq (Built-in potential)
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Kambekor qatlamda hosil bo'lgan ichki elektr maydon potensial
                  farqni yuzaga keltiradi. Bu <strong>potensial to'siq</strong>{" "}
                  yoki <strong>kontakt potensiali</strong> deyiladi.
                </p>

                <div className="my-4 rounded-lg bg-white p-4 text-center">
                  <p className="mb-2 text-xl font-bold text-green-900">
                    V_bi = (kT/q) × ln(N_a × N_d / n_i²)
                  </p>
                  <div className="mt-3 grid gap-2 text-left text-sm text-gray-700">
                    <p>
                      <strong>V_bi</strong> - potensial to'siq (built-in
                      voltage)
                    </p>
                    <p>
                      <strong>k</strong> - Boltzmann konstantasi (1.38×10⁻²³
                      J/K)
                    </p>
                    <p>
                      <strong>T</strong> - absolut harorat (K)
                    </p>
                    <p>
                      <strong>q</strong> - elektron zaryadi (1.6×10⁻¹⁹ C)
                    </p>
                    <p>
                      <strong>N_a</strong> - akseptorlar konsentratsiyasi
                      (P-sohada)
                    </p>
                    <p>
                      <strong>N_d</strong> - donorlar konsentratsiyasi
                      (N-sohada)
                    </p>
                    <p>
                      <strong>n_i</strong> - ichki zaryad tashuvchilar
                      konsentratsiyasi
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <p className="mb-2 font-semibold text-gray-900">
                    Xona haroratida (T = 300 K):
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                    <li>Silitsiy (Si) uchun: V_bi ≈ 0.6-0.7 V</li>
                    <li>Germaniy (Ge) uchun: V_bi ≈ 0.3-0.4 V</li>
                    <li>Galliy arsenid (GaAs) uchun: V_bi ≈ 1.2-1.4 V</li>
                  </ul>
                </div>
              </div>

              {/* 4. To'g'ri siljish */}
              <div className="rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  4. To'g'ri siljish (Forward bias)
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  P-sohaga musbat, N-sohaga manfiy potensial berilganda to'g'ri
                  siljish hosil bo'ladi.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-green-900">
                      Fizik jarayonlar:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>Tashqi maydon ichki maydonga qarshi yo'nalgan</li>
                      <li>
                        Potensial to'siq pasayadi: V_to'siq = V_bi - V_tashqi
                      </li>
                      <li>Kambekor qatlam torayadi</li>
                      <li>
                        Asosiy zaryad tashuvchilar o'tish orqali oson o'tadi
                      </li>
                      <li>Tok eksponensial ravishda ortadi</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-green-900">
                      Tok mexanizmi:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>P-sohadan teshiklar N-sohaga injeksiya qilinadi</li>
                      <li>N-sohadan elektronlar P-sohaga injeksiya qilinadi</li>
                      <li>Minoritar zaryad tashuvchilar diffuziya qiladi</li>
                      <li>Rekombinatsiya jarayoni kechadi</li>
                      <li>
                        Kuchlanish ≈ 0.6-0.7 V dan yuqori bo'lsa, tok sezilarli
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. Teskari siljish */}
              <div className="rounded-lg border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  5. Teskari siljish (Reverse bias)
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  P-sohaga manfiy, N-sohaga musbat potensial berilganda teskari
                  siljish hosil bo'ladi.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-red-900">
                      Fizik jarayonlar:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Tashqi maydon ichki maydon bilan bir xil yo'nalgan
                      </li>
                      <li>
                        Potensial to'siq oshadi: V_to'siq = V_bi + V_tashqi
                      </li>
                      <li>Kambekor qatlam kengayadi</li>
                      <li>
                        Asosiy zaryad tashuvchilar o'tish orqali o'ta olmaydi
                      </li>
                      <li>Faqat juda kichik tok oqadi</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-red-900">
                      To'yinish toki:
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Minoritar zaryad tashuvchilar hisobiga kichik tok oqadi
                      </li>
                      <li>
                        Bu tok <strong>to'yinish toki</strong> (I_s) deyiladi
                      </li>
                      <li>I_s ≈ 10⁻¹² - 10⁻⁹ A (Si uchun)</li>
                      <li>Haroratga kuchli bog'liq (T oshganda I_s ortadi)</li>
                      <li>Kuchlanishga deyarli bog'liq emas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. Shockley tenglamasi */}
              <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  6. Shockley diod tenglamasi
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  P-N o'tishning volt-amper xarakteristikasini matematik
                  ifodalovchi ideal diod tenglamasi. William Shockley tomonidan
                  yaratilgan (Nobel mukofoti, 1956).
                </p>

                <div className="my-4 rounded-lg bg-white p-4 text-center">
                  <p className="mb-2 text-2xl font-bold text-indigo-900">
                    I = I_s × (e^(V/(n×V_t)) - 1)
                  </p>
                  <div className="mt-3 grid gap-2 text-left text-sm text-gray-700">
                    <p>
                      <strong>I</strong> - diod toki (A)
                    </p>
                    <p>
                      <strong>I_s</strong> - to'yinish toki (A), materialga va
                      geometriyaga bog'liq
                    </p>
                    <p>
                      <strong>V</strong> - diodga qo'yilgan kuchlanish (V)
                    </p>
                    <p>
                      <strong>n</strong> - ideallik koeffitsienti (1 {"<"} n{" "}
                      {"<"} 2), haqiqiy diodlarda 1.2-1.5
                    </p>
                    <p>
                      <strong>V_t</strong> - termal kuchlanish = kT/q ≈ 26 mV
                      (T=300K da)
                    </p>
                    <p>
                      <strong>e</strong> - natural logarifm asosi ≈ 2.718
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-gray-900">
                      To'g'ri siljish uchun (V {">"} 0.1 V):
                    </h4>
                    <p className="text-sm text-gray-700">
                      Eksponensial had 1 dan ancha katta bo'lgani uchun:{" "}
                      <strong>I ≈ I_s × e^(V/(n×V_t))</strong>
                      <br />
                      Tok kuchlanishga eksponensial bog'liq va juda tez ortadi.
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-gray-900">
                      Teskari siljish uchun (V {"<"} -0.1 V):
                    </h4>
                    <p className="text-sm text-gray-700">
                      Eksponensial had juda kichik bo'lgani uchun:{" "}
                      <strong>I ≈ -I_s</strong>
                      <br />
                      Tok deyarli doimiy va I_s ga teng (to'yinish toki).
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-gray-900">V = 0 da:</h4>
                    <p className="text-sm text-gray-700">
                      <strong>I = I_s × (e⁰ - 1) = 0</strong>
                      <br />
                      Muvozanat holati - tok nolga teng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Muhim eslatma */}
              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4">
                <h4 className="mb-2 font-bold text-orange-900">
                  ⚠️ Muhim eslatmalar:
                </h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                  <li>
                    Shockley tenglamasi ideal diod uchun. Haqiqiy diodlarda
                    qo'shimcha effektlar mavjud (seriya qarshilik, leakage tok,
                    avalanche breakdown)
                  </li>
                  <li>
                    Harorat ortishi bilan I_s eksponensial ravishda ortadi (har
                    10°C ga taxminan 2 marta)
                  </li>
                  <li>
                    Teskari kuchlanish juda katta bo'lsa, diod buzilishi
                    (breakdown) sodir bo'lishi mumkin
                  </li>
                  <li>
                    Kambekor qatlam sig'imi yuqori chastotalarda muhim rol
                    o'ynaydi
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <div className="mb-8">
            <PNJunctionSimulator />
          </div>

          {/* Amaliy topshiriqlar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              ✍️ Amaliy topshiriqlar
            </h2>

            <div className="space-y-6">
              {/* Topshiriq 1 */}
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    1
                  </span>
                  To'g'ri siljish VAX xarakteristikasini o'lchash
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    To'g'ri siljish rejimida volt-amper xarakteristikasini
                    tadqiq qiling:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>"To'g'ri siljish" rejimini tanlang</li>
                    <li>
                      Kuchlanishni ketma-ket 0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8,
                      1.0, 1.2 V qiymatlariga o'rnating
                    </li>
                    <li>Har bir nuqta uchun tok qiymatini yozib oling</li>
                    <li>
                      I = f(V) grafigini chizing (yarim-logarifmik o'qda ham
                      chizing)
                    </li>
                    <li>0.6-0.7 V atrofida tok keskin ortishini kuzating</li>
                  </ol>
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">
                      Tahlil qiling:
                    </p>
                    <ol className="ml-6 list-decimal space-y-1 text-sm text-gray-700">
                      <li>Ochilish kuchlanishi (threshold voltage) qancha?</li>
                      <li>ln(I) = f(V) grafigi qanday ko'rinishda?</li>
                      <li>Eksponensial bog'liqlik kuzatiladimi?</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Topshiriq 2 */}
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                    2
                  </span>
                  Shockley parametrlarini aniqlash
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Eksperimental ma'lumotlardan Shockley tenglamasi
                    parametrlarini toping:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>
                      To'g'ri siljish rejimida 0.6 - 1.0 V oralig'ida 5-6 ta
                      o'lchov oling
                    </li>
                    <li>Har bir nuqta uchun ln(I) ni hisoblang</li>
                    <li>ln(I) = f(V) grafigini chizing</li>
                    <li>
                      Grafik to'g'ri chiziq bo'lishi kerak: ln(I) = ln(I_s) +
                      V/(n×V_t)
                    </li>
                    <li>To'g'ri chiziq moyilligi orqali n×V_t ni toping</li>
                    <li>
                      V_t = 26 mV deb olib, ideallik koeffitsienti n ni
                      hisoblang
                    </li>
                    <li>Y o'qi bilan kesishish nuqtasidan I_s ni aniqlang</li>
                  </ol>
                </div>
              </div>

              {/* Topshiriq 3 */}
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </span>
                  Teskari siljish va to'yinish toki
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Teskari siljish xususiyatlarini o'rganing:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>"Teskari siljish" rejimini tanlang</li>
                    <li>
                      Kuchlanishni 0 dan 10 V gacha oshiring (ehtiyotkorlik
                      bilan!)
                    </li>
                    <li>Tok deyarli o'zgarmasligini kuzating</li>
                    <li>Bu to'yinish toki I_s ga teng</li>
                    <li>
                      Haroratni 300, 330, 360, 390 K qilib o'zgartiring va har
                      birida I_s ni o'lchang
                    </li>
                    <li>
                      I_s ning haroratga eksponensial bog'liqligini tekshiring
                    </li>
                  </ol>
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Xulosa:</p>
                    <p className="text-sm text-gray-700">
                      Teskari siljishda diod deyarli ideal izolyator vazifasini
                      bajaradi. Minoritar zaryad tashuvchilar hisobiga juda
                      kichik tok (nA tartibida) oqadi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Topshiriq 4 */}
              <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                    4
                  </span>
                  Aralashma darajasining ta'siri
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Aralashma konsentratsiyasining diod xususiyatlariga
                    ta'sirini o'rganish:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>To'g'ri siljish, V = 0.8 V ga o'rnating</li>
                    <li>
                      Aralashma darajasini 10¹⁴, 10¹⁶, 10¹⁸ cm⁻³ qilib
                      o'zgartiring
                    </li>
                    <li>
                      Har bir holatda tok, qarshilik va sig'imni yozib oling
                    </li>
                    <li>Kambekor qatlam kengligining o'zgarishini kuzating</li>
                    <li>
                      Aralashma darajasi yuqori bo'lganda kambekor qatlam torroq
                      bo'lishini tushuntiring
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Xulosa */}
          <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              📋 Xulosa va tavsiyalar
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  P-N o'tish - zamonaviy elektronikaning asosi. Diodlar,
                  tranzistorlar, LED, quyosh batareyalari va boshqa ko'plab
                  qurilmalar p-n o'tish asosida ishlaydi.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Shockley tenglamasi diodning to'g'ri va teskari siljish
                  xususiyatlarini aniq ifodalaydi va diod sxemalarini
                  hisoblashda keng qo'llaniladi.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Kambekor qatlam kengligi kuchlanish va aralashma darajasiga
                  bog'liq. Bu xususiyat varaktorlarda (o'zgaruvchan sig'im
                  diodlari) ishlatiladi.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Harorat ortishi diod parametrlariga sezilarli ta'sir qiladi.
                  Elektronika qurilmalarini loyihalashda harorat kompensatsiyasi
                  zarur.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
