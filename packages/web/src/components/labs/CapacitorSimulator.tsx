"use client"

import { useState } from "react"

const CapacitorSimulator = () => {
  const [plateArea, setPlateArea] = useState(100) // cm²
  const [plateDistance, setPlateDistance] = useState(1) // mm
  const [voltage, setVoltage] = useState(12) // V
  const [dielectricConstant, setDielectricConstant] = useState(1) // ε_r
  const [isCharging, setIsCharging] = useState(false)
  const [chargeLevel, setChargeLevel] = useState(0)

  // Kondensator sig'imi: C = ε₀ · ε_r · A / d
  const epsilon0 = 8.854e-12 // F/m (vakuumning dielektrik doimiysi)
  const areaInM2 = plateArea / 10000 // cm² -> m²
  const distanceInM = plateDistance / 1000 // mm -> m

  const capacitance = (epsilon0 * dielectricConstant * areaInM2) / distanceInM // Farad
  const capacitanceInMicroF = capacitance * 1e6 // µF
  const charge = capacitance * voltage // Kulon
  const chargeInMicroC = charge * 1e6 // µC
  const energy = 0.5 * capacitance * voltage * voltage // Joul
  const energyInMilliJ = energy * 1000 // mJ
  const electricField = voltage / distanceInM // V/m

  const dielectricMaterials = [
    { name: "Vakuum/Havo", value: 1 },
    { name: "Qog'oz", value: 3.7 },
    { name: "Plastik", value: 2.3 },
    { name: "Shisha", value: 4.5 },
    { name: "Keramika", value: 6.0 },
    { name: "Titan oksidi", value: 100 },
  ]

  const handleCharge = () => {
    setIsCharging(true)
    let level = 0
    const interval = setInterval(() => {
      level += 5
      setChargeLevel(level)
      if (level >= 100) {
        clearInterval(interval)
        setIsCharging(false)
      }
    }, 50)
  }

  const handleDischarge = () => {
    setChargeLevel(0)
  }

  return (
    <div className="space-y-6">
      {/* Theory */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-gray-800">
          📚 Nazariy ma'lumot
        </h3>
        <div className="space-y-2 text-gray-700">
          <p className="text-lg">
            <strong>Kondensator:</strong> Elektr energiyasini elektr maydon
            shaklida saqlaydigan qurilma. Sig'im ikkita o'tkazgich plastinkalar
            orasidagi dielektrik xususiyatlariga bog'liq.
          </p>
          <div className="my-4 rounded-xl bg-white p-4 text-center">
            <span className="text-3xl font-bold text-blue-600">
              C = ε₀ · εᵣ · A / d
            </span>
          </div>
          <div className="grid gap-2 text-sm">
            <p>
              • <strong>C</strong> - sig'im (F - Farad)
            </p>
            <p>
              • <strong>ε₀</strong> - vakuum dielektrik doimiysi (8.854 × 10⁻¹²
              F/m)
            </p>
            <p>
              • <strong>εᵣ</strong> - nisbiy dielektrik singdiruvchanligi
            </p>
            <p>
              • <strong>A</strong> - plastinka maydoni (m²)
            </p>
            <p>
              • <strong>d</strong> - plastinkalar orasidagi masofa (m)
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="font-semibold text-gray-700">
                Plastinka maydoni
              </label>
              <span className="text-2xl font-bold text-blue-600">
                {plateArea} cm²
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={plateArea}
              onChange={(e) => setPlateArea(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="font-semibold text-gray-700">
                Plastinkalar orasidagi masofa
              </label>
              <span className="text-2xl font-bold text-green-600">
                {plateDistance} mm
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.5}
              value={plateDistance}
              onChange={(e) => setPlateDistance(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="font-semibold text-gray-700">Kuchlanish</label>
              <span className="text-2xl font-bold text-red-600">
                {voltage} V
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <label className="mb-3 block font-semibold text-gray-700">
              Dielektrik material
            </label>
            <div className="space-y-2">
              {dielectricMaterials.map((material) => (
                <button
                  key={material.name}
                  onClick={() => setDielectricConstant(material.value)}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition-all ${
                    dielectricConstant === material.value
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{material.name}</span>
                    <span className="text-sm opacity-75">
                      εᵣ = {material.value}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-lg">
        <h3 className="mb-6 text-center text-xl font-bold text-white">
          ⚡ Kondensator modeli
        </h3>

        <div className="relative mx-auto max-w-2xl">
          <svg viewBox="0 0 400 300" className="w-full">
            {/* Battery */}
            <g transform="translate(20, 130)">
              <rect x="0" y="0" width="30" height="40" fill="#ef4444" rx="4" />
              <text
                x="15"
                y="25"
                fill="white"
                fontSize="20"
                fontWeight="bold"
                textAnchor="middle"
              >
                +
              </text>
              <text
                x="15"
                y="55"
                fill="white"
                fontSize="10"
                textAnchor="middle"
              >
                {voltage}V
              </text>
            </g>

            {/* Wires */}
            <line
              x1="50"
              y1="150"
              x2="120"
              y2="150"
              stroke={chargeLevel > 0 ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
            />
            <line
              x1="280"
              y1="150"
              x2="350"
              y2="150"
              stroke={chargeLevel > 0 ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
            />
            <line
              x1="350"
              y1="150"
              x2="350"
              y2="240"
              stroke={chargeLevel > 0 ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
            />
            <line
              x1="350"
              y1="240"
              x2="20"
              y2="240"
              stroke={chargeLevel > 0 ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
            />
            <line
              x1="20"
              y1="240"
              x2="20"
              y2="170"
              stroke={chargeLevel > 0 ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
            />

            {/* Capacitor Plates */}
            <g>
              {/* Left plate (positive) */}
              <rect
                x="120"
                y="80"
                width="15"
                height="140"
                fill={chargeLevel > 0 ? "#ef4444" : "#6b7280"}
                rx="2"
              />

              {/* Dielectric */}
              <rect
                x="135"
                y="80"
                width={plateDistance * 15}
                height="140"
                fill="#60a5fa"
                opacity="0.3"
              />

              {/* Right plate (negative) */}
              <rect
                x={135 + plateDistance * 15}
                y="80"
                width="15"
                height="140"
                fill={chargeLevel > 0 ? "#3b82f6" : "#6b7280"}
                rx="2"
              />

              {/* Charge indicators */}
              {chargeLevel > 0 && (
                <>
                  {/* Positive charges */}
                  {[...Array(5)].map((_, i) => (
                    <text
                      key={`pos-${i}`}
                      x="110"
                      y={100 + i * 28}
                      fill="#ef4444"
                      fontSize="20"
                      fontWeight="bold"
                      opacity={chargeLevel / 100}
                    >
                      +
                    </text>
                  ))}

                  {/* Negative charges */}
                  {[...Array(5)].map((_, i) => (
                    <text
                      key={`neg-${i}`}
                      x={145 + plateDistance * 15}
                      y={100 + i * 28}
                      fill="#3b82f6"
                      fontSize="20"
                      fontWeight="bold"
                      opacity={chargeLevel / 100}
                    >
                      −
                    </text>
                  ))}

                  {/* Electric field lines */}
                  {[...Array(4)].map((_, i) => (
                    <line
                      key={`field-${i}`}
                      x1="135"
                      y1={100 + i * 35}
                      x2={135 + plateDistance * 15}
                      y2={100 + i * 35}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      opacity={chargeLevel / 100}
                      markerEnd="url(#arrowhead)"
                    />
                  ))}
                </>
              )}
            </g>

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#fbbf24" />
              </marker>
            </defs>
          </svg>

          {/* Charge Level Bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-white">
              <span className="font-semibold">Zaryad darajasi:</span>
              <span className="text-2xl font-bold">{chargeLevel}%</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${chargeLevel}%` }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCharge}
              disabled={isCharging || chargeLevel >= 100}
              className="flex-1 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              🔋 Zaryadlash
            </button>
            <button
              onClick={handleDischarge}
              disabled={chargeLevel === 0}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              ⚡ Razryadlash
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Sig'im</div>
          <div className="mb-1 text-3xl font-bold">
            {capacitanceInMicroF.toFixed(3)}
          </div>
          <div className="text-sm opacity-90">µF (mikrofarad)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Zaryad</div>
          <div className="mb-1 text-3xl font-bold">
            {chargeInMicroC.toFixed(2)}
          </div>
          <div className="text-sm opacity-90">µC (mikrokulon)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Energiya</div>
          <div className="mb-1 text-3xl font-bold">
            {energyInMilliJ.toFixed(4)}
          </div>
          <div className="text-sm opacity-90">mJ (millijoul)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">
            Elektr maydoni
          </div>
          <div className="mb-1 text-3xl font-bold">
            {(electricField / 1000).toFixed(1)}
          </div>
          <div className="text-sm opacity-90">kV/m</div>
        </div>
      </div>

      {/* Calculations */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          🧮 Hisoblashlar
        </h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Sig'im:</span>
            <span className="font-mono text-lg font-bold text-blue-600">
              C = {capacitanceInMicroF.toFixed(3)} µF
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Zaryad (Q = C × V):</span>
            <span className="font-mono text-lg font-bold text-purple-600">
              Q = {chargeInMicroC.toFixed(2)} µC
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Energiya (W = ½CV²):</span>
            <span className="font-mono text-lg font-bold text-green-600">
              W = {energyInMilliJ.toFixed(4)} mJ
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Elektr maydon (E = V / d):</span>
            <span className="font-mono text-lg font-bold text-orange-600">
              E = {(electricField / 1000).toFixed(1)} kV/m
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapacitorSimulator
