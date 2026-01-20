"use client"

import { useEffect, useState } from "react"

export default function HeatingDeviceSimulator() {
  const [voltage, setVoltage] = useState(220) // V
  const [current, setCurrent] = useState(2) // A
  const [time, setTime] = useState(5) // daqiqa
  const [waterMass, setWaterMass] = useState(1) // kg
  const [initialTemp, setInitialTemp] = useState(20) // °C
  const [finalTemp, setFinalTemp] = useState(0) // °C
  const [isHeating, setIsHeating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Fizik konstantalar
  const WATER_SPECIFIC_HEAT = 4200 // J/(kg·K) - suvning solishtirma issiqlik sig'imi
  const HEAT_LOSS_COEFFICIENT = 0.15 // Issiqlik yo'qotish koeffitsienti

  useEffect(() => {
    if (isHeating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsHeating(false)
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isHeating])

  // Elektr quvvatini hisoblash
  const electricPower = voltage * current // Watt

  // Sarflangan elektr energiyasini hisoblash
  const electricEnergy = electricPower * time * 60 // Joule

  // Foydali issiqlik energiyasini hisoblash (suvni isitish uchun zarur)
  const tempDifference = finalTemp > initialTemp ? finalTemp - initialTemp : 0
  const usefulEnergy = waterMass * WATER_SPECIFIC_HEAT * tempDifference // Joule

  // F.I.K. (Foydali Ish Koeffitsienti) ni hisoblash
  const efficiency =
    electricEnergy > 0 ? (usefulEnergy / electricEnergy) * 100 : 0

  // Yo'qotilgan energiya
  const lostEnergy = electricEnergy - usefulEnergy

  // Nazariy maksimal harorat
  const theoreticalMaxTemp =
    initialTemp +
    (electricEnergy * (1 - HEAT_LOSS_COEFFICIENT)) /
      (waterMass * WATER_SPECIFIC_HEAT)

  const handleStart = () => {
    if (finalTemp <= initialTemp) {
      alert("Yakuniy harorat boshlang'ich haroratdan yuqori bo'lishi kerak!")
      return
    }
    setIsHeating(true)
    setProgress(0)
  }

  const handleReset = () => {
    setIsHeating(false)
    setProgress(0)
    setVoltage(220)
    setCurrent(2)
    setTime(5)
    setWaterMass(1)
    setInitialTemp(20)
    setFinalTemp(0)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Boshqaruv paneli */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Isitgich parametrlari
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Kuchlanish */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Kuchlanish (U)</span>
              <span className="text-lg font-bold text-blue-600">
                {voltage} V
              </span>
            </label>
            <input
              type="range"
              min="100"
              max="250"
              step="10"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>100 V</span>
              <span>250 V</span>
            </div>
          </div>

          {/* Tok kuchi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Tok kuchi (I)</span>
              <span className="text-lg font-bold text-blue-600">
                {current} A
              </span>
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0.5 A</span>
              <span>10 A</span>
            </div>
          </div>

          {/* Vaqt */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Isitish vaqti (t)</span>
              <span className="text-lg font-bold text-blue-600">
                {time} daq
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>1 daq</span>
              <span>30 daq</span>
            </div>
          </div>

          {/* Suv massasi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Suv massasi (m)</span>
              <span className="text-lg font-bold text-blue-600">
                {waterMass} kg
              </span>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={waterMass}
              onChange={(e) => setWaterMass(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0.5 kg</span>
              <span>5 kg</span>
            </div>
          </div>

          {/* Boshlang'ich harorat */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Boshlang'ich harorat (t₁)</span>
              <span className="text-lg font-bold text-blue-600">
                {initialTemp} °C
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={initialTemp}
              onChange={(e) => setInitialTemp(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 °C</span>
              <span>50 °C</span>
            </div>
          </div>

          {/* Yakuniy harorat */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Yakuniy harorat (t₂)</span>
              <span className="text-lg font-bold text-blue-600">
                {finalTemp} °C
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={finalTemp}
              onChange={(e) => setFinalTemp(Number(e.target.value))}
              disabled={isHeating}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:opacity-50"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 °C</span>
              <span>100 °C</span>
            </div>
          </div>
        </div>

        {/* Boshqaruv tugmalari */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleStart}
            disabled={isHeating}
            className="flex-1 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
          >
            {isHeating ? "Isitilmoqda..." : "Isitishni boshlash"}
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
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Isitish jarayoni
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Isitgich animatsiyasi */}
          <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
            <div className="mx-auto max-w-xs">
              <svg viewBox="0 0 200 300" className="w-full">
                {/* Idish */}
                <rect
                  x="50"
                  y="100"
                  width="100"
                  height="150"
                  fill="#e0e0e0"
                  stroke="#666"
                  strokeWidth="2"
                  rx="5"
                />

                {/* Suv */}
                <rect
                  x="55"
                  y={250 - progress * 1.4}
                  width="90"
                  height={progress * 1.4}
                  fill={isHeating ? "#60a5fa" : "#93c5fd"}
                  opacity="0.8"
                />

                {/* Bug' */}
                {isHeating && progress > 50 && (
                  <>
                    <circle cx="70" cy="80" r="8" fill="#ccc" opacity="0.6">
                      <animate
                        attributeName="cy"
                        from="90"
                        to="60"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="100" cy="75" r="10" fill="#ccc" opacity="0.6">
                      <animate
                        attributeName="cy"
                        from="85"
                        to="55"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="130" cy="70" r="9" fill="#ccc" opacity="0.6">
                      <animate
                        attributeName="cy"
                        from="80"
                        to="50"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                {/* Isitish spirali */}
                <g>
                  <path
                    d="M 70 270 Q 75 265, 80 270 T 90 270 T 100 270 T 110 270 T 120 270 T 130 270"
                    stroke={isHeating ? "#ef4444" : "#666"}
                    strokeWidth="3"
                    fill="none"
                  />
                  {isHeating && (
                    <>
                      <circle cx="75" cy="268" r="2" fill="#fbbf24">
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="90" cy="268" r="2" fill="#fbbf24">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="105" cy="268" r="2" fill="#fbbf24">
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="120" cy="268" r="2" fill="#fbbf24">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </>
                  )}
                </g>

                {/* Harorat ko'rsatkichi */}
                <g transform="translate(160, 120)">
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="100"
                    fill="white"
                    stroke="#666"
                    strokeWidth="1"
                    rx="10"
                  />
                  <rect
                    x="5"
                    y={100 - progress}
                    width="10"
                    height={progress}
                    fill={
                      progress > 80
                        ? "#ef4444"
                        : progress > 50
                          ? "#f59e0b"
                          : "#3b82f6"
                    }
                    rx="5"
                  />
                  <circle cx="10" cy="110" r="8" fill="#ef4444" />
                </g>

                {/* Harorat qiymati */}
                <text
                  x="100"
                  y="40"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#1f2937"
                >
                  {initialTemp + Math.round((tempDifference * progress) / 100)}{" "}
                  °C
                </text>
              </svg>

              {/* Progress bar */}
              {isHeating && (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Jarayon: {progress}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Energiya diagrammasi */}
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-blue-600"></div>
                <span className="font-semibold text-gray-900">
                  Elektr quvvat:
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {electricPower.toFixed(1)} W
              </p>
              <p className="text-xs text-gray-600">P = U × I</p>
            </div>

            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-purple-600"></div>
                <span className="font-semibold text-gray-900">
                  Sarflangan energiya:
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {(electricEnergy / 1000).toFixed(2)} kJ
              </p>
              <p className="text-xs text-gray-600">Q = P × t</p>
            </div>

            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-600"></div>
                <span className="font-semibold text-gray-900">
                  Foydali energiya:
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {(usefulEnergy / 1000).toFixed(2)} kJ
              </p>
              <p className="text-xs text-gray-600">Q₁ = m × c × Δt</p>
            </div>

            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-600"></div>
                <span className="font-semibold text-gray-900">
                  Yo'qotilgan energiya:
                </span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {(lostEnergy / 1000).toFixed(2)} kJ
              </p>
              <p className="text-xs text-gray-600">Q₂ = Q - Q₁</p>
            </div>
          </div>
        </div>
      </div>

      {/* Natijalar */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          F.I.K. va natijalar
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* F.I.K. */}
          <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
            <h4 className="mb-4 text-lg font-bold text-gray-900">
              Foydali Ish Koeffitsienti (F.I.K.)
            </h4>
            <div className="mb-4 text-center">
              <p className="text-5xl font-bold text-indigo-600">
                {efficiency.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-sm font-medium text-gray-700">Formula:</p>
              <p className="mt-2 text-center font-mono text-lg text-gray-900">
                η = (Q₁ / Q) × 100%
              </p>
              <p className="mt-3 text-xs text-gray-600">
                Q₁ - Foydali energiya (suvni isitish)
                <br />Q - Sarflangan elektr energiyasi
              </p>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Samaradorlik darajasi:
                </span>
                <span
                  className={`font-bold ${
                    efficiency > 80
                      ? "text-green-600"
                      : efficiency > 60
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {efficiency > 80
                    ? "Yaxshi"
                    : efficiency > 60
                      ? "O'rtacha"
                      : "Past"}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full transition-all duration-500 ${
                    efficiency > 80
                      ? "bg-green-500"
                      : efficiency > 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(efficiency, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Qo'shimcha ma'lumotlar */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h5 className="mb-3 font-bold text-gray-900">
                Nazariy maksimal harorat:
              </h5>
              <p className="text-3xl font-bold text-blue-600">
                {theoreticalMaxTemp.toFixed(1)} °C
              </p>
              <p className="mt-2 text-xs text-gray-600">
                Yo'qotishlar hisobga olinganda erishish mumkin bo'lgan maksimal
                harorat
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h5 className="mb-3 font-bold text-gray-900">
                Harorat o'zgarishi:
              </h5>
              <p className="text-3xl font-bold text-orange-600">
                Δt = {tempDifference.toFixed(1)} °C
              </p>
              <p className="mt-2 text-xs text-gray-600">
                Boshlang'ich va yakuniy haroratlar farqi
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
              <h5 className="mb-3 font-bold text-gray-900">
                Energiya yo'qotish:
              </h5>
              <p className="text-3xl font-bold text-red-600">
                {((lostEnergy / electricEnergy) * 100).toFixed(1)}%
              </p>
              <p className="mt-2 text-xs text-gray-600">
                Issiqlik yo'qotish va boshqa faktorlar tufayli
              </p>
            </div>
          </div>
        </div>

        {/* Xulosa */}
        <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
          <h5 className="mb-2 font-bold text-gray-900">📊 Xulosa:</h5>
          <p className="text-sm leading-relaxed text-gray-700">
            {efficiency > 80
              ? `Isitgich yuqori samaradorlikka ega (${efficiency.toFixed(1)}%). Elektr energiyasining ko'p qismi foydali ishga sarflanyapti. Bu isitgich samarali ishlayapti.`
              : efficiency > 60
                ? `Isitgich o'rtacha samaradorlikka ega (${efficiency.toFixed(1)}%). Energiyaning bir qismi yo'qotyapti. Issiqlik izolyatsiyasini yaxshilash tavsiya etiladi.`
                : `Isitgich past samaradorlikka ega (${efficiency.toFixed(1)}%). Energiyaning katta qismi yo'qotyapti. Qurilmani tekshirish va yo'qotishlarni kamaytirish zarur.`}
          </p>
        </div>
      </div>

      {/* Nazariy ma'lumot */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          📚 Nazariy asoslar
        </h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              1. Foydali Ish Koeffitsienti (F.I.K.):
            </h4>
            <p className="leading-relaxed">
              F.I.K. - bu qurilma tomonidan sarflangan energiyaning qancha qismi
              foydali ishga sarflanishini ko'rsatuvchi miqdor. U foizlarda
              ifodalanadi va har doim 100% dan kichik bo'ladi, chunki har qanday
              qurilmada energiya yo'qotishlari mavjud.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              2. Elektr energiyasidan issiqlik energiyasiga o'tish:
            </h4>
            <p className="leading-relaxed">
              Elektr isitgichda elektr energiyasi issiqlik energiyasiga
              aylanadi. Sarflangan elektr energiyasi: Q = P × t = U × I × t
              formula bilan hisoblanadi.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              3. Moddani isitish uchun zarur energiya:
            </h4>
            <p className="leading-relaxed">
              Suvni isitish uchun zarur bo'lgan energiya: Q = m × c × Δt formula
              bilan aniqlanadi. Bu yerda m - massa, c - solishtirma issiqlik
              sig'imi, Δt - harorat o'zgarishi.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              4. Energiya yo'qotishlari:
            </h4>
            <p className="leading-relaxed">
              Real sharoitlarda energiyaning bir qismi atrof-muhitga tarqalish,
              konveksiya va nurlanish orqali yo'qotiladi. Shuning uchun F.I.K.
              100% dan kam bo'ladi. Izolyatsiya yaxshilanganda F.I.K. ortadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
