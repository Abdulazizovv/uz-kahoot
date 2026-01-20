"use client"

import MagneticForceSimulator from "@/components/labs/MagneticForceSimulator"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function Lab9Page() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
              <Link href="/teacher/dashboard" className="hover:text-blue-600">
                Bosh sahifa
              </Link>
              <span>/</span>
              <Link href="/teacher/labs" className="hover:text-blue-600">
                Laboratoriyalar
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">Laboratoriya 9</span>
            </div>

            {/* Sarlavha */}
            <div className="rounded-xl border border-indigo-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-gray-900">
                    Labaratoriya ishi №9
                  </h1>
                  <h2 className="text-2xl font-semibold text-indigo-600">
                    Magnit maydoni tokli o'tkazgichga ta'siri. Amper kuchi
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-indigo-600 bg-indigo-50 px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-indigo-600">9</div>
                  <div className="text-sm text-gray-600">Laboratoriya</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Davomiyligi
                  </p>
                  <p className="text-lg font-bold text-gray-900">60 daqiqa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    Qiyinchilik darajasi
                  </p>
                  <p className="text-lg font-bold text-gray-900">O'rta</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Bo'lim</p>
                  <p className="text-lg font-bold text-gray-900">
                    Elektromagnetizm
                  </p>
                </div>
              </div>
            </div>

            {/* Maqsad */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  🎯
                </span>
                Labaratoriya maqsadi
              </h3>
              <ul className="ml-12 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>
                    Magnit maydonidagi tokli o'tkazgichga ta'sir etuvchi Amper
                    kuchini o'rganish
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>
                    Amper kuchining tok kuchi, magnit maydon va burchakka
                    bog'liqligini eksperimental tekshirish
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>
                    Chap qo'l qoidasini qo'llash va kuch yo'nalishini aniqlash
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>Amper qonunining amaliy tatbiqlarini tushunish</span>
                </li>
              </ul>
            </div>

            {/* Nazariy asoslar */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  📖
                </span>
                Nazariy ma'lumotlar
              </h3>

              <div className="space-y-6">
                {/* Amper qonuni */}
                <div>
                  <h4 className="mb-3 text-xl font-semibold text-gray-900">
                    1. Amper qonuni
                  </h4>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    1820-yilda fransuz fizigi André-Marie Ampère tomonidan kashf
                    etilgan qonunga ko'ra, magnit maydonidagi tokli o'tkazgichga
                    kuch ta'sir etadi. Bu kuch <strong>Amper kuchi</strong> deb
                    ataladi.
                  </p>
                  <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-6">
                    <p className="mb-2 text-center text-sm font-semibold text-gray-700">
                      Amper kuchining matematik ifodasi:
                    </p>
                    <p className="text-center text-3xl font-bold text-indigo-600">
                      F = B × I × L × sin(α)
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p>
                          <strong>F</strong> — Amper kuchi (N - Nyuton)
                        </p>
                        <p>
                          <strong>B</strong> — Magnit maydon induksiyasi (T -
                          Tesla)
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>I</strong> — Tok kuchi (A - Amper)
                        </p>
                        <p>
                          <strong>L</strong> — O'tkazgich uzunligi (m - metr)
                        </p>
                        <p>
                          <strong>α</strong> — B va I orasidagi burchak
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chap qo'l qoidasi */}
                <div>
                  <h4 className="mb-3 text-xl font-semibold text-gray-900">
                    2. Chap qo'l qoidasi (Kuch yo'nalishi)
                  </h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4 leading-relaxed text-gray-700">
                        Amper kuchining yo'nalishini aniqlash uchun{" "}
                        <strong>chap qo'l qoidasi</strong> qo'llaniladi:
                      </p>
                      <ol className="ml-4 space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                            1
                          </span>
                          <span>
                            Chap qo'lning ochiq kaftini magnit maydon
                            chiziqlariga perpendikulyar qilib qo'yamiz
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                            2
                          </span>
                          <span>
                            To'rtta barmoq tok yo'nalishini ko'rsatsin
                            (musbatdan salbiyga)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                            3
                          </span>
                          <span>
                            90° ga bukkan bosh barmoq Amper kuchining
                            yo'nalishini ko'rsatadi
                          </span>
                        </li>
                      </ol>
                    </div>
                    <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                      <svg viewBox="0 0 300 250" className="w-full">
                        {/* Chap qo'l iллюstratsiyasi */}
                        <rect
                          x="50"
                          y="20"
                          width="200"
                          height="180"
                          rx="100"
                          fill="#e9d5ff"
                          opacity="0.3"
                        />

                        {/* Magnit maydon (kaftga kiruvchi) */}
                        <g>
                          {[...Array(6)].map((_, i) => (
                            <g key={i}>
                              <circle
                                cx={80 + (i % 3) * 40}
                                cy={80 + Math.floor(i / 3) * 40}
                                r="8"
                                fill="#a855f7"
                              />
                              <circle
                                cx={80 + (i % 3) * 40}
                                cy={80 + Math.floor(i / 3) * 40}
                                r="3"
                                fill="white"
                              />
                            </g>
                          ))}
                          <text
                            x="200"
                            y="100"
                            fontSize="16"
                            fontWeight="bold"
                            fill="#a855f7"
                          >
                            B
                          </text>
                          <text x="210" y="115" fontSize="10" fill="#a855f7">
                            (ichkariga)
                          </text>
                        </g>

                        {/* Tok yo'nalishi (barmoqlar) */}
                        <line
                          x1="50"
                          y1="160"
                          x2="250"
                          y2="160"
                          stroke="#ef4444"
                          strokeWidth="6"
                          markerEnd="url(#arrow1)"
                        />
                        <defs>
                          <marker
                            id="arrow1"
                            markerWidth="10"
                            markerHeight="10"
                            refX="8"
                            refY="5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                          </marker>
                        </defs>
                        <text
                          x="120"
                          y="150"
                          fontSize="16"
                          fontWeight="bold"
                          fill="#ef4444"
                        >
                          I (tok)
                        </text>

                        {/* Kuch yo'nalishi (bosh barmoq) */}
                        <line
                          x1="150"
                          y1="200"
                          x2="150"
                          y2="60"
                          stroke="#10b981"
                          strokeWidth="6"
                          markerEnd="url(#arrow2)"
                        />
                        <defs>
                          <marker
                            id="arrow2"
                            markerWidth="10"
                            markerHeight="10"
                            refX="5"
                            refY="8"
                            orient="auto"
                          >
                            <polygon points="0 0, 5 10, 10 0" fill="#10b981" />
                          </marker>
                        </defs>
                        <text
                          x="160"
                          y="130"
                          fontSize="16"
                          fontWeight="bold"
                          fill="#10b981"
                        >
                          F (kuch)
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Maxsus holatlar */}
                <div>
                  <h4 className="mb-3 text-xl font-semibold text-gray-900">
                    3. Maxsus holatlar
                  </h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                      <h5 className="mb-2 font-bold text-green-900">
                        Maksimal kuch (α = 90°)
                      </h5>
                      <p className="mb-2 text-sm text-gray-700">
                        O'tkazgich magnit maydon chiziqlariga perpendikulyar:
                      </p>
                      <p className="text-center text-xl font-bold text-green-600">
                        F<sub>max</sub> = B × I × L
                      </p>
                      <p className="mt-2 text-xs text-gray-600">sin(90°) = 1</p>
                    </div>

                    <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                      <h5 className="mb-2 font-bold text-yellow-900">
                        O'rta kuch (0° &lt; α &lt; 90°)
                      </h5>
                      <p className="mb-2 text-sm text-gray-700">
                        O'tkazgich qiyshiq joylashgan:
                      </p>
                      <p className="text-center text-xl font-bold text-yellow-600">
                        F = B × I × L × sin(α)
                      </p>
                      <p className="mt-2 text-xs text-gray-600">
                        0 &lt; sin(α) &lt; 1
                      </p>
                    </div>

                    <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                      <h5 className="mb-2 font-bold text-red-900">
                        Nol kuch (α = 0° yoki 180°)
                      </h5>
                      <p className="mb-2 text-sm text-gray-700">
                        O'tkazgich magnit chiziqlarga parallel:
                      </p>
                      <p className="text-center text-xl font-bold text-red-600">
                        F = 0
                      </p>
                      <p className="mt-2 text-xs text-gray-600">sin(0°) = 0</p>
                    </div>
                  </div>
                </div>

                {/* Amaliy tatbiqlar */}
                <div>
                  <h4 className="mb-3 text-xl font-semibold text-gray-900">
                    4. Amaliy tatbiqlar
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h5 className="mb-2 font-bold text-blue-900">
                        ⚡ Elektr dvigatellari
                      </h5>
                      <p className="text-sm text-gray-700">
                        Amper kuchi tufayli magnit maydonidagi tokli ramka
                        aylanadi. Bu elektr motorlarining ishlash prinsipi.
                        Avtomobillar, ventilyatorlar, nasoslar bu prinsipda
                        ishlaydi.
                      </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h5 className="mb-2 font-bold text-blue-900">
                        🔊 Dinamiklar (Karnaylar)
                      </h5>
                      <p className="text-sm text-gray-700">
                        Audio signalga muvofiq o'zgaruvchi tok magnit maydonida
                        g'altakka ta'sir etib, membranani tebratadi. Natijada
                        tovush hosil bo'ladi.
                      </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h5 className="mb-2 font-bold text-blue-900">
                        🏭 Elektromagnit kranlar
                      </h5>
                      <p className="text-sm text-gray-700">
                        Kuchli magnit maydon yaratib, og'ir temir buyumlarni
                        ko'taradi. Metall ish-lovchilik va qurilish sanoatida
                        qo'llaniladi.
                      </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <h5 className="mb-2 font-bold text-blue-900">
                        🔬 Ampermetr va Gal'vanometr
                      </h5>
                      <p className="text-sm text-gray-700">
                        Tok kuchini o'lchash asboblari Amper kuchiga asoslangan.
                        Tokli ramka magnit maydonida burilishi orqali tok kuchi
                        aniqlanadi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tarixiy ma'lumot */}
                <div className="rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-6">
                  <h5 className="mb-2 font-bold text-gray-900">
                    📜 Tarixiy ma'lumot:
                  </h5>
                  <p className="text-sm leading-relaxed text-gray-700">
                    <strong>André-Marie Ampère</strong> (1775-1836) - frantsuz
                    fizigi va matematigi. 1820-yilda daniyalik olim Hans
                    Christian Ørsted tomonidan tokning magnit ta'sirini kashf
                    etganidan so'ng, Ampère bu hodisani chuqur o'rgandi va
                    magnit maydonidagi tokli o'tkazgichga ta'sir etuvchi kuch
                    qonunini kashf etdi. Uning sharafiga tok kuchining birligi
                    "Amper" deb nomlangan. Ampère elektrodinamikaning
                    asoschilaridan biri hisoblanadi.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulator */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  🔬
                </span>
                Virtual laboratoriya
              </h3>
              <MagneticForceSimulator />
            </div>

            {/* Xavfsizlik texnikasi */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  ⚠️
                </span>
                Xavfsizlik texnikasi
              </h3>
              <ul className="ml-8 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">▸</span>
                  <span>
                    Kuchli magnit maydonlar elektron qurilmalarga zarar
                    yetkazishi mumkin
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">▸</span>
                  <span>
                    Yuqori tok kuchi ishlatilganda o'tkazgichlar qizishi mumkin
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">▸</span>
                  <span>
                    Magnit maydon yurak stimulyatori va boshqa tibbiy
                    implantlarga ta'sir qilishi mumkin
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">▸</span>
                  <span>
                    O'lchashlarni amalga oshirishdan oldin barcha ulanishlarni
                    tekshiring
                  </span>
                </li>
              </ul>
            </div>

            {/* Muhokama savollari */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  💭
                </span>
                Muhokama savollari
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    1. Agar tok yo'nalishi teskari tomonga o'zgarsa, Amper kuchi
                    qanday o'zgaradi?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Javob: Kuch yo'nalishi ham teskari tomonga o'zgaradi, lekin
                    kattaligi o'zgarmasdan qoladi.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    2. Nima uchun elektr dvigateli doimo aylanishda turadi?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Javob: Kollektor yordamida ramkadagi tok yo'nalishi davriy
                    ravishda o'zgaradi, natijada Amper kuchi ramkani bir tomonga
                    aylantira beradi.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    3. Agar magnit maydon ikki baravar kuchaytirilsa, Amper
                    kuchi qanday o'zgaradi?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Javob: F = B × I × L × sin(α) formulasidan ko'rinadiki, kuch
                    ham ikki baravar ortadi, chunki F ~ B (to'g'ri
                    proporsional).
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    4. Real hayotda Amper kuchidan foydalanishning qanday
                    misollarini bilasiz?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Javob: Elektr motorlari (avtomobil, poezd), dinamiklar,
                    elektromagnit kranlar, ampermetr va gal'vanometrlar, magnit
                    levitatsiyali poyezdlar.
                  </p>
                </div>
              </div>
            </div>

            {/* Xulosalar */}
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✅
                </span>
                Xulosalar
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-2xl">1️⃣</span>
                  <span>
                    <strong>Amper qonuni:</strong> Magnit maydonidagi tokli
                    o'tkazgichga ta'sir etuvchi kuch F = B × I × L × sin(α)
                    formula bilan hisoblanadi.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-2xl">2️⃣</span>
                  <span>
                    <strong>Kuch yo'nalishi:</strong> Chap qo'l qoidasi
                    yordamida aniqlanadi va magnit maydon hamda tok yo'nalishiga
                    perpendikulyardir.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-2xl">3️⃣</span>
                  <span>
                    <strong>Maksimal ta'sir:</strong> O'tkazgich magnit
                    chiziqlariga perpendikulyar (α = 90°) bo'lganda kuch
                    maksimal qiymatga erishadi.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 text-2xl">4️⃣</span>
                  <span>
                    <strong>Amaliy ahamiyati:</strong> Amper kuchi elektr
                    motorlari, dinamiklar, o'lchov asboblari va ko'plab elektr
                    qurilmalarining ishlash asosini tashkil etadi.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
