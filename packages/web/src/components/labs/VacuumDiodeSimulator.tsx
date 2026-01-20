"use client"

import { useEffect, useState } from "react"

export default function VacuumDiodeSimulator() {
  const [anodeVoltage, setAnodeVoltage] = useState(50) // V
  const [cathodeTemp, setCathodeTemp] = useState(2000) // K
  const [distance, setDistance] = useState(5) // mm
  const [isRunning, setIsRunning] = useState(false)
  const [measurements, setMeasurements] = useState<
    Array<{ voltage: number; current: number }>
  >([])

  // Child-Langmuir qonuni konstantasi
  const PERVEANCE = 2.33e-6 // A/V^(3/2)

  // Richardson-Dushman konstantalari
  const RICHARDSON_CONST = 60 // A/(cm²·K²)
  const WORK_FUNCTION = 4.5 // eV

  // Anod tokini hisoblash (Child-Langmuir qonuni)
  const calculateAnodeCurrent = (voltage: number, dist: number) => {
    if (voltage <= 0) return 0
    // I = k × V^(3/2) / d²
    const k = PERVEANCE * (cathodeTemp / 2000) // Haroratga bog'liq koeffitsient
    const current = (k * Math.pow(voltage, 1.5)) / Math.pow(dist / 10, 2) // mA
    return Math.min(current * 1000, 500) // Maksimal 500 mA
  }

  // Katod emissiya tokini hisoblash (Richardson-Dushman qonuni)
  const calculateSaturationCurrent = (temp: number) => {
    // Js = A × T² × exp(-W/(k×T))
    const k = 8.617e-5 // eV/K - Boltzmann konstantasi
    const emissionCurrent =
      RICHARDSON_CONST *
      Math.pow(temp, 2) *
      Math.exp(-WORK_FUNCTION / (k * temp))
    return emissionCurrent / 100 // mA ga o'tkazish
  }

  const anodeCurrent = calculateAnodeCurrent(anodeVoltage, distance)
  const saturationCurrent = calculateSaturationCurrent(cathodeTemp)
  const actualCurrent = Math.min(anodeCurrent, saturationCurrent)

  // Diod qarshiligi
  const diodeResistance =
    anodeVoltage > 0 ? anodeVoltage / (actualCurrent / 1000) : Infinity

  // Quvvat
  const power = anodeVoltage * (actualCurrent / 1000) // Watt

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setAnodeVoltage((prev) => {
          const next = prev + 5
          if (next >= 200) {
            setIsRunning(false)
            return 200
          }
          // O'lchov nuqtasini qo'shish
          const current = calculateAnodeCurrent(next, distance)
          const actualI = Math.min(current, saturationCurrent)
          setMeasurements((prevMeas) => [
            ...prevMeas,
            { voltage: next, current: actualI },
          ])
          return next
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [isRunning, distance, saturationCurrent])

  const handleStart = () => {
    setMeasurements([])
    setAnodeVoltage(0)
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setMeasurements([])
    setAnodeVoltage(50)
    setCathodeTemp(2000)
    setDistance(5)
  }

  // Grafikni chizish uchun nuqtalar
  const maxVoltage = 200
  const maxCurrent = 500

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Boshqaruv paneli */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Diod parametrlari
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Anod kuchlanishi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Anod kuchlanishi (Uₐ)</span>
              <span className="text-lg font-bold text-blue-600">
                {anodeVoltage} V
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={anodeVoltage}
              onChange={(e) => setAnodeVoltage(Number(e.target.value))}
              disabled={isRunning}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 V</span>
              <span>200 V</span>
            </div>
          </div>

          {/* Katod harorati */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Katod harorati (T)</span>
              <span className="text-lg font-bold text-orange-600">
                {cathodeTemp} K
              </span>
            </label>
            <input
              type="range"
              min="1500"
              max="2500"
              step="100"
              value={cathodeTemp}
              onChange={(e) => setCathodeTemp(Number(e.target.value))}
              disabled={isRunning}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>1500 K</span>
              <span>2500 K</span>
            </div>
          </div>

          {/* Elektrodlar orasidagi masofa */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Elektrodlar oralig'i (d)</span>
              <span className="text-lg font-bold text-purple-600">
                {distance} mm
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              disabled={isRunning}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>1 mm</span>
              <span>15 mm</span>
            </div>
          </div>
        </div>

        {/* Boshqaruv tugmalari */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {isRunning ? "Avtomatik o'lchov..." : "Avtomatik o'lchash"}
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            Qayta boshlash
          </button>
        </div>
      </div>

      {/* Vizualizatsiya */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Diod strukturasi */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Diod strukturasi
          </h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
            <svg viewBox="0 0 400 300" className="w-full">
              {/* Vakuum lampa konturi */}
              <ellipse
                cx="200"
                cy="150"
                rx="150"
                ry="120"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
              />
              <ellipse
                cx="200"
                cy="150"
                rx="155"
                ry="125"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
              />

              {/* Katod (qizil - qizigan) */}
              <g>
                <line
                  x1="80"
                  y1="80"
                  x2="80"
                  y2="220"
                  stroke={cathodeTemp > 1800 ? "#ef4444" : "#9ca3af"}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {cathodeTemp > 1800 && (
                  <>
                    {/* Qizish effekti */}
                    <circle
                      cx="80"
                      cy="100"
                      r="15"
                      fill="#fbbf24"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="15;20;15"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0.1;0.4"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="80"
                      cy="150"
                      r="18"
                      fill="#fbbf24"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="18;23;18"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0.1;0.4"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="80"
                      cy="200"
                      r="16"
                      fill="#fbbf24"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="16;21;16"
                        dur="1.1s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0.1;0.4"
                        dur="1.1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}
                <text
                  x="80"
                  y="250"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#ef4444"
                >
                  Katod (-)
                </text>
              </g>

              {/* Anod */}
              <g>
                <rect
                  x="310"
                  y="80"
                  width="10"
                  height="140"
                  fill="#3b82f6"
                  rx="2"
                />
                <text
                  x="320"
                  y="250"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#3b82f6"
                >
                  Anod (+)
                </text>
              </g>

              {/* Elektron oqimi */}
              {anodeVoltage > 0 && actualCurrent > 0 && (
                <g>
                  {/* Elektronlar */}
                  {[...Array(Math.min(10, Math.floor(actualCurrent / 10)))].map(
                    (_, i) => (
                      <g key={i}>
                        <circle cx="100" cy={100 + i * 12} r="4" fill="#60a5fa">
                          <animate
                            attributeName="cx"
                            from="100"
                            to="310"
                            dur={`${1.5 - (actualCurrent / 500) * 0.8}s`}
                            repeatCount="indefinite"
                            begin={`${i * 0.15}s`}
                          />
                        </circle>
                        {/* Elektron izi */}
                        <line
                          x1="100"
                          y1={100 + i * 12}
                          x2="110"
                          y2={100 + i * 12}
                          stroke="#93c5fd"
                          strokeWidth="1"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="x1"
                            from="100"
                            to="310"
                            dur={`${1.5 - (actualCurrent / 500) * 0.8}s`}
                            repeatCount="indefinite"
                            begin={`${i * 0.15}s`}
                          />
                          <animate
                            attributeName="x2"
                            from="110"
                            to="320"
                            dur={`${1.5 - (actualCurrent / 500) * 0.8}s`}
                            repeatCount="indefinite"
                            begin={`${i * 0.15}s`}
                          />
                        </line>
                      </g>
                    ),
                  )}
                </g>
              )}

              {/* Masofa ko'rsatkichi */}
              <g>
                <line
                  x1="80"
                  y1="260"
                  x2="320"
                  y2="260"
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x="200"
                  y="280"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  d = {distance} mm
                </text>
              </g>

              {/* Kuchlanish ko'rsatkichi */}
              {anodeVoltage > 0 && (
                <g>
                  <text
                    x="200"
                    y="30"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#3b82f6"
                  >
                    U = {anodeVoltage} V
                  </text>
                  <line
                    x1="80"
                    y1="40"
                    x2="170"
                    y2="40"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    markerEnd="url(#arrowblue)"
                  />
                  <line
                    x1="230"
                    y1="40"
                    x2="320"
                    y2="40"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    markerStart="url(#arrowblue)"
                  />
                </g>
              )}

              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowblue"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Harorat ko'rsatkichi */}
          <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Katod harorati:
              </span>
              <span className="text-xl font-bold text-orange-600">
                {cathodeTemp} K
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-orange-100">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-600 transition-all duration-300"
                style={{ width: `${((cathodeTemp - 1500) / 1000) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-600">
              ≈ {(cathodeTemp - 273).toFixed(0)}°C (Elektronlar emissiya qilish
              uchun zarur)
            </p>
          </div>
        </div>

        {/* Volt-amper xarakteristikasi */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-purple-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Volt-amper xarakteristikasi (VAX)
          </h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
            <svg viewBox="0 0 400 300" className="w-full">
              {/* O'qlar */}
              <line
                x1="40"
                y1="260"
                x2="380"
                y2="260"
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="260"
                x2="40"
                y2="20"
                stroke="#374151"
                strokeWidth="2"
              />

              {/* O'q belgilari */}
              <text
                x="390"
                y="265"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                U (V)
              </text>
              <text
                x="45"
                y="15"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                I (mA)
              </text>

              {/* Shkala */}
              {[0, 50, 100, 150, 200].map((v, i) => (
                <g key={`v-${i}`}>
                  <line
                    x1={40 + i * 80}
                    y1="260"
                    x2={40 + i * 80}
                    y2="265"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x={40 + i * 80}
                    y="280"
                    fontSize="10"
                    textAnchor="middle"
                    fill="#6b7280"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {[0, 100, 200, 300, 400, 500].map((c, i) => (
                <g key={`c-${i}`}>
                  <line
                    x1="35"
                    y1={260 - i * 40}
                    x2="40"
                    y2={260 - i * 40}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x="30"
                    y={265 - i * 40}
                    fontSize="10"
                    textAnchor="end"
                    fill="#6b7280"
                  >
                    {c}
                  </text>
                </g>
              ))}

              {/* To'yinish chizig'i */}
              <line
                x1="40"
                y1={260 - (saturationCurrent / maxCurrent) * 200}
                x2="360"
                y2={260 - (saturationCurrent / maxCurrent) * 200}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              <text
                x="365"
                y={265 - (saturationCurrent / maxCurrent) * 200}
                fontSize="10"
                fill="#f59e0b"
                fontWeight="bold"
              >
                To'yinish
              </text>

              {/* O'lchangan nuqtalar */}
              {measurements.map((point, i) => (
                <circle
                  key={i}
                  cx={40 + (point.voltage / maxVoltage) * 320}
                  cy={260 - (point.current / maxCurrent) * 200}
                  r="3"
                  fill="#3b82f6"
                />
              ))}

              {/* O'lchangan nuqtalarni bog'lovchi chiziq */}
              {measurements.length > 1 && (
                <polyline
                  points={measurements
                    .map(
                      (point) =>
                        `${40 + (point.voltage / maxVoltage) * 320},${260 - (point.current / maxCurrent) * 200}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              )}

              {/* Joriy nuqta */}
              {actualCurrent > 0 && (
                <g>
                  <circle
                    cx={40 + (anodeVoltage / maxVoltage) * 320}
                    cy={260 - (actualCurrent / maxCurrent) * 200}
                    r="6"
                    fill="#ef4444"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={40 + (anodeVoltage / maxVoltage) * 320}
                    cy={260 - (actualCurrent / maxCurrent) * 200}
                    r="10"
                    fill="none"
                    stroke="#ef4444"
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
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="font-semibold text-gray-700">
                Proporsionallik sohasi:
              </p>
              <p className="text-gray-600">I ∝ U^(3/2) (Child-Langmuir)</p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
              <p className="font-semibold text-gray-700">To'yinish sohasi:</p>
              <p className="text-gray-600">I ≈ const (Cheklangan)</p>
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
              <span className="font-semibold text-gray-900">Anod toki:</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {actualCurrent.toFixed(2)} mA
            </p>
            <p className="mt-2 text-xs text-gray-600">Iₐ = k × U^(3/2) / d²</p>
          </div>

          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-orange-600"></div>
              <span className="font-semibold text-gray-900">
                To'yinish toki:
              </span>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {saturationCurrent.toFixed(2)} mA
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Richardson-Dushman qonuni
            </p>
          </div>

          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-purple-600"></div>
              <span className="font-semibold text-gray-900">Qarshilik:</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {diodeResistance === Infinity ? "∞" : diodeResistance.toFixed(1)}{" "}
              Ω
            </p>
            <p className="mt-2 text-xs text-gray-600">R = U / I</p>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-600"></div>
              <span className="font-semibold text-gray-900">Quvvat:</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {power.toFixed(3)} W
            </p>
            <p className="mt-2 text-xs text-gray-600">P = U × I</p>
          </div>
        </div>

        {/* Xulosa */}
        <div className="mt-6 rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-4">
          <h5 className="mb-2 font-bold text-gray-900">📊 Tahlil:</h5>
          <p className="text-sm leading-relaxed text-gray-700">
            {actualCurrent < saturationCurrent * 0.8
              ? `Diod fazoviy zaryad sohаsida ishlayapti. Anod toki kuchlanishning 3/2 darajasiga proporsional (Child-Langmuir qonuni). Tok katod emissiyasi bilan cheklanmagan.`
              : `Diod to'yinish sohasiga yaqinlashdi yoki to'yinish sohasida. Anod toki katod emissiyasi bilan cheklanmoqda. Kuchlanishni oshirish tokni sezilarli darajada oshirmaydi.`}
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
              1. Child-Langmuir qonuni:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Fazoviy zaryad chegaralangan rejimda anod toki kuchlanishning 3/2
              darajasiga va elektrodlar orasidagi masofaning kvadratiga teskari
              proporsionaldir:
            </p>
            <p className="mt-2 text-center font-mono text-sm text-gray-900">
              I = k × U^(3/2) / d²
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              2. Richardson-Dushman qonuni:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Qizdirilgan metall sirtidan elektron emissiya zichligi haroratga
              bog'liq:
            </p>
            <p className="mt-2 text-center font-mono text-sm text-gray-900">
              J = A × T² × exp(-W/(k×T))
            </p>
            <p className="mt-2 text-xs text-gray-600">
              A - Richardson konstantasi, W - chiqish ishi, k - Boltzmann
              konstantasi
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              3. Fazoviy zaryad effekti:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Katoddan chiqayotgan elektronlar katod yaqinida manfiy fazoviy
              zaryad hosil qiladi. Bu zaryad keyingi elektronlarning chiqishiga
              to'sqinlik qiladi va anod tokini cheklaydi.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              4. To'yinish rejimi:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Kuchlanish yuqori qiymatlarda barcha emissiya qilingan elektronlar
              anodga yetadi va tok to'yinish qiymatiga erishadi. Bu qiymat faqat
              katod haroratiga bog'liq.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
