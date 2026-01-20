"use client"

import { useEffect, useState } from "react"

const WheatstoneSimulator = () => {
  const [r1, setR1] = useState(100) // Ω
  const [r2, setR2] = useState(200) // Ω
  const [r3, setR3] = useState(150) // Ω
  const [rx, setRx] = useState(300) // Ω - noma'lum qarshilik
  const [voltage, setVoltage] = useState(12) // V
  const [isBalanced, setIsBalanced] = useState(false)
  const [galvanometerCurrent, setGalvanometerCurrent] = useState(0)

  useEffect(() => {
    // Uitston ko'prigi muvozanat sharti: R1/R2 = R3/Rx
    // Galvanometr toki: Ig = V * (R1*Rx - R2*R3) / (R1+R2)*(R3+Rx) + R1*R3 + R2*Rx)
    const ratio1 = r1 / r2
    const ratio2 = r3 / rx
    const diff = Math.abs(ratio1 - ratio2)

    // Agar farq juda kichik bo'lsa, muvozanat deb hisoblaymiz
    setIsBalanced(diff < 0.01)

    // Galvanometr tokini hisoblash (soddalashtirilgan)
    const numerator = voltage * (r1 * rx - r2 * r3)
    const denominator = (r1 + r2) * (r3 + rx) + r1 * r3 + r2 * rx
    const current = numerator / denominator
    setGalvanometerCurrent(current)
  }, [r1, r2, r3, rx, voltage])

  // Rx ni muvozanat sharti bo'yicha hisoblash
  const calculatedRx = (r2 * r3) / r1

  const balanceCircuit = () => {
    setRx(Number(calculatedRx.toFixed(1)))
  }

  return (
    <div className="space-y-6">
      {/* Theory */}
      <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
            📐
          </span>
          Nazariy asoslar
        </h3>
        <div className="space-y-3 text-gray-700">
          <p className="text-lg leading-relaxed">
            <strong className="text-purple-900">Uitston ko'prigi</strong> –
            noma'lum qarshilikni yuqori aniqlikda o'lchash uchun ishlatiladigan
            elektr zanjiri. Ko'prik muvozanatda bo'lganda galvanometrdan tok
            o'tmaydi.
          </p>
          <div className="my-4 rounded-xl border-2 border-purple-300 bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-sm font-semibold tracking-wider text-purple-700 uppercase">
              Muvozanat sharti
            </div>
            <span className="text-4xl font-bold text-purple-900">
              R₁/R₂ = R₃/Rₓ
            </span>
            <div className="mt-3 text-sm text-gray-600">yoki</div>
            <span className="text-3xl font-bold text-purple-900">
              Rₓ = (R₂ × R₃) / R₁
            </span>
          </div>
          <div className="grid gap-3 rounded-lg bg-purple-100 p-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-900">R₁, R₂:</span>
              <span>Ma'lum qarshiliklar (reference resistances)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-900">R₃:</span>
              <span>O'zgaruvchan qarshilik (variable resistance)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-900">Rₓ:</span>
              <span>Noma'lum qarshilik (unknown resistance)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-900">G:</span>
              <span>Galvanometr (null detector)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800">
            ⚙️ Boshqaruv paneli
          </h3>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  R₁ (Ma'lum qarshilik)
                </label>
                <span className="rounded-md bg-blue-100 px-3 py-1 text-lg font-bold text-blue-900">
                  {r1} Ω
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={r1}
                onChange={(e) => setR1(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  R₂ (Ma'lum qarshilik)
                </label>
                <span className="rounded-md bg-green-100 px-3 py-1 text-lg font-bold text-green-900">
                  {r2} Ω
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={r2}
                onChange={(e) => setR2(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  R₃ (O'zgaruvchan)
                </label>
                <span className="rounded-md bg-purple-100 px-3 py-1 text-lg font-bold text-purple-900">
                  {r3} Ω
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={r3}
                onChange={(e) => setR3(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Rₓ (Noma'lum)
                </label>
                <span className="rounded-md bg-orange-100 px-3 py-1 text-lg font-bold text-orange-900">
                  {rx} Ω
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={rx}
                onChange={(e) => setRx(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Kuchlanish manbayi
                </label>
                <span className="rounded-md bg-red-100 px-3 py-1 text-lg font-bold text-red-900">
                  {voltage} V
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={24}
                step={1}
                value={voltage}
                onChange={(e) => setVoltage(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800">
            📊 O'lchash natijalari
          </h3>

          <div
            className={`rounded-xl p-6 text-center ${isBalanced ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-orange-600"} text-white shadow-lg`}
          >
            <div className="mb-2 text-sm font-semibold tracking-wider uppercase opacity-90">
              Ko'prik holati
            </div>
            <div className="mb-2 text-4xl font-bold">
              {isBalanced ? "⚖️ Muvozanat" : "⚠️ Nomuvozanat"}
            </div>
            <div className="text-sm opacity-90">
              {isBalanced
                ? "Galvanometr: 0 A"
                : `Galvanometr: ${galvanometerCurrent.toExponential(2)} A`}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                Hisoblangan Rₓ
              </div>
              <div className="text-3xl font-bold text-blue-900">
                {calculatedRx.toFixed(2)} Ω
              </div>
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-purple-700 uppercase">
                O'rnatilgan Rₓ
              </div>
              <div className="text-3xl font-bold text-purple-900">{rx} Ω</div>
            </div>

            <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-orange-700 uppercase">
                Xatolik
              </div>
              <div className="text-3xl font-bold text-orange-900">
                {Math.abs(rx - calculatedRx).toFixed(2)} Ω
              </div>
              <div className="mt-1 text-sm text-orange-700">
                {((Math.abs(rx - calculatedRx) / calculatedRx) * 100).toFixed(
                  2,
                )}
                %
              </div>
            </div>
          </div>

          <button
            onClick={balanceCircuit}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            🎯 Avtomatik muvozanatlash
          </button>
        </div>
      </div>

      {/* Circuit Visualization */}
      <div className="rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-lg">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          🔧 Uitston ko'prigi sxemasi
        </h3>

        <div className="relative mx-auto max-w-4xl">
          <svg viewBox="0 0 600 500" className="w-full">
            {/* Battery */}
            <g transform="translate(20, 230)">
              <rect
                x="0"
                y="0"
                width="40"
                height="60"
                fill="#ef4444"
                rx="6"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x="20"
                y="35"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
              >
                +
              </text>
              <text
                x="20"
                y="-10"
                fill="white"
                fontSize="14"
                textAnchor="middle"
              >
                {voltage}V
              </text>
            </g>

            {/* Wires from battery */}
            <line
              x1="60"
              y1="260"
              x2="150"
              y2="260"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="150"
              y1="260"
              x2="150"
              y2="150"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="150"
              y1="260"
              x2="150"
              y2="370"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* R1 (top left) */}
            <g transform="translate(150, 100)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                rx="4"
              />
              <text
                x="60"
                y="25"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                R₁={r1}Ω
              </text>
            </g>
            <line
              x1="150"
              y1="120"
              x2="150"
              y2="100"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="270"
              y1="120"
              x2="300"
              y2="120"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* R2 (bottom left) */}
            <g transform="translate(150, 380)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
                rx="4"
              />
              <text
                x="60"
                y="25"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                R₂={r2}Ω
              </text>
            </g>
            <line
              x1="150"
              y1="370"
              x2="150"
              y2="380"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="270"
              y1="400"
              x2="300"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* R3 (top right) */}
            <g transform="translate(330, 100)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                fill="#a855f7"
                stroke="white"
                strokeWidth="2"
                rx="4"
              />
              <text
                x="60"
                y="25"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                R₃={r3}Ω
              </text>
            </g>
            <line
              x1="300"
              y1="120"
              x2="330"
              y2="120"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="450"
              y1="120"
              x2="480"
              y2="120"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* Rx (bottom right) */}
            <g transform="translate(330, 380)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                fill="#f97316"
                stroke="white"
                strokeWidth="2"
                rx="4"
              />
              <text
                x="60"
                y="25"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                Rₓ={rx}Ω
              </text>
            </g>
            <line
              x1="300"
              y1="400"
              x2="330"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="450"
              y1="400"
              x2="480"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* Back to battery */}
            <line
              x1="480"
              y1="120"
              x2="480"
              y2="260"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="480"
              y1="260"
              x2="480"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="4"
            />
            <line
              x1="480"
              y1="260"
              x2="60"
              y2="260"
              stroke="#fbbf24"
              strokeWidth="4"
            />

            {/* Galvanometer (center) */}
            <g transform="translate(250, 210)">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill={isBalanced ? "#10b981" : "#ef4444"}
                stroke="white"
                strokeWidth="3"
              />
              <text
                x="50"
                y="40"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
              >
                G
              </text>
              <text
                x="50"
                y="65"
                fill="white"
                fontSize="12"
                textAnchor="middle"
              >
                {isBalanced
                  ? "0 mA"
                  : `${(galvanometerCurrent * 1000).toFixed(1)} mA`}
              </text>
            </g>

            {/* Lines to galvanometer */}
            <line
              x1="300"
              y1="120"
              x2="300"
              y2="215"
              stroke={isBalanced ? "#10b981" : "#ef4444"}
              strokeWidth="4"
            />
            <line
              x1="300"
              y1="305"
              x2="300"
              y2="400"
              stroke={isBalanced ? "#10b981" : "#ef4444"}
              strokeWidth="4"
            />

            {/* Junction points */}
            <circle cx="150" cy="260" r="6" fill="#fbbf24" />
            <circle cx="480" cy="260" r="6" fill="#fbbf24" />
            <circle cx="300" cy="120" r="6" fill="#fbbf24" />
            <circle cx="300" cy="400" r="6" fill="#fbbf24" />

            {/* Animated current flow */}
            {!isBalanced && (
              <>
                <circle r="5" fill="#fde047">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M 60,260 L 150,260 L 150,120 L 270,120 L 300,120 L 300,215"
                  />
                </circle>
                <circle r="5" fill="#fde047">
                  <animateMotion
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                    path="M 60,260 L 150,260 L 150,400 L 270,400 L 300,400 L 300,305"
                  />
                </circle>
              </>
            )}
          </svg>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            {isBalanced
              ? "✅ Ko'prik muvozanatda - galvanometrdan tok o'tmayapti"
              : "⚠️ Ko'prik nomuvozanat - galvanometrdan tok o'tyapti"}
          </p>
        </div>
      </div>

      {/* Calculation Details */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          🧮 Hisoblashlar va formulalar
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
            <div className="mb-2 font-semibold text-gray-800">
              1. Muvozanat sharti:
            </div>
            <div className="font-mono text-lg text-blue-900">
              R₁/R₂ = R₃/Rₓ → {r1}/{r2} = {r3}/{rx}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Hisoblangan: {(r1 / r2).toFixed(4)} ≈ {(r3 / rx).toFixed(4)}
              {isBalanced ? " ✅ (Muvozanat!)" : " ⚠️ (Nomuvozanat)"}
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-5">
            <div className="mb-2 font-semibold text-gray-800">
              2. Noma'lum qarshilikni topish:
            </div>
            <div className="font-mono text-lg text-purple-900">
              Rₓ = (R₂ × R₃) / R₁ = ({r2} × {r3}) / {r1} ={" "}
              {calculatedRx.toFixed(2)} Ω
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-5">
            <div className="mb-2 font-semibold text-gray-800">
              3. O'lchash aniqligi:
            </div>
            <div className="font-mono text-lg text-green-900">
              Absolut xatolik: |{rx} - {calculatedRx.toFixed(2)}| ={" "}
              {Math.abs(rx - calculatedRx).toFixed(2)} Ω
            </div>
            <div className="font-mono text-lg text-green-900">
              Nisbiy xatolik:{" "}
              {((Math.abs(rx - calculatedRx) / calculatedRx) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-blue-900">
            💡 Amaliy maslahatlar
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">▸</span>
              <span>
                R₃ ni sekin o'zgartirib, galvanometr nolga yaqinlashguncha
                sozlang
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">▸</span>
              <span>
                Aniqroq o'lchash uchun R₁ va R₂ qiymatlari yaqin bo'lishi kerak
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">▸</span>
              <span>
                Muvozanat nuqtasida galvanometr ko'rsatkichi nolga teng
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">▸</span>
              <span>Yuqori aniqlik uchun sezgir galvanometr ishlatiladi</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-orange-900">
            ⚙️ Qo'llanish sohalari
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>Aniq qarshiliklarni o'lchash laboratoriyalarda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>Termometr qarshiliklarini aniqlashda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>Elektr sensorlarni kalibrlashda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>Sifat nazorati va metrologiyada</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WheatstoneSimulator
