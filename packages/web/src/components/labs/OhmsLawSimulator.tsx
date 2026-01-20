"use client"

import { useState } from "react"

interface CircuitElement {
  resistance: number
  voltage: number
  current: number
}

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  unit: string
  color: string
}

const Slider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  color,
}: SliderProps) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <label className="font-semibold text-gray-700">{label}</label>
        <span
          className={`bg-gradient-to-r text-2xl font-bold ${color} bg-clip-text text-transparent`}
        >
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  )
}

const OhmsLawSimulator = () => {
  const [voltage, setVoltage] = useState(12) // V
  const [resistance, setResistance] = useState(100) // Ω
  const [isCircuitClosed, setIsCircuitClosed] = useState(false)

  // Om qonuni: I = V / R
  const current = resistance > 0 ? voltage / resistance : 0
  const power = voltage * current // P = V * I

  const calculateColor = () => {
    const intensity = Math.min(current * 50, 255)
    return `rgb(${intensity}, ${intensity * 0.5}, 0)`
  }

  return (
    <div className="space-y-6">
      {/* Theory Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-gray-800">
          📚 Nazariy ma'lumot
        </h3>
        <div className="space-y-2 text-gray-700">
          <p className="text-lg">
            <strong>Om qonuni:</strong> O'tkazgichdagi tok kuchi kuchlanishga
            to'g'ri proporsional va qarshilikga teskari proporsionaldir.
          </p>
          <div className="my-4 rounded-xl bg-white p-4 text-center">
            <span className="text-3xl font-bold text-blue-600">I = V / R</span>
          </div>
          <div className="grid gap-2 text-sm">
            <p>
              • <strong>I</strong> - tok kuchi (A - Amper)
            </p>
            <p>
              • <strong>V</strong> - kuchlanish (V - Volt)
            </p>
            <p>
              • <strong>R</strong> - qarshilik (Ω - Om)
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Slider
          label="Kuchlanish (V)"
          value={voltage}
          onChange={setVoltage}
          min={0}
          max={24}
          step={0.5}
          unit="V"
          color="from-red-600 to-orange-600"
        />
        <Slider
          label="Qarshilik (R)"
          value={resistance}
          onChange={setResistance}
          min={10}
          max={500}
          step={10}
          unit="Ω"
          color="from-purple-600 to-pink-600"
        />
      </div>

      {/* Circuit Visualization */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-lg">
        <h3 className="mb-6 text-center text-xl font-bold text-white">
          ⚡ Elektr zanjiri
        </h3>

        <div className="relative mx-auto max-w-2xl">
          {/* Circuit SVG */}
          <svg viewBox="0 0 400 300" className="w-full">
            {/* Battery */}
            <g transform="translate(50, 130)">
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
                fontSize="12"
                textAnchor="middle"
              >
                {voltage}V
              </text>
            </g>

            {/* Wires */}
            <line
              x1="80"
              y1="150"
              x2="180"
              y2="150"
              stroke={isCircuitClosed ? calculateColor() : "#4b5563"}
              strokeWidth="4"
            />
            <line
              x1="220"
              y1="150"
              x2="350"
              y2="150"
              stroke={isCircuitClosed ? calculateColor() : "#4b5563"}
              strokeWidth="4"
            />
            <line
              x1="350"
              y1="150"
              x2="350"
              y2="250"
              stroke={isCircuitClosed ? calculateColor() : "#4b5563"}
              strokeWidth="4"
            />
            <line
              x1="350"
              y1="250"
              x2="50"
              y2="250"
              stroke={isCircuitClosed ? calculateColor() : "#4b5563"}
              strokeWidth="4"
            />
            <line
              x1="50"
              y1="250"
              x2="50"
              y2="170"
              stroke={isCircuitClosed ? calculateColor() : "#4b5563"}
              strokeWidth="4"
            />

            {/* Resistor */}
            <g transform="translate(180, 150)">
              <rect
                x="0"
                y="-15"
                width="40"
                height="30"
                fill="#fbbf24"
                stroke="#f59e0b"
                strokeWidth="2"
                rx="4"
              />
              <text
                x="20"
                y="5"
                fill="#78350f"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                R
              </text>
              <text
                x="20"
                y="-25"
                fill="white"
                fontSize="12"
                textAnchor="middle"
              >
                {resistance}Ω
              </text>
            </g>

            {/* Switch */}
            <g transform="translate(280, 230)">
              {isCircuitClosed ? (
                <line
                  x1="0"
                  y1="20"
                  x2="40"
                  y2="20"
                  stroke={calculateColor()}
                  strokeWidth="4"
                />
              ) : (
                <line
                  x1="0"
                  y1="20"
                  x2="40"
                  y2="0"
                  stroke="#4b5563"
                  strokeWidth="4"
                />
              )}
              <circle cx="0" cy="20" r="5" fill="#9ca3af" />
              <circle cx="40" cy="20" r="5" fill="#9ca3af" />
            </g>

            {/* Animated electrons */}
            {isCircuitClosed && (
              <>
                <circle r="4" fill="#fbbf24">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 80,150 L 180,150 L 220,150 L 350,150 L 350,250 L 50,250 L 50,170 Z"
                  />
                </circle>
                <circle r="4" fill="#fbbf24">
                  <animateMotion
                    dur="2s"
                    begin="0.5s"
                    repeatCount="indefinite"
                    path="M 80,150 L 180,150 L 220,150 L 350,150 L 350,250 L 50,250 L 50,170 Z"
                  />
                </circle>
                <circle r="4" fill="#fbbf24">
                  <animateMotion
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                    path="M 80,150 L 180,150 L 220,150 L 350,150 L 350,250 L 50,250 L 50,170 Z"
                  />
                </circle>
              </>
            )}
          </svg>
        </div>

        {/* Switch Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsCircuitClosed(!isCircuitClosed)}
            className={`rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 ${
              isCircuitClosed
                ? "bg-gradient-to-r from-red-600 to-red-700"
                : "bg-gradient-to-r from-green-600 to-green-700"
            }`}
          >
            {isCircuitClosed ? "🔌 Zanjirni ochish" : "🔌 Zanjirni yopish"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Tok kuchi</div>
          <div className="mb-1 text-4xl font-bold">
            {isCircuitClosed ? current.toFixed(3) : "0.000"}
          </div>
          <div className="text-sm opacity-90">Amper (A)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">Quvvat</div>
          <div className="mb-1 text-4xl font-bold">
            {isCircuitClosed ? power.toFixed(2) : "0.00"}
          </div>
          <div className="text-sm opacity-90">Vatt (W)</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm font-medium opacity-90">
            Energiya sarfi
          </div>
          <div className="mb-1 text-4xl font-bold">
            {isCircuitClosed ? ((power * 3600) / 1000).toFixed(2) : "0.00"}
          </div>
          <div className="text-sm opacity-90">kWh (1 soatda)</div>
        </div>
      </div>

      {/* Calculations */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          🧮 Hisoblashlar
        </h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Om qonuni bo'yicha tok kuchi:</span>
            <span className="font-mono text-lg font-bold text-blue-600">
              I = {voltage}V / {resistance}Ω = {current.toFixed(3)}A
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Quvvat:</span>
            <span className="font-mono text-lg font-bold text-purple-600">
              P = {voltage}V × {current.toFixed(3)}A = {power.toFixed(2)}W
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span>Qarshilikdagi kuchlanish pasayishi:</span>
            <span className="font-mono text-lg font-bold text-orange-600">
              V = {current.toFixed(3)}A × {resistance}Ω = {voltage.toFixed(2)}V
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OhmsLawSimulator
