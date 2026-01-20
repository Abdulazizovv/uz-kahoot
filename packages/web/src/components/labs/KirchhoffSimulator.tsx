"use client"

import { useEffect, useState } from "react"

const KirchhoffSimulator = () => {
  // Circuit parameters
  const [v1, setV1] = useState(12) // Battery 1 voltage (V)
  const [v2, setV2] = useState(6) // Battery 2 voltage (V)
  const [r1, setR1] = useState(2) // Resistor 1 (Ω)
  const [r2, setR2] = useState(3) // Resistor 2 (Ω)
  const [r3, setR3] = useState(4) // Resistor 3 (Ω)

  // Circuit currents
  const [i1, setI1] = useState(0) // Current through R1
  const [i2, setI2] = useState(0) // Current through R2
  const [i3, setI3] = useState(0) // Current through R3

  useEffect(() => {
    // Solving using Kirchhoff's laws for a two-loop circuit
    // Loop 1: V1 = I1*R1 + I3*R3
    // Loop 2: V2 = I2*R2 - I3*R3
    // Junction: I1 = I2 + I3

    // Solving the system of equations
    const det = r1 * r2 + r1 * r3 + r2 * r3
    const calcI1 = (v1 * (r2 + r3) + v2 * r3) / det
    const calcI2 = (v2 * (r1 + r3) - v1 * r3) / det
    const calcI3 = (v1 * r2 - v2 * r1) / det

    setI1(calcI1)
    setI2(calcI2)
    setI3(calcI3)
  }, [v1, v2, r1, r2, r3])

  // Calculate voltages across resistors
  const vR1 = i1 * r1
  const vR2 = i2 * r2
  const vR3 = i3 * r3

  // Calculate power dissipated
  const p1 = i1 * i1 * r1
  const p2 = i2 * i2 * r2
  const p3 = i3 * i3 * r3
  const totalPower = p1 + p2 + p3

  return (
    <div className="space-y-6">
      {/* Theory */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            ⚡
          </span>
          Kirxgof qonunlari
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="rounded-xl border-2 border-blue-300 bg-white p-5 shadow-md">
            <h4 className="mb-3 text-lg font-bold text-blue-900">
              1-qonun: Tugunlar uchun qonun (Tok qonuni)
            </h4>
            <div className="mb-3 rounded-lg bg-blue-50 p-4 text-center">
              <span className="text-3xl font-bold text-blue-900">∑ I = 0</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tugunga kirayotgan toklarning algebraik yig'indisi nolga teng.
              Ya'ni,
              <strong>
                {" "}
                tugunga kirayotgan toklar = tugundan chiqayotgan toklar
              </strong>
            </p>
            <div className="mt-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 p-3 text-center">
              <code className="font-mono font-semibold text-blue-900">
                I₁ = I₂ + I₃
              </code>
            </div>
          </div>

          <div className="rounded-xl border-2 border-purple-300 bg-white p-5 shadow-md">
            <h4 className="mb-3 text-lg font-bold text-purple-900">
              2-qonun: Konturlar uchun qonun (Kuchlanish qonuni)
            </h4>
            <div className="mb-3 rounded-lg bg-purple-50 p-4 text-center">
              <span className="text-3xl font-bold text-purple-900">
                ∑ V = ∑ I·R
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Yopiq konturda barcha EYuK larning algebraik yig'indisi, shu
              konturdagi
              <strong>
                {" "}
                barcha kuchlanish tushishlarining yig'indisiga teng
              </strong>
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-3 text-center">
                <code className="font-mono font-semibold text-purple-900">
                  Kontur 1: V₁ = I₁·R₁ + I₃·R₃
                </code>
              </div>
              <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-3 text-center">
                <code className="font-mono font-semibold text-purple-900">
                  Kontur 2: V₂ = I₂·R₂ - I₃·R₃
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800">
            🔋 EYuK manbaalari
          </h3>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                V₁ (Birinchi manba)
              </label>
              <span className="rounded-md bg-red-100 px-3 py-1 text-lg font-bold text-red-900">
                {v1} V
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={24}
              step={1}
              value={v1}
              onChange={(e) => setV1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                V₂ (Ikkinchi manba)
              </label>
              <span className="rounded-md bg-orange-100 px-3 py-1 text-lg font-bold text-orange-900">
                {v2} V
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={24}
              step={1}
              value={v2}
              onChange={(e) => setV2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <h3 className="pt-4 text-lg font-bold text-gray-800">
            ⚡ Qarshiliklar
          </h3>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">R₁</label>
              <span className="rounded-md bg-blue-100 px-3 py-1 text-lg font-bold text-blue-900">
                {r1} Ω
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={r1}
              onChange={(e) => setR1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">R₂</label>
              <span className="rounded-md bg-green-100 px-3 py-1 text-lg font-bold text-green-900">
                {r2} Ω
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={r2}
              onChange={(e) => setR2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">R₃</label>
              <span className="rounded-md bg-purple-100 px-3 py-1 text-lg font-bold text-purple-900">
                {r3} Ω
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={r3}
              onChange={(e) => setR3(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800">
            📊 Tok va kuchlanishlar
          </h3>

          <div className="space-y-3">
            <div className="rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                I₁ (R₁ orqali)
              </div>
              <div className="text-3xl font-bold text-blue-900">
                {i1.toFixed(3)} A
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Kuchlanish tushishi: <strong>{vR1.toFixed(2)} V</strong>
              </div>
              <div className="text-sm text-gray-600">
                Quvvat: <strong>{p1.toFixed(2)} W</strong>
              </div>
            </div>

            <div className="rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-green-700 uppercase">
                I₂ (R₂ orqali)
              </div>
              <div className="text-3xl font-bold text-green-900">
                {i2.toFixed(3)} A
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Kuchlanish tushishi: <strong>{vR2.toFixed(2)} V</strong>
              </div>
              <div className="text-sm text-gray-600">
                Quvvat: <strong>{p2.toFixed(2)} W</strong>
              </div>
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-purple-700 uppercase">
                I₃ (R₃ orqali)
              </div>
              <div className="text-3xl font-bold text-purple-900">
                {i3.toFixed(3)} A
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Kuchlanish tushishi: <strong>{vR3.toFixed(2)} V</strong>
              </div>
              <div className="text-sm text-gray-600">
                Quvvat: <strong>{p3.toFixed(2)} W</strong>
              </div>
            </div>

            <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4">
              <div className="mb-1 text-xs font-semibold tracking-wider text-orange-700 uppercase">
                Umumiy quvvat
              </div>
              <div className="text-3xl font-bold text-orange-900">
                {totalPower.toFixed(2)} W
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Diagram */}
      <div className="rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-lg">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          🔌 Elektr zanjiri sxemasi
        </h3>

        <div className="relative mx-auto max-w-4xl">
          <svg viewBox="0 0 700 500" className="w-full">
            {/* V1 Battery (left) */}
            <g transform="translate(50, 200)">
              <rect
                x="0"
                y="0"
                width="50"
                height="70"
                fill="#ef4444"
                rx="8"
                stroke="white"
                strokeWidth="3"
              />
              <text
                x="25"
                y="40"
                fill="white"
                fontSize="28"
                fontWeight="bold"
                textAnchor="middle"
              >
                +
              </text>
              <text
                x="25"
                y="-15"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                V₁={v1}V
              </text>
            </g>

            {/* V2 Battery (right) */}
            <g transform="translate(600, 200)">
              <rect
                x="0"
                y="0"
                width="50"
                height="70"
                fill="#f97316"
                rx="8"
                stroke="white"
                strokeWidth="3"
              />
              <text
                x="25"
                y="40"
                fill="white"
                fontSize="28"
                fontWeight="bold"
                textAnchor="middle"
              >
                +
              </text>
              <text
                x="25"
                y="-15"
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                V₂={v2}V
              </text>
            </g>

            {/* Wires */}
            <line
              x1="100"
              y1="235"
              x2="200"
              y2="235"
              stroke="#fbbf24"
              strokeWidth="5"
            />
            <line
              x1="400"
              y1="235"
              x2="600"
              y2="235"
              stroke="#fbbf24"
              strokeWidth="5"
            />

            <line
              x1="300"
              y1="160"
              x2="300"
              y2="80"
              stroke="#fbbf24"
              strokeWidth="5"
            />
            <line
              x1="300"
              y1="80"
              x2="50"
              y2="80"
              stroke="#fbbf24"
              strokeWidth="5"
            />
            <line
              x1="50"
              y1="80"
              x2="50"
              y2="200"
              stroke="#fbbf24"
              strokeWidth="5"
            />

            <line
              x1="300"
              y1="310"
              x2="300"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="5"
            />
            <line
              x1="300"
              y1="400"
              x2="650"
              y2="400"
              stroke="#fbbf24"
              strokeWidth="5"
            />
            <line
              x1="650"
              y1="400"
              x2="650"
              y2="270"
              stroke="#fbbf24"
              strokeWidth="5"
            />

            {/* R1 (top center) */}
            <g transform="translate(200, 140)">
              <rect
                x="0"
                y="0"
                width="100"
                height="50"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="3"
                rx="6"
              />
              <text
                x="50"
                y="30"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
              >
                R₁={r1}Ω
              </text>
              <text
                x="50"
                y="-15"
                fill="#60a5fa"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                I₁={i1.toFixed(2)}A
              </text>
            </g>

            {/* R2 (bottom center) */}
            <g transform="translate(400, 210)">
              <rect
                x="0"
                y="0"
                width="100"
                height="50"
                fill="#10b981"
                stroke="white"
                strokeWidth="3"
                rx="6"
              />
              <text
                x="50"
                y="30"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
              >
                R₂={r2}Ω
              </text>
              <text
                x="50"
                y="75"
                fill="#34d399"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                I₂={i2.toFixed(2)}A
              </text>
            </g>

            {/* R3 (middle vertical) */}
            <g transform="translate(275, 190)">
              <rect
                x="0"
                y="0"
                width="50"
                height="100"
                fill="#a855f7"
                stroke="white"
                strokeWidth="3"
                rx="6"
              />
              <text
                x="25"
                y="55"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
                transform="rotate(-90 25 55)"
              >
                R₃={r3}Ω
              </text>
              <text
                x="-20"
                y="50"
                fill="#c084fc"
                fontSize="14"
                fontWeight="bold"
                textAnchor="end"
              >
                I₃={i3.toFixed(2)}A
              </text>
            </g>

            {/* Junction points */}
            <circle
              cx="300"
              cy="160"
              r="8"
              fill="#fde047"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="310"
              r="8"
              fill="#fde047"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx="400"
              cy="235"
              r="8"
              fill="#fde047"
              stroke="white"
              strokeWidth="2"
            />

            {/* Animated electrons */}
            <circle r="6" fill="#fde047">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 100,235 L 200,235 L 250,190 L 300,160 L 300,80 L 50,80 L 50,200"
              />
            </circle>
            <circle r="6" fill="#fde047">
              <animateMotion
                dur="4s"
                begin="2s"
                repeatCount="indefinite"
                path="M 400,235 L 500,235 L 600,235 L 650,270 L 650,400 L 300,400 L 300,310"
              />
            </circle>

            {/* Loop labels */}
            <text
              x="150"
              y="150"
              fill="#60a5fa"
              fontSize="20"
              fontWeight="bold"
            >
              Kontur 1
            </text>
            <text
              x="480"
              y="330"
              fill="#34d399"
              fontSize="20"
              fontWeight="bold"
            >
              Kontur 2
            </text>
          </svg>
        </div>
      </div>

      {/* Verification */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          ✅ Qonunlarni tekshirish
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
            <h4 className="mb-3 font-bold text-blue-900">
              1-qonun (Tugunlar uchun):
            </h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded-lg bg-white p-3">
                <strong>I₁ = I₂ + I₃</strong>
              </div>
              <div className="rounded-lg bg-white p-3">
                {i1.toFixed(4)} = {i2.toFixed(4)} + {i3.toFixed(4)}
              </div>
              <div className="rounded-lg bg-white p-3">
                {i1.toFixed(4)} ≈ {(i2 + i3).toFixed(4)}
              </div>
              <div
                className={`rounded-lg p-3 font-bold ${Math.abs(i1 - (i2 + i3)) < 0.001 ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}
              >
                {Math.abs(i1 - (i2 + i3)) < 0.001
                  ? "✓ Qonun bajarilmoqda!"
                  : "✗ Xatolik"}
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-5">
            <h4 className="mb-3 font-bold text-purple-900">
              2-qonun (Konturlar uchun):
            </h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded-lg bg-white p-3">
                <strong>Kontur 1:</strong> V₁ = I₁·R₁ + I₃·R₃
              </div>
              <div className="rounded-lg bg-white p-3">
                {v1} = {(i1 * r1).toFixed(2)} + {(i3 * r3).toFixed(2)}
              </div>
              <div className="rounded-lg bg-white p-3">
                {v1} ≈ {(i1 * r1 + i3 * r3).toFixed(2)}
              </div>
              <div
                className={`rounded-lg p-3 font-bold ${Math.abs(v1 - (i1 * r1 + i3 * r3)) < 0.1 ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}
              >
                {Math.abs(v1 - (i1 * r1 + i3 * r3)) < 0.1
                  ? "✓ Qonun bajarilmoqda!"
                  : "✗ Xatolik"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-green-900">
            💡 Amaliy qo'llanish
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600">▸</span>
              <span>Murakkab elektr zanjirlarda toklarni hisoblash</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">▸</span>
              <span>Elektr tarmoqlarini loyihalashda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">▸</span>
              <span>Elektron sxemalarni tahlil qilishda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">▸</span>
              <span>Quvvat taqsimotini optimallashtirish</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-orange-900">
            📌 Esda tuting
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>Tok yo'nalishini to'g'ri tanlash muhim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>
                Manfiy tok qiymat yo'nalishning teskari ekanini bildiradi
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>
                Konturlarni soat mili bo'yicha aylanib belgilash qulay
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">▸</span>
              <span>
                Tenglamalar soni noma'lumlar soniga teng bo'lishi kerak
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KirchhoffSimulator
