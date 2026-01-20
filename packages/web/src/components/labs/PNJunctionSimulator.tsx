"use client"

import { useState } from "react"

export default function PNJunctionSimulator() {
  const [temperature, setTemperature] = useState(300) // K
  const [dopingLevel, setDopingLevel] = useState(5) // 10^x cm⁻³
  const [voltage, setVoltage] = useState(0) // V
  const [biasType, setBiasType] = useState<"forward" | "reverse">("forward")
  const [junctionWidth, setJunctionWidth] = useState(1) // μm

  // Fizik konstantalar
  const BOLTZMANN = 8.617e-5 // eV/K
  const ELECTRON_CHARGE = 1.6e-19 // C
  const SATURATION_CURRENT = 1e-12 // A (modelda)

  // Shockley tenglamasi: I = Is(e^(V/(n*Vt)) - 1)
  const thermalVoltage = (BOLTZMANN * temperature) / 1 // Vt = kT/q (eV)
  const idealityFactor = 1.2 // n

  const calculateCurrent = (v: number, bias: "forward" | "reverse") => {
    const actualVoltage = bias === "forward" ? v : -v
    // Shockley diode equation
    const current =
      SATURATION_CURRENT *
      (Math.exp(actualVoltage / (idealityFactor * thermalVoltage)) - 1) *
      1000 // mA ga

    // To'g'ri yo'nalishda cheklangan maksimal tok
    if (bias === "forward" && current > 100) return 100
    // Teskari yo'nalishda cheklangan minimal tok
    if (bias === "reverse" && current < -0.1) return -0.1

    return current
  }

  // Baryer potentsiali (built-in potential)
  const barrierPotential = 0.7 // V (Si uchun)

  // Kambekor qatlami kengligi
  const actualVoltage = biasType === "forward" ? voltage : -voltage
  const depletionWidth =
    junctionWidth *
    Math.sqrt(Math.max(0.01, 1 - actualVoltage / (barrierPotential + 0.1)))

  // Sig'im
  const junctionCapacitance =
    dopingLevel /
    10 /
    Math.sqrt(Math.max(0.01, barrierPotential - actualVoltage + 0.1)) // pF

  const current = calculateCurrent(voltage, biasType)
  const power = Math.abs(voltage * current) // mW
  const resistance =
    voltage !== 0 ? Math.abs(voltage / (current / 1000)) : Infinity // Ω

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Boshqaruv paneli */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          P-N o'tish parametrlari
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Yo'nalish tanlash */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Siljish turi:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setBiasType("forward")}
                className={`flex-1 rounded-lg border-2 px-4 py-3 font-semibold transition-all ${
                  biasType === "forward"
                    ? "border-green-600 bg-green-100 text-green-900"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                To'g'ri siljish (Forward)
              </button>
              <button
                onClick={() => setBiasType("reverse")}
                className={`flex-1 rounded-lg border-2 px-4 py-3 font-semibold transition-all ${
                  biasType === "reverse"
                    ? "border-red-600 bg-red-100 text-red-900"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Teskari siljish (Reverse)
              </button>
            </div>
          </div>

          {/* Kuchlanish */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Kuchlanish (V)</span>
              <span className="text-lg font-bold text-blue-600">
                {biasType === "reverse" && voltage > 0 ? "-" : ""}
                {voltage.toFixed(2)} V
              </span>
            </label>
            <input
              type="range"
              min="0"
              max={biasType === "forward" ? "1.5" : "10"}
              step="0.05"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 V</span>
              <span>{biasType === "forward" ? "1.5 V" : "10 V"}</span>
            </div>
          </div>

          {/* Harorat */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Harorat (T)</span>
              <span className="text-lg font-bold text-orange-600">
                {temperature} K
              </span>
            </label>
            <input
              type="range"
              min="250"
              max="400"
              step="10"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>250 K</span>
              <span>400 K ({(temperature - 273).toFixed(0)}°C)</span>
            </div>
          </div>

          {/* Aralashma konsentratsiyasi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Aralashma darajasi</span>
              <span className="text-lg font-bold text-purple-600">
                10<sup>{dopingLevel}</sup> cm⁻³
              </span>
            </label>
            <input
              type="range"
              min="14"
              max="19"
              step="1"
              value={dopingLevel}
              onChange={(e) => setDopingLevel(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Kam (10¹⁴)</span>
              <span>Yuqori (10¹⁹)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vizualizatsiya */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* P-N o'tish strukturasi */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            P-N o'tish strukturasi
          </h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
            <svg viewBox="0 0 400 300" className="w-full">
              {/* P-sohasi */}
              <rect
                x="20"
                y="80"
                width="160"
                height="140"
                fill="#fbbf24"
                opacity="0.3"
              />
              <text
                x="100"
                y="60"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#f59e0b"
              >
                P-soha
              </text>
              <text
                x="100"
                y="155"
                textAnchor="middle"
                fontSize="14"
                fill="#92400e"
              >
                Teshiklar (h⁺)
              </text>

              {/* N-sohasi */}
              <rect
                x="220"
                y="80"
                width="160"
                height="140"
                fill="#3b82f6"
                opacity="0.3"
              />
              <text
                x="300"
                y="60"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#2563eb"
              >
                N-soha
              </text>
              <text
                x="300"
                y="155"
                textAnchor="middle"
                fontSize="14"
                fill="#1e3a8a"
              >
                Elektronlar (e⁻)
              </text>

              {/* Kambekor qatlam */}
              <rect
                x={180 - depletionWidth * 20}
                y="80"
                width={depletionWidth * 40}
                height="140"
                fill="#9ca3af"
                opacity="0.5"
              />
              <text
                x="200"
                y="240"
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#6b7280"
              >
                Kambekor qatlam: {depletionWidth.toFixed(2)} μm
              </text>

              {/* Teshiklar (P-sohada) */}
              {[...Array(8)].map((_, i) => (
                <g key={`hole-${i}`}>
                  <circle
                    cx={50 + (i % 4) * 30}
                    cy={100 + Math.floor(i / 4) * 40}
                    r="8"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x={50 + (i % 4) * 30}
                    y={105 + Math.floor(i / 4) * 40}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#f59e0b"
                    fontWeight="bold"
                  >
                    +
                  </text>
                </g>
              ))}

              {/* Elektronlar (N-sohada) */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={`electron-${i}`}
                  cx={250 + (i % 4) * 30}
                  cy={100 + Math.floor(i / 4) * 40}
                  r="6"
                  fill="#3b82f6"
                />
              ))}

              {/* Tok oqimi (to'g'ri siljishda) */}
              {biasType === "forward" && voltage > 0.3 && (
                <g>
                  {[...Array(3)].map((_, i) => (
                    <g key={`current-${i}`}>
                      {/* Teshiklar harakati o'ngga */}
                      <circle
                        cx="50"
                        cy={110 + i * 30}
                        r="6"
                        fill="#f59e0b"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="cx"
                          from="50"
                          to="350"
                          dur="2s"
                          repeatCount="indefinite"
                          begin={`${i * 0.5}s`}
                        />
                      </circle>
                      {/* Elektronlar harakati chapga */}
                      <circle
                        cx="350"
                        cy={120 + i * 30}
                        r="5"
                        fill="#3b82f6"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="cx"
                          from="350"
                          to="50"
                          dur="2s"
                          repeatCount="indefinite"
                          begin={`${i * 0.5}s`}
                        />
                      </circle>
                    </g>
                  ))}
                </g>
              )}

              {/* Kuchlanish ko'rsatkichi */}
              {voltage > 0 && (
                <g>
                  <line
                    x1="20"
                    y1="260"
                    x2="100"
                    y2="260"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <line
                    x1="300"
                    y1="260"
                    x2="380"
                    y2="260"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="268"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill={biasType === "forward" ? "#16a34a" : "#dc2626"}
                  >
                    {biasType === "forward" ? "+" : "-"} {voltage.toFixed(2)} V{" "}
                    {biasType === "reverse" ? "+" : "-"}
                  </text>
                  {/* Qutb belgilari */}
                  <text
                    x="60"
                    y="280"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#374151"
                  >
                    {biasType === "forward" ? "+" : "-"}
                  </text>
                  <text
                    x="340"
                    y="280"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#374151"
                  >
                    {biasType === "forward" ? "-" : "+"}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Kambekor qatlam ma'lumoti */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-2 font-semibold text-gray-900">
              Kambekor qatlam xususiyatlari:
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                • Kengligi: <strong>{depletionWidth.toFixed(2)} μm</strong>
              </p>
              <p>
                • Baryer potentsiali: <strong>{barrierPotential} V</strong> (Si
                uchun)
              </p>
              <p>
                • Elektr maydon: <strong>Yuqori</strong> (kambekor qatlam
                ichida)
              </p>
              <p>
                •{" "}
                {biasType === "forward"
                  ? "To'g'ri siljish → kambekor qatlam torayadi"
                  : "Teskari siljish → kambekor qatlam kengayadi"}
              </p>
            </div>
          </div>
        </div>

        {/* Volt-amper xarakteristikasi */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-purple-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Volt-amper xarakteristikasi
          </h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
            <svg viewBox="0 0 400 300" className="w-full">
              {/* Koordinata o'qlari */}
              <line
                x1="200"
                y1="20"
                x2="200"
                y2="280"
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="150"
                x2="380"
                y2="150"
                stroke="#374151"
                strokeWidth="2"
              />

              {/* O'q belgilari */}
              <text
                x="390"
                y="155"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                V
              </text>
              <text
                x="205"
                y="15"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                I
              </text>

              {/* Shkala */}
              <text
                x="195"
                y="165"
                fontSize="10"
                textAnchor="end"
                fill="#6b7280"
              >
                0
              </text>
              {/* To'g'ri yo'nalish */}
              <text
                x="300"
                y="165"
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                +0.7V
              </text>
              <text
                x="370"
                y="165"
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                +1.5V
              </text>
              {/* Teskari yo'nalish */}
              <text
                x="100"
                y="165"
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                -5V
              </text>
              <text
                x="30"
                y="165"
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                -10V
              </text>

              {/* To'g'ri siljish egri chizig'i */}
              <path
                d="M 200 150 Q 250 150, 280 80 Q 310 30, 370 20"
                fill="none"
                stroke="#16a34a"
                strokeWidth="3"
              />
              {/* Teskari siljish egri chizig'i */}
              <path
                d="M 200 150 L 30 155"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
              />

              {/* Joriy nuqta */}
              {voltage > 0 && (
                <g>
                  <circle
                    cx={
                      biasType === "forward"
                        ? 200 + (voltage / 1.5) * 170
                        : 200 - (voltage / 10) * 170
                    }
                    cy={
                      biasType === "forward"
                        ? 150 - (current / 100) * 130
                        : 150 + (Math.abs(current) / 0.1) * 5
                    }
                    r="6"
                    fill={biasType === "forward" ? "#16a34a" : "#dc2626"}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={
                      biasType === "forward"
                        ? 200 + (voltage / 1.5) * 170
                        : 200 - (voltage / 10) * 170
                    }
                    cy={
                      biasType === "forward"
                        ? 150 - (current / 100) * 130
                        : 150 + (Math.abs(current) / 0.1) * 5
                    }
                    r="10"
                    fill="none"
                    stroke={biasType === "forward" ? "#16a34a" : "#dc2626"}
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="10;15;10"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0;0.5"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              )}

              {/* Belgіlar */}
              <text
                x="320"
                y="50"
                fontSize="12"
                fill="#16a34a"
                fontWeight="bold"
              >
                To'g'ri
              </text>
              <text
                x="80"
                y="180"
                fontSize="12"
                fill="#dc2626"
                fontWeight="bold"
              >
                Teskari
              </text>
            </svg>
          </div>

          {/* Xarakteristika tushuntirish */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="font-semibold text-gray-700">To'g'ri siljish:</p>
              <p className="text-gray-600">
                V {">"} 0.6V da tok eksponensial ortadi
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="font-semibold text-gray-700">Teskari siljish:</p>
              <p className="text-gray-600">Kichik to'yinish toki (I_s ≈ nA)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Natijalar */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          O'lchov natijalari
        </h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-blue-600"></div>
              <span className="font-semibold text-gray-900">Tok:</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {current >= 0 ? "+" : ""}
              {current.toFixed(3)} mA
            </p>
            <p className="mt-2 text-xs text-gray-600">Shockley tenglamasi</p>
          </div>

          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-purple-600"></div>
              <span className="font-semibold text-gray-900">Qarshilik:</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {resistance === Infinity
                ? "∞"
                : resistance > 1000
                  ? (resistance / 1000).toFixed(1) + " kΩ"
                  : resistance.toFixed(1) + " Ω"}
            </p>
            <p className="mt-2 text-xs text-gray-600">
              R = V / I (differensial)
            </p>
          </div>

          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-orange-600"></div>
              <span className="font-semibold text-gray-900">Sig'im:</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {junctionCapacitance.toFixed(2)} pF
            </p>
            <p className="mt-2 text-xs text-gray-600">O'tish sig'imi</p>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-600"></div>
              <span className="font-semibold text-gray-900">Quvvat:</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {power.toFixed(3)} mW
            </p>
            <p className="mt-2 text-xs text-gray-600">P = V × I</p>
          </div>
        </div>

        {/* Tahlil */}
        <div className="mt-6 rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-4">
          <h5 className="mb-2 font-bold text-gray-900">📊 Tahlil:</h5>
          <p className="text-sm leading-relaxed text-gray-700">
            {biasType === "forward" && voltage < 0.3
              ? `To'g'ri siljish, lekin kuchlanish ochilish kuchlanishidan (≈0.6V) past. Tok juda kichik, diod deyarli o'tkazmaydi.`
              : biasType === "forward" && voltage >= 0.3 && voltage < 0.7
                ? `Diod ochilish sohasida. Kuchlanish ortishi bilan tok eksponensial ravishda oshmoqda.`
                : biasType === "forward" && voltage >= 0.7
                  ? `Diod to'liq ochiq holatda. Tok yuqori qiymatga erishdi va kuchlanishga chiziqli bog'liq (omik qarshilik).`
                  : biasType === "reverse" && voltage < 5
                    ? `Teskari siljish sohasida. Kichik to'yinish toki oqmoqda (asosan minoritar zaryad tashuvchilar). Diod deyarli ideal izolyator vazifasini bajaradi.`
                    : `Teskari siljish kuchlanishi yuqori. Ehtiyot bo'ling - buzilish kuchlanishiga yaqinlashish mumkin!`}
          </p>
        </div>
      </div>

      {/* Nazariy ma'lumot */}
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          📚 Nazariy asoslar
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              1. Shockley tenglamasi:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              P-N o'tishning volt-amper xarakteristikasini ifodalovchi asosiy
              tenglama:
            </p>
            <p className="my-2 text-center font-mono text-sm text-gray-900">
              I = I_s × (e^(V/(n×V_t)) - 1)
            </p>
            <p className="text-xs text-gray-600">
              I_s - to'yinish toki, n - ideallik koeffitsienti (1-2), V_t = kT/q
              - termal kuchlanish
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              2. Kambekor qatlam:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              P va N sohalar chegarasida erkin zaryad tashuvchilar bo'lmagan
              soha hosil bo'ladi. Uning kengligi aralashma konsentratsiyasiga va
              kuchlanishga bog'liq:
            </p>
            <p className="my-2 text-center font-mono text-xs text-gray-900">
              W ∝ √((V_bi - V) / N_d)
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              3. To'g'ri siljish:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              P-sohaga musbat, N-sohaga manfiy potensial berilganda potensial
              to'siq pasayadi, kambekor qatlam torayadi va zaryad tashuvchilar
              o'tish orqali oson o'tadi. Tok eksponensial ravishda ortadi.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              4. Teskari siljish:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              P-sohaga manfiy, N-sohaga musbat potensial berilganda potensial
              to'siq oshadi, kambekor qatlam kengayadi. Faqat juda kichik
              to'yinish toki (minoritar zaryad tashuvchilar hisobiga) oqadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
