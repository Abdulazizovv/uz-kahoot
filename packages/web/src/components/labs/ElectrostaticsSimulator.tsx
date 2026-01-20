"use client"

import { useState } from "react"

const ElectrostaticsSimulator = () => {
  const [charge1, setCharge1] = useState(5) // µC
  const [charge2, setCharge2] = useState(-5) // µC
  const [distance, setDistance] = useState(2) // cm
  const [showFieldLines, setShowFieldLines] = useState(true)

  // Kulonning qonuni: F = k * |q1 * q2| / r^2
  // k = 9 × 10^9 N⋅m²/C²
  const k = 9e9
  const distanceInMeters = distance / 100
  const charge1InCoulombs = charge1 * 1e-6
  const charge2InCoulombs = charge2 * 1e-6

  const force = Math.abs(
    (k * charge1InCoulombs * charge2InCoulombs) /
      (distanceInMeters * distanceInMeters),
  )
  const fieldStrength = Math.abs(
    (k * charge1InCoulombs) / (distanceInMeters * distanceInMeters),
  )
  const potentialEnergy =
    (k * charge1InCoulombs * charge2InCoulombs) / distanceInMeters

  const getChargeColor = (charge: number) => {
    return charge > 0 ? "#ef4444" : "#3b82f6"
  }

  const getForceDirection = () => {
    if (charge1 * charge2 > 0) {
      return "Itarish (repulsion)"
    } else {
      return "Tortish (attraction)"
    }
  }

  return (
    <div className="space-y-6">
      {/* Theory */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-gray-800">
          📚 Nazariy ma'lumot
        </h3>
        <div className="space-y-2 text-gray-700">
          <p className="text-lg">
            <strong>Kulonning qonuni:</strong> Ikki nuqtaviy zaryad orasidagi
            ta'sir kuchi zaryadlar ko'paytmasiga to'g'ri proporsional va ular
            orasidagi masofaning kvadratiga teskari proporsionaldir.
          </p>
          <div className="my-4 rounded-xl bg-white p-4 text-center">
            <span className="text-3xl font-bold text-purple-600">
              F = k · |q₁ · q₂| / r²
            </span>
          </div>
          <div className="grid gap-2 text-sm">
            <p>
              • <strong>F</strong> - elektrostatik kuch (N - Nyuton)
            </p>
            <p>
              • <strong>k</strong> - Kulon doimiysi (9 × 10⁹ N·m²/C²)
            </p>
            <p>
              • <strong>q₁, q₂</strong> - zaryadlar (C - Kulon)
            </p>
            <p>
              • <strong>r</strong> - zaryadlar orasidagi masofa (m)
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-semibold text-gray-700">Zaryad 1</label>
            <span
              className={`text-2xl font-bold`}
              style={{ color: getChargeColor(charge1) }}
            >
              {charge1 > 0 ? "+" : ""}
              {charge1} µC
            </span>
          </div>
          <input
            type="range"
            min={-10}
            max={10}
            step={0.5}
            value={charge1}
            onChange={(e) => setCharge1(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-semibold text-gray-700">Zaryad 2</label>
            <span
              className={`text-2xl font-bold`}
              style={{ color: getChargeColor(charge2) }}
            >
              {charge2 > 0 ? "+" : ""}
              {charge2} µC
            </span>
          </div>
          <input
            type="range"
            min={-10}
            max={10}
            step={0.5}
            value={charge2}
            onChange={(e) => setCharge2(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-semibold text-gray-700">Masofa</label>
            <span className="text-2xl font-bold text-green-600">
              {distance} cm
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">⚡ Elektr maydoni</h3>
          <button
            onClick={() => setShowFieldLines(!showFieldLines)}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20"
          >
            {showFieldLines
              ? "Maydon chiziqlarini yashirish"
              : "Maydon chiziqlarini ko'rsatish"}
          </button>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <svg viewBox="0 0 600 300" className="w-full">
            {/* Field Lines */}
            {showFieldLines && (
              <g opacity="0.3">
                {/* Simplified field lines */}
                {charge1 > 0 && charge2 < 0 && (
                  <>
                    <path
                      d="M 150,150 Q 300,100 450,150"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 150,150 Q 300,150 450,150"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 150,150 Q 300,200 450,150"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      fill="none"
                    />
                  </>
                )}
                {charge1 > 0 && charge2 > 0 && (
                  <>
                    <path
                      d="M 150,150 Q 100,100 50,50"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 150,150 Q 150,80 150,20"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 450,150 Q 500,100 550,50"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 450,150 Q 450,80 450,20"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                  </>
                )}
                {charge1 < 0 && charge2 < 0 && (
                  <>
                    <path
                      d="M 50,50 Q 100,100 150,150"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 150,20 Q 150,80 150,150"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 550,50 Q 500,100 450,150"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 450,20 Q 450,80 450,150"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </>
                )}
              </g>
            )}

            {/* Charge 1 */}
            <circle
              cx="150"
              cy="150"
              r="40"
              fill={getChargeColor(charge1)}
              stroke="white"
              strokeWidth="3"
            />
            <text
              x="150"
              y="160"
              fill="white"
              fontSize="32"
              fontWeight="bold"
              textAnchor="middle"
            >
              {charge1 > 0 ? "+" : "−"}
            </text>

            {/* Charge 2 */}
            <circle
              cx="450"
              cy="150"
              r="40"
              fill={getChargeColor(charge2)}
              stroke="white"
              strokeWidth="3"
            />
            <text
              x="450"
              y="160"
              fill="white"
              fontSize="32"
              fontWeight="bold"
              textAnchor="middle"
            >
              {charge2 > 0 ? "+" : "−"}
            </text>

            {/* Distance line */}
            <line
              x1="150"
              y1="220"
              x2="450"
              y2="220"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x="300"
              y="245"
              fill="#10b981"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              {distance} cm
            </text>

            {/* Force arrows */}
            {charge1 * charge2 > 0 ? (
              <>
                {/* Repulsion arrows */}
                <path
                  d="M 190,150 L 140,150 M 150,150 L 160,140 M 150,150 L 160,160"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 410,150 L 460,150 M 450,150 L 440,140 M 450,150 L 440,160"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                />
              </>
            ) : (
              <>
                {/* Attraction arrows */}
                <path
                  d="M 190,150 L 240,150 M 230,150 L 220,140 M 230,150 L 220,160"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 410,150 L 360,150 M 370,150 L 380,140 M 370,150 L 380,160"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">
            Elektrostatik kuch
          </div>
          <div className="mb-1 text-3xl font-bold">
            {force.toExponential(2)}
          </div>
          <div className="text-sm opacity-90">N (Nyuton)</div>
          <div className="mt-2 text-xs font-semibold">
            {getForceDirection()}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">
            Maydon kuchlanganligi
          </div>
          <div className="mb-1 text-3xl font-bold">
            {fieldStrength.toExponential(2)}
          </div>
          <div className="text-sm opacity-90">N/C</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">
            Potensial energiya
          </div>
          <div className="mb-1 text-3xl font-bold">
            {potentialEnergy.toExponential(2)}
          </div>
          <div className="text-sm opacity-90">J (Joul)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Ta'sir turi</div>
          <div className="mb-1 text-2xl font-bold">
            {charge1 * charge2 > 0
              ? "Itarish"
              : charge1 * charge2 < 0
                ? "Tortish"
                : "Yo'q"}
          </div>
          <div className="text-sm opacity-90">
            {charge1 * charge2 > 0
              ? "Bir xil zaryadlar"
              : charge1 * charge2 < 0
                ? "Qarama-qarshi zaryadlar"
                : ""}
          </div>
        </div>
      </div>

      {/* Calculations */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          🧮 Hisoblashlar
        </h3>
        <div className="space-y-3 font-mono text-sm text-gray-700">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-2 font-sans font-semibold text-gray-800">
              Berilgan:
            </p>
            <p>
              q₁ = {charge1} µC = {charge1InCoulombs.toExponential(2)} C
            </p>
            <p>
              q₂ = {charge2} µC = {charge2InCoulombs.toExponential(2)} C
            </p>
            <p>
              r = {distance} cm = {distanceInMeters} m
            </p>
            <p>k = 9 × 10⁹ N·m²/C²</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="mb-2 font-sans font-semibold text-gray-800">
              Kuch hisoblash:
            </p>
            <p>F = k · |q₁ · q₂| / r²</p>
            <p>F = {force.toExponential(2)} N</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectrostaticsSimulator
