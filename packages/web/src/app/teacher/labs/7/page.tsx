import VacuumDiodeSimulator from "@/components/labs/VacuumDiodeSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

export default function Lab7() {
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
            <span className="font-medium text-gray-900">Laboratoriya 7</span>
          </div>

          {/* Lab Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-bold text-white shadow-lg">
                  7
                </div>
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Vakuumli diodning volt-amper xarakteristikasi
                  </h1>
                  <p className="text-lg text-gray-600">
                    Child-Langmuir qonuni va Richardson-Dushman tenglamasini
                    o'rganish
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
                O'rta qiyinlik
              </span>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                60 daqiqa
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
                Elektronika
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
                  <span className="text-xl">⚡</span> Termoelektron emissiya
                </h3>
                <p className="text-sm text-gray-700">
                  Qizdirilgan metaldan elektronlar emissiyalanishi jarayonini
                  o'rganish
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">📈</span> VAX xarakteristikasi
                </h3>
                <p className="text-sm text-gray-700">
                  Vakuumli diodning volt-amper xarakteristikasini o'lchash va
                  tahlil qilish
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">⚙️</span> Child-Langmuir qonuni
                </h3>
                <p className="text-sm text-gray-700">
                  Fazoviy zaryad chegaralangan rejimda tok-kuchlanish
                  bog'liqligini tekshirish
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-orange-600 bg-orange-50 p-4">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <span className="text-xl">🔬</span> To'yinish jarayoni
                </h3>
                <p className="text-sm text-gray-700">
                  Diod tokining to'yinish sohasini va katod haroratiga
                  bog'liqligini o'rganish
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
              {/* 1. Termoelektron emissiya */}
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  1. Termoelektron emissiya
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  <strong>Termoelektron emissiya</strong> - qizdirilgan metall
                  sirtidan elektronlarning issiqlik energiyasi ta'sirida
                  uzoqlashish jarayoni. Elektronlar metalldan chiqib ketishi
                  uchun ma'lum bir energiya - <strong>chiqish ishi (W)</strong>{" "}
                  zarur.
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Harorat ortishi bilan metalldan chiqayotgan elektronlar soni
                  eksponensial ravishda ortadi. Bu hodisa elektron lampalar,
                  vakuum trubkalar va boshqa elektronika qurilmalarining ishlash
                  prinsipi hisoblanadi.
                </p>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-2 font-semibold text-gray-900">
                    Elektronning metalldan chiqish sharti:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                    <li>
                      Elektron kinetik energiyasi chiqish ishidan katta bo'lishi
                      kerak
                    </li>
                    <li>
                      Odatda bu energiya issiqlik harakati natijasida olinadi
                    </li>
                    <li>
                      Harorat yuqori bo'lganda, ko'proq elektronlar zarur
                      energiyaga ega bo'ladi
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. Richardson-Dushman qonuni */}
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  2. Richardson-Dushman qonuni
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Qizigan metall sirtidan elektron emissiyasi zichligini harorat
                  va chiqish ishiga bog'liqligini ifodalovchi fundamental qonun:
                </p>
                <div className="my-4 rounded-lg bg-white p-4 text-center">
                  <p className="mb-2 text-xl font-bold text-purple-900">
                    J = A × T² × exp(-W/(k×T))
                  </p>
                  <div className="mt-3 grid gap-2 text-left text-sm text-gray-700">
                    <p>
                      <strong>J</strong> - emissiya toki zichligi (A/m²)
                    </p>
                    <p>
                      <strong>A</strong> - Richardson konstantasi (material
                      xususiyati, ≈60 A/(cm²·K²))
                    </p>
                    <p>
                      <strong>T</strong> - absolut harorat (K)
                    </p>
                    <p>
                      <strong>W</strong> - chiqish ishi (eV)
                    </p>
                    <p>
                      <strong>k</strong> - Boltzmann konstantasi (8.617×10⁻⁵
                      eV/K)
                    </p>
                  </div>
                </div>
                <p className="leading-relaxed text-gray-700">
                  Bu qonun shuni ko'rsatadiki, emissiya toki haroratning
                  kvadratiga proporsional va haroratning eksponensial funksiyasi
                  sifatida ortadi. Chiqish ishi katta bo'lgan materiallarda
                  emissiya kamroq bo'ladi.
                </p>
              </div>

              {/* 3. Vakuumli diod */}
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  3. Vakuumli diod strukturasi va ishlash prinsipi
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  <strong>Vakuumli diod</strong> eng oddiy elektron lampa
                  bo'lib, ikkita elektroddan -<strong>katod</strong> va{" "}
                  <strong>anod</strong>dan tashkil topgan. Diod vakuumlangan
                  shisha ballondan iborat.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-gray-900">🔴 Katod:</h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>Manfiy potensialga ulangan</li>
                      <li>Qizdirilganda elektronlar emissiya qiladi</li>
                      <li>
                        Ko'pincha toriy bilan qoplangan volfram simdan yasaladi
                      </li>
                      <li>Ish harorati 1500-2500 K</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-gray-900">🔵 Anod:</h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>Musbat potensialga ulangan</li>
                      <li>Emissiya qilingan elektronlarni yig'adi</li>
                      <li>Silindr yoki plastinka shaklida bo'ladi</li>
                      <li>Metall (ko'pincha nikel yoki molibden)</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-gray-700">
                  Anodga musbat kuchlanish berilganda, katoddan emissiya qilgan
                  elektronlar anodga tortiladi va zanjirada elektr toki hosil
                  bo'ladi. Manfiy kuchlanishda elektronlar anodga yeta olmaydi
                  va tok nolga teng bo'ladi (bir tomonlama o'tkazuvchanlik).
                </p>
              </div>

              {/* 4. Child-Langmuir qonuni */}
              <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  4. Child-Langmuir qonuni (fazoviy zaryad qonuni)
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Kuchlanish past bo'lganda, katoddan chiqayotgan barcha
                  elektronlar anodga yetib borishi mumkin emas. Katod yaqinida
                  to'planib qolgan elektronlar <strong>fazoviy zaryad</strong>{" "}
                  hosil qiladi va bu zaryad keyingi elektronlarning harakatiga
                  qarshilik ko'rsatadi.
                </p>
                <div className="my-4 rounded-lg bg-white p-4 text-center">
                  <p className="mb-2 text-xl font-bold text-orange-900">
                    I = k × U^(3/2) / d²
                  </p>
                  <div className="mt-3 grid gap-2 text-left text-sm text-gray-700">
                    <p>
                      <strong>I</strong> - anod toki (A)
                    </p>
                    <p>
                      <strong>k</strong> - diod geometriyasiga bog'liq
                      koeffitsient
                    </p>
                    <p>
                      <strong>U</strong> - anod kuchlanishi (V)
                    </p>
                    <p>
                      <strong>d</strong> - elektrodlar orasidagi masofa (m)
                    </p>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Bu qonun shuni ko'rsatadiki,{" "}
                  <strong>fazoviy zaryad chegaralangan</strong> rejimda anod
                  toki kuchlanishning 3/2 darajasiga proporsional. Bu diodning
                  muhim xarakteristikasi hisoblanadi.
                </p>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-2 font-semibold text-gray-900">
                    Matematik isboti:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                    <li>Puasson tenglamasi: ∇²φ = -ρ/ε₀</li>
                    <li>
                      Tok zichligi: j = ρv (ρ - zaryad zichligi, v - tezlik)
                    </li>
                    <li>Energiya balansi: ½mv² = eφ</li>
                    <li>
                      Bu tenglamalarni birgalikda yechish I ∝ U^(3/2) ga olib
                      keladi
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Diodning ishlash rejimlari */}
              <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  5. Vakuumli diodning ishlash rejimlari
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-blue-900">
                      a) Fazoviy zaryad sohasi (kichik kuchlanishlar):
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Anod toki Child-Langmuir qonuniga bo'ysunadi: I ∝
                        U^(3/2)
                      </li>
                      <li>Tok katod emissiyasi bilan cheklanmagan</li>
                      <li>Fazoviy zaryad anod tokini cheklaydi</li>
                      <li>Kuchlanish ortishi bilan tok tez ortadi</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <h4 className="mb-2 font-bold text-orange-900">
                      b) To'yinish sohasi (katta kuchlanishlar):
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                      <li>
                        Barcha emissiya qilingan elektronlar anodga yetadi
                      </li>
                      <li>Anod toki to'yinish qiymatiga erishadi</li>
                      <li>
                        Tok katod haroratiga bog'liq (Richardson-Dushman qonuni)
                      </li>
                      <li>
                        Kuchlanishni yanada oshirish tokni sezilarli oshirmaydi
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Muhim eslatma */}
              <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4">
                <h4 className="mb-2 font-bold text-red-900">
                  ⚠️ E'tibor bering:
                </h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                  <li>
                    Vakuumli diod bir tomonlama o'tkazuvchanlikka ega
                    (to'g'rilash xususiyati)
                  </li>
                  <li>
                    Katod harorati juda muhim - past haroratda emissiya yetarli
                    emas
                  </li>
                  <li>
                    Elektrodlar orasidagi masofa tok qiymatiga kuchli ta'sir
                    qiladi (I ∝ 1/d²)
                  </li>
                  <li>
                    Haqiqiy diodlarda anod kuchlanishi juda katta bo'lsa,
                    ionlashtirish jarayonlari boshlanishi mumkin
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Simulator */}
          <div className="mb-8">
            <VacuumDiodeSimulator />
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
                  Standart sharoitda VAX xarakteristikasini o'lchash
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Quyidagi parametrlarni o'rnating va "Avtomatik o'lchash"
                    tugmasini bosing:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-gray-700">
                    <li>
                      <strong>Katod harorati:</strong> T = 2000 K
                    </li>
                    <li>
                      <strong>Elektrodlar oralig'i:</strong> d = 5 mm
                    </li>
                    <li>
                      <strong>Anod kuchlanishi:</strong> 0 dan 200 V gacha
                      avtomatik o'zgaradi
                    </li>
                  </ul>
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">
                      Savollar:
                    </p>
                    <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                      <li>Grafikda qanday sohalarga ajratish mumkin?</li>
                      <li>Fazoviy zaryad sohasida tok qanday o'zgaradi?</li>
                      <li>To'yinish sohasi qayerdan boshlanadi?</li>
                      <li>To'yinish toki qiymatini yozib oling</li>
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
                  Child-Langmuir qonunini tekshirish
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Fazoviy zaryad sohasida Child-Langmuir qonunining
                    bajarilishini tekshiring:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>
                      Kuchlanishni U = 25, 50, 75, 100 V qiymatlarida o'lchang
                    </li>
                    <li>
                      Har bir nuqta uchun I va U^(3/2) qiymatlarini hisoblang
                    </li>
                    <li>I = f(U^(3/2)) grafigini chizing</li>
                    <li>Grafik to'g'ri chiziq bo'lishini tekshiring</li>
                    <li>
                      To'g'ri chiziq moyilligi orqali k koeffitsientini toping
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">
                      Kutilayotgan natija:
                    </p>
                    <p className="text-sm text-gray-700">
                      Agar Child-Langmuir qonuni bajarilsa, I(U^(3/2)) grafigi
                      to'g'ri chiziq bo'lishi va koordinata boshidan o'tishi
                      kerak. k koeffitsienti elektrodlar geometriyasiga bog'liq.
                    </p>
                  </div>
                </div>
              </div>

              {/* Topshiriq 3 */}
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </span>
                  Katod haroratining ta'sirini o'rganish
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Katod haroratini o'zgartirib, to'yinish tokiga ta'sirini
                    aniqlang:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>
                      Haroratni T = 1500, 1800, 2000, 2200, 2500 K qilib
                      o'lchang
                    </li>
                    <li>
                      Har bir harorat uchun anod kuchlanishini maksimalga (200
                      V) o'rnating
                    </li>
                    <li>To'yinish toki qiymatlarini yozib oling</li>
                    <li>I_to'yinish = f(T) grafigini chizing</li>
                    <li>Richardson-Dushman qonuniga mosligi tekshirilsin</li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Tahlil:</p>
                    <p className="text-sm text-gray-700">
                      Harorat ortishi bilan to'yinish toki eksponensial ravishda
                      ortishi kerak. ln(I/T²) ni 1/T ga bog'liqlik grafigidan
                      chiqish ishini (W) hisoblash mumkin.
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
                  Elektrodlar oralig'ining ta'sirini tadqiq qilish
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Child-Langmuir qonunida d² ning ta'sirini eksperimental
                    tekshiring:
                  </p>
                  <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700">
                    <li>Kuchlanishni U = 100 V ga o'rnating</li>
                    <li>
                      Masofani d = 2, 4, 6, 8, 10, 12 mm qilib o'zgartiring
                    </li>
                    <li>Har bir masofa uchun anod tokini o'lchang</li>
                    <li>I = f(d) va I = f(1/d²) grafiklarini chizing</li>
                    <li>I ∝ 1/d² munosabatini tasdiqlang</li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-900">Xulosa:</p>
                    <p className="text-sm text-gray-700">
                      Elektrodlar oralig'i kamaysa, elektr maydon kuchlangani
                      uchun anod toki ortadi. Bu bog'liqlik I ∝ 1/d²
                      qonuniyatiga bo'ysunadi.
                    </p>
                  </div>
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
                  Vakuumli diod - eng oddiy elektron lampa bo'lib, termoelektron
                  emissiya va fazoviy zaryad effektlarini o'rganish uchun qulay
                  modeldir.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Richardson-Dushman qonuni emissiya tokining haroratga
                  bog'liqligini, Child-Langmuir qonuni esa anod tokining
                  kuchlanishga bog'liqligini aniqlaydi.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Diodning VAX xarakteristikasi ikki asosiy sohaga bo'linadi:
                  fazoviy zaryad sohasi (I ∝ U^(3/2)) va to'yinish sohasi (I ≈
                  const).
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">
                  Zamonaviy elektronikada vakuum lampalar asosan yuqori
                  quvvatli, yuqori chastotali va maxsus maqsadli qurilmalarda
                  qo'llaniladi (yarim o'tkazgichli diodlar keng tarqalgan).
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
