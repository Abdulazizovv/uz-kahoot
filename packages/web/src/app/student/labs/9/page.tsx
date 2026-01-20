"use client"

import MagneticForceSimulator from "@/components/labs/MagneticForceSimulator"

export default function StudentLab9Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Sarlavha */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg">
                  9
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Labaratoriya ishi №9
                  </h1>
                  <p className="text-lg text-indigo-600">
                    Magnit maydoni tokli o'tkazgichga ta'siri
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Davomiyligi</div>
              <div className="text-2xl font-bold text-indigo-600">
                60 daqiqa
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
              <div className="text-3xl">📚</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Qiyinchilik
              </div>
              <div className="text-lg font-bold text-blue-600">O'rta</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
              <div className="text-3xl">⚡</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Bo'lim
              </div>
              <div className="text-lg font-bold text-purple-600">
                Elektromagnetizm
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
              <div className="text-3xl">🎯</div>
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Vazifalar
              </div>
              <div className="text-lg font-bold text-green-600">4 ta</div>
            </div>
          </div>
        </div>

        {/* Maqsadlar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white">
              🎯
            </span>
            Labaratoriya maqsadlari
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">1️⃣</span>
                <h3 className="font-bold text-gray-900">
                  Amper kuchini o'rganish
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Magnit maydonidagi tokli o'tkazgichga ta'sir etuvchi kuchni
                eksperimental o'rganish
              </p>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">2️⃣</span>
                <h3 className="font-bold text-gray-900">
                  Bog'liqlikni aniqlash
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Kuchning tok, magnit maydon va burchakka bog'liqligini
                tekshirish
              </p>
            </div>

            <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">3️⃣</span>
                <h3 className="font-bold text-gray-900">Chap qo'l qoidasi</h3>
              </div>
              <p className="text-sm text-gray-700">
                Kuch yo'nalishini chap qo'l qoidasi yordamida aniqlash
              </p>
            </div>

            <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">4️⃣</span>
                <h3 className="font-bold text-gray-900">Amaliy tatbiqlari</h3>
              </div>
              <p className="text-sm text-gray-700">
                Amper qonunining kundalik hayotdagi tatbiqlarini tushunish
              </p>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-xl text-white">
              🔬
            </span>
            Interaktiv simulator
          </h2>
          <MagneticForceSimulator />
        </div>

        {/* Vazifa 1 */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-xl text-white">
              1
            </span>
            Vazifa 1: Amper kuchining tok kuchiga bog'liqligi
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-blue-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">📋 Topshiriq:</h3>
              <ol className="ml-5 list-decimal space-y-2 text-gray-700">
                <li>
                  Magnit maydon B = 0.5 T va o'tkazgich uzunligi L = 10 cm deb
                  qabul qiling
                </li>
                <li>Burchakni α = 90° ga o'rnating (maksimal kuch holati)</li>
                <li>Tok kuchini 0 dan 10 A gacha 1 A qadamda o'zgartiring</li>
                <li>
                  Har bir tok qiymati uchun Amper kuchini jadvalga yozib boring
                </li>
                <li>F(I) grafigini tahlil qiling</li>
              </ol>
            </div>

            <div className="rounded-lg border border-blue-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                📊 Kuzatishlar jadvali:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-300 p-3">№</th>
                      <th className="border border-blue-300 p-3">
                        Tok kuchi I (A)
                      </th>
                      <th className="border border-blue-300 p-3">
                        Amper kuchi F (N)
                      </th>
                      <th className="border border-blue-300 p-3">
                        F/I nisbati
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[0, 2, 4, 6, 8, 10].map((current, idx) => (
                      <tr key={idx} className="hover:bg-blue-50">
                        <td className="border border-blue-300 p-3 text-center">
                          {idx + 1}
                        </td>
                        <td className="border border-blue-300 p-3 text-center">
                          {current}
                        </td>
                        <td className="border border-blue-300 p-3 text-center">
                          <span className="font-mono text-blue-600">
                            {(0.5 * current * 0.1).toFixed(4)}
                          </span>
                        </td>
                        <td className="border border-blue-300 p-3 text-center">
                          <span className="font-mono text-purple-600">
                            {current > 0 ? (0.5 * 0.1).toFixed(4) : "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-5">
              <h3 className="mb-2 font-bold text-gray-900">✅ Xulosalar:</h3>
              <ul className="ml-5 list-disc space-y-2 text-gray-700">
                <li>
                  Amper kuchi tok kuchiga <strong>to'g'ri proporsional</strong>:
                  F ~ I
                </li>
                <li>F/I nisbati o'zgarmas qoladi (B va L o'zgarmasligida)</li>
                <li>
                  Grafik to'g'ri chiziq ko'rinishida bo'ladi (F = k × I, bu
                  yerda k = B × L)
                </li>
                <li>
                  Tok kuchi ikki barobar oshganda, kuch ham ikki barobar ortadi
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vazifa 2 */}
        <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-xl text-white">
              2
            </span>
            Vazifa 2: Amper kuchining magnit maydonga bog'liqligi
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-purple-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">📋 Topshiriq:</h3>
              <ol className="ml-5 list-decimal space-y-2 text-gray-700">
                <li>
                  Tok kuchini I = 5 A va o'tkazgich uzunligini L = 10 cm deb
                  belgilang
                </li>
                <li>Burchakni α = 90° ga o'rnating</li>
                <li>
                  Magnit maydonni 0 dan 2 T gacha 0.25 T qadamda o'zgartiring
                </li>
                <li>
                  Har bir magnit maydon qiymati uchun Amper kuchini o'lchang
                </li>
                <li>F(B) bog'liqligini tahlil qiling</li>
              </ol>
            </div>

            <div className="rounded-lg border border-purple-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                📊 Kuzatishlar jadvali:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-purple-300 p-3">№</th>
                      <th className="border border-purple-300 p-3">
                        Magnit maydon B (T)
                      </th>
                      <th className="border border-purple-300 p-3">
                        Amper kuchi F (N)
                      </th>
                      <th className="border border-purple-300 p-3">
                        F/B nisbati
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map(
                      (field, idx) => (
                        <tr key={idx} className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-3 text-center">
                            {idx + 1}
                          </td>
                          <td className="border border-purple-300 p-3 text-center">
                            {field.toFixed(2)}
                          </td>
                          <td className="border border-purple-300 p-3 text-center">
                            <span className="font-mono text-purple-600">
                              {(field * 5 * 0.1).toFixed(4)}
                            </span>
                          </td>
                          <td className="border border-purple-300 p-3 text-center">
                            <span className="font-mono text-blue-600">
                              {field > 0 ? (5 * 0.1).toFixed(4) : "—"}
                            </span>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-5">
              <h3 className="mb-2 font-bold text-gray-900">✅ Xulosalar:</h3>
              <ul className="ml-5 list-disc space-y-2 text-gray-700">
                <li>
                  Amper kuchi magnit maydon induksiyasiga{" "}
                  <strong>to'g'ri proporsional</strong>: F ~ B
                </li>
                <li>F/B nisbati doimiy qoladi (I va L o'zgarmasligida)</li>
                <li>
                  Magnit maydon kuchaygan sari, tokli o'tkazgichga ta'sir
                  etuvchi kuch ham ortadi
                </li>
                <li>
                  Grafik koordinata boshidan o'tuvchi to'g'ri chiziq
                  ko'rinishida
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vazifa 3 */}
        <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-xl text-white">
              3
            </span>
            Vazifa 3: Amper kuchining burchakka bog'liqligi
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-orange-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">📋 Topshiriq:</h3>
              <ol className="ml-5 list-decimal space-y-2 text-gray-700">
                <li>
                  Tok kuchi I = 5 A, magnit maydon B = 1 T va uzunlik L = 10 cm
                  deb oling
                </li>
                <li>Burchakni 0° dan 180° gacha 15° qadamda o'zgartiring</li>
                <li>Har bir burchak uchun Amper kuchini o'lchang</li>
                <li>sin(α) qiymatini hisoblang va kuch bilan taqqoslang</li>
                <li>F(α) grafigini tahlil qiling</li>
              </ol>
            </div>

            <div className="rounded-lg border border-orange-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                📊 Kuzatishlar jadvali:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="border border-orange-300 p-3">№</th>
                      <th className="border border-orange-300 p-3">
                        Burchak α (°)
                      </th>
                      <th className="border border-orange-300 p-3">sin(α)</th>
                      <th className="border border-orange-300 p-3">
                        Amper kuchi F (N)
                      </th>
                      <th className="border border-orange-300 p-3">
                        F_max nisbati (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[
                      0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
                    ].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180
                      const sinValue = Math.sin(rad)
                      const force = 1 * 5 * 0.1 * sinValue
                      const percentage = sinValue * 100
                      return (
                        <tr key={idx} className="hover:bg-orange-50">
                          <td className="border border-orange-300 p-3 text-center">
                            {idx + 1}
                          </td>
                          <td className="border border-orange-300 p-3 text-center">
                            {angle}
                          </td>
                          <td className="border border-orange-300 p-3 text-center">
                            <span className="font-mono text-blue-600">
                              {sinValue.toFixed(4)}
                            </span>
                          </td>
                          <td className="border border-orange-300 p-3 text-center">
                            <span className="font-mono text-orange-600">
                              {force.toFixed(4)}
                            </span>
                          </td>
                          <td className="border border-orange-300 p-3 text-center">
                            <span className="font-mono text-purple-600">
                              {percentage.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-5">
              <h3 className="mb-2 font-bold text-gray-900">✅ Xulosalar:</h3>
              <ul className="ml-5 list-disc space-y-2 text-gray-700">
                <li>
                  Amper kuchi burchakning sinusiga proporsional:{" "}
                  <strong>F ~ sin(α)</strong>
                </li>
                <li>
                  <strong>α = 90°</strong> da kuch maksimal: F_max = B × I × L
                  (sin(90°) = 1)
                </li>
                <li>
                  <strong>α = 0°</strong> yoki <strong>180°</strong> da kuch
                  nolga teng (sin(0°) = 0)
                </li>
                <li>
                  Grafik sinus funksiyasi ko'rinishida bo'lib, 90° da eng yuqori
                  nuqtaga erishadi
                </li>
                <li>
                  O'tkazgich magnit chiziqlariga perpendikulyar bo'lganda
                  maksimal ta'sir hosil bo'ladi
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vazifa 4 */}
        <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-xl text-white">
              4
            </span>
            Vazifa 4: Chap qo'l qoidasini qo'llash
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-green-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">📋 Topshiriq:</h3>
              <p className="mb-4 text-gray-700">
                Quyidagi holatlar uchun chap qo'l qoidasidan foydalanib, Amper
                kuchining yo'nalishini aniqlang:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 font-semibold text-gray-900">Holat 1:</p>
                  <ul className="ml-4 space-y-1 text-sm text-gray-700">
                    <li>• Magnit maydon: Shimoldan janubga (→)</li>
                    <li>• Tok yo'nalishi: Pastdan yuqoriga (↑)</li>
                    <li>
                      • Kuch yo'nalishi:{" "}
                      <strong className="text-green-600">
                        Bizdan uzoqqa (⊗)
                      </strong>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 font-semibold text-gray-900">Holat 2:</p>
                  <ul className="ml-4 space-y-1 text-sm text-gray-700">
                    <li>• Magnit maydon: Bizga qarab (⊙)</li>
                    <li>• Tok yo'nalishi: Chapdan o'ngga (→)</li>
                    <li>
                      • Kuch yo'nalishi:{" "}
                      <strong className="text-green-600">Yuqoriga (↑)</strong>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 font-semibold text-gray-900">Holat 3:</p>
                  <ul className="ml-4 space-y-1 text-sm text-gray-700">
                    <li>• Magnit maydon: Yuqoridan pastga (↓)</li>
                    <li>• Tok yo'nalishi: Bizga qarab (⊙)</li>
                    <li>
                      • Kuch yo'nalishi:{" "}
                      <strong className="text-green-600">Chapga (←)</strong>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 font-semibold text-gray-900">Holat 4:</p>
                  <ul className="ml-4 space-y-1 text-sm text-gray-700">
                    <li>• Magnit maydon: O'ngdan chapga (←)</li>
                    <li>• Tok yo'nalishi: Pastga (↓)</li>
                    <li>
                      • Kuch yo'nalishi:{" "}
                      <strong className="text-green-600">
                        Bizdan uzoqqa (⊗)
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                🖐️ Chap qo'l qoidasini qo'llash bosqichlari:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Chap qo'lni tayyorlang
                    </p>
                    <p className="text-sm text-gray-700">
                      Qo'lni ochiq holda, kaftni yuqoriga qiling
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Magnit chiziqlarni to'g'rilang
                    </p>
                    <p className="text-sm text-gray-700">
                      Kaftingizni magnit maydon chiziqlariga perpendikulyar
                      qilib qo'ying (chiziqlar kaftga kirsin)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      To'rt barmoqni yo'naltiring
                    </p>
                    <p className="text-sm text-gray-700">
                      To'rtta barmoq tok yo'nalishini ko'rsatsin (musbat qutbdan
                      salbiy qutbga)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Bosh barmoqni tekshiring
                    </p>
                    <p className="text-sm text-gray-700">
                      90° ga bukkan bosh barmoq Amper kuchining yo'nalishini
                      ko'rsatadi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-5">
              <h3 className="mb-2 font-bold text-gray-900">💡 Eslatma:</h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Chap qo'l qoidasi faqat musbat zaryadlar (tok yo'nalishi) uchun
                ishlatiladi. Agar salbiy zaryadlar (elektronlar) harakati ko'rib
                chiqilsa, unda <strong>o'ng qo'l qoidasi</strong>
                ishlatiladi, chunki elektronlar tok yo'nalishiga teskari tomonga
                harakat qiladi.
              </p>
            </div>
          </div>
        </div>

        {/* Yakuniy xulosalar */}
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white">
              ✅
            </span>
            Umumiy xulosalar
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-indigo-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">1. Amper qonuni</h3>
              <p className="mb-2 text-gray-700">
                Magnit maydonidagi tokli o'tkazgichga ta'sir etuvchi kuch
                quyidagi formula bilan hisoblanadi:
              </p>
              <p className="my-3 text-center text-2xl font-bold text-indigo-600">
                F = B × I × L × sin(α)
              </p>
              <p className="text-sm text-gray-600">
                Bu yerda kuch barcha parametrlarga to'g'ri proporsional: tok
                kuchiga, magnit maydon induksiyasiga, o'tkazgich uzunligiga va
                burchakning sinusiga.
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                2. Proporsionallik
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-center font-semibold text-blue-900">
                    F ~ I
                  </p>
                  <p className="text-center text-xs text-gray-600">
                    Tok kuchiga proporsional
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-center font-semibold text-purple-900">
                    F ~ B
                  </p>
                  <p className="text-center text-xs text-gray-600">
                    Magnit maydonga proporsional
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-center font-semibold text-orange-900">
                    F ~ sin(α)
                  </p>
                  <p className="text-center text-xs text-gray-600">
                    Burchak sinusiga proporsional
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 border-green-300 bg-white p-5">
              <h3 className="mb-3 font-bold text-gray-900">
                3. Amaliy ahamiyati
              </h3>
              <p className="text-gray-700">
                Amper kuchi zamonaviy texnologiyaning asosini tashkil etadi:
                elektr motorlari (avtomobillar, poyezdlar, samolyotlar),
                dinamiklar, elektromagnit kranlar, ampermetrlar va ko'plab
                boshqa qurilmalar bu prinsipda ishlaydi. Bu qonun energetika,
                transport va aloqa sohasida katta ahamiyatga ega.
              </p>
            </div>
          </div>
        </div>

        {/* Eslatma */}
        <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-6 shadow-lg">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
            <span>⚠️</span>
            Eslatma
          </h3>
          <ul className="ml-6 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>
                Barcha o'lchashlarni simulyatorda diqqat bilan bajaring
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>Natijalarni jadvalga aniq va to'g'ri yozib boring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>
                Grafiklardagi o'zgarishlarni tahlil qilib, xulosalar chiqaring
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>
                Chap qo'l qoidasini qo'llashda ehtiyot bo'ling - yo'nalishlar
                to'g'ri aniqlanishi muhim
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
