"use client"

import { useState } from "react"

export default function MagneticForceSimulator() {
  const [current, setCurrent] = useState(2) // A
  const [magneticField, setMagneticField] = useState(0.5) // T
  const [wireLength, setWireLength] = useState(10) // cm
  const [angle, setAngle] = useState(90) // degrees
  const [isRunning, setIsRunning] = useState(false)

  // Amper kuchi: F = B × I × L × sin(α)
  const angleRad = (angle * Math.PI) / 180
  const force =
    magneticField * current * (wireLength / 100) * Math.sin(angleRad) // N

  // Tezlanish (massani 0.01 kg deb olamiz)
  const wireMass = 0.01 // kg
  const acceleration = force / wireMass // m/s²

  // Harakat yo'nalishi
  const forceDirection = force > 0 ? "up" : force < 0 ? "down" : "none"

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Boshqaruv paneli */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Tajriba parametrlari
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tok kuchi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Tok kuchi (I)</span>
              <span className="text-lg font-bold text-blue-600">
                {current.toFixed(1)} A
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 A</span>
              <span>10 A</span>
            </div>
          </div>

          {/* Magnit maydon */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Magnit maydon (B)</span>
              <span className="text-lg font-bold text-purple-600">
                {magneticField.toFixed(2)} T
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={magneticField}
              onChange={(e) => setMagneticField(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0 T</span>
              <span>2 T</span>
            </div>
          </div>

          {/* O'tkazgich uzunligi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>O'tkazgich uzunligi (L)</span>
              <span className="text-lg font-bold text-green-600">
                {wireLength} cm
              </span>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={wireLength}
              onChange={(e) => setWireLength(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>5 cm</span>
              <span>30 cm</span>
            </div>
          </div>

          {/* Burchak */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Burchak (α)</span>
              <span className="text-lg font-bold text-orange-600">
                {angle}°
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0°</span>
              <span>180°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vizualizatsiya */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 3D ko'rinish */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">3D ko'rinish</h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
            <svg viewBox="0 0 400 400" className="w-full">
              {/* Koordinata o'qlari */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
              </defs>

              {/* X o'qi */}
              <line
                x1="50"
                y1="350"
                x2="350"
                y2="350"
                stroke="#9ca3af"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <text x="360" y="355" fontSize="14" fill="#6b7280">
                X
              </text>

              {/* Y o'qi */}
              <line
                x1="50"
                y1="350"
                x2="50"
                y2="50"
                stroke="#9ca3af"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <text x="55" y="45" fontSize="14" fill="#6b7280">
                Y
              </text>

              {/* Z o'qi (perspektiv) */}
              <line
                x1="50"
                y1="350"
                x2="150"
                y2="280"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="5,5"
                markerEnd="url(#arrowhead)"
              />
              <text x="160" y="275" fontSize="14" fill="#6b7280">
                Z
              </text>

              {/* Magnit maydon yo'nalishi (Z bo'ylab) */}
              <g>
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  opacity="0.5"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="60"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.4"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="40"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                  opacity="0.3"
                />

                {/* Magnit maydon chiziqlari (bizga qarab) */}
                {[...Array(8)].map((_, i) => (
                  <g key={i}>
                    <circle
                      cx={200 + Math.cos((i * Math.PI) / 4) * 70}
                      cy={200 + Math.sin((i * Math.PI) / 4) * 70}
                      r="6"
                      fill="#a855f7"
                    />
                    <circle
                      cx={200 + Math.cos((i * Math.PI) / 4) * 70}
                      cy={200 + Math.sin((i * Math.PI) / 4) * 70}
                      r="2"
                      fill="white"
                    />
                  </g>
                ))}

                <text
                  x="120"
                  y="190"
                  fontSize="16"
                  fontWeight="bold"
                  fill="#a855f7"
                >
                  B
                </text>
                <text x="135" y="195" fontSize="10" fill="#a855f7">
                  (bizga qarab)
                </text>
              </g>

              {/* O'tkazgich */}
              <g>
                {/* O'tkazgich chizig'i */}
                <line
                  x1={200 - wireLength * 2 * Math.cos(angleRad)}
                  y1={300 - wireLength * 2 * Math.sin(angleRad)}
                  x2={200 + wireLength * 2 * Math.cos(angleRad)}
                  y2={300 + wireLength * 2 * Math.sin(angleRad)}
                  stroke="#ef4444"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Tok yo'nalishi */}
                {current > 0 && (
                  <>
                    <line
                      x1={
                        200 +
                        wireLength * 2 * Math.cos(angleRad) -
                        15 * Math.cos(angleRad)
                      }
                      y1={
                        300 +
                        wireLength * 2 * Math.sin(angleRad) -
                        15 * Math.sin(angleRad)
                      }
                      x2={200 + wireLength * 2 * Math.cos(angleRad)}
                      y2={300 + wireLength * 2 * Math.sin(angleRad)}
                      stroke="#fbbf24"
                      strokeWidth="4"
                      markerEnd="url(#currentArrow)"
                    />
                    <defs>
                      <marker
                        id="currentArrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 5, 0 10" fill="#fbbf24" />
                      </marker>
                    </defs>
                  </>
                )}

                <text
                  x="250"
                  y="290"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#ef4444"
                >
                  I = {current} A
                </text>
              </g>

              {/* Kuch vektori */}
              {force > 0.001 && (
                <g>
                  <line
                    x1="200"
                    y1="300"
                    x2="200"
                    y2={300 - Math.min(force * 50, 150)}
                    stroke="#10b981"
                    strokeWidth="5"
                    markerEnd="url(#forceArrow)"
                  >
                    <animate
                      attributeName="stroke-width"
                      values="5;7;5"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <defs>
                    <marker
                      id="forceArrow"
                      markerWidth="15"
                      markerHeight="15"
                      refX="12"
                      refY="7.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 15 7.5, 0 15" fill="#10b981" />
                    </marker>
                  </defs>
                  <text
                    x="210"
                    y={280 - Math.min(force * 50, 150)}
                    fontSize="16"
                    fontWeight="bold"
                    fill="#10b981"
                  >
                    F = {force.toFixed(3)} N
                  </text>
                </g>
              )}

              {/* Burchak yoyi */}
              {angle > 0 && angle < 180 && (
                <g>
                  <path
                    d={`M ${200 + 50 * Math.cos(0)} ${300 - 50 * Math.sin(0)} A 50 50 0 0 0 ${200 + 50 * Math.cos(angleRad)} ${300 - 50 * Math.sin(angleRad)}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                  <text
                    x="240"
                    y="310"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#f59e0b"
                  >
                    α = {angle}°
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Magnit maydon qiymati */}
          <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Magnit maydon kuchlanganligi:
              </span>
              <span className="text-xl font-bold text-purple-600">
                {magneticField.toFixed(2)} T
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-purple-100">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                style={{ width: `${(magneticField / 2) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-600">1 Tesla = 10,000 Gauss</p>
          </div>
        </div>

        {/* Kuch diagrammasi */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-green-50 p-6 shadow-md">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Kuch grafigi</h3>

          <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
            <svg viewBox="0 0 400 350" className="w-full">
              {/* O'qlar */}
              <line
                x1="40"
                y1="300"
                x2="380"
                y2="300"
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1="40"
                y1="300"
                x2="40"
                y2="40"
                stroke="#374151"
                strokeWidth="2"
              />

              <text
                x="390"
                y="305"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                α (°)
              </text>
              <text
                x="45"
                y="30"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
              >
                F (N)
              </text>

              {/* Burchak shkаласи */}
              {[0, 30, 60, 90, 120, 150, 180].map((deg, i) => (
                <g key={i}>
                  <line
                    x1={40 + i * 48}
                    y1="300"
                    x2={40 + i * 48}
                    y2="305"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x={35 + i * 48}
                    y="320"
                    fontSize="10"
                    textAnchor="middle"
                    fill="#6b7280"
                  >
                    {deg}
                  </text>
                </g>
              ))}

              {/* Kuch egri chizig'i (sin funksiyasi) */}
              <path
                d={`M ${40} ${300 - 0} ${[...Array(181)]
                  .map((_, deg) => {
                    const x = 40 + (deg / 180) * 336
                    const rad = (deg * Math.PI) / 180
                    const f =
                      magneticField *
                      current *
                      (wireLength / 100) *
                      Math.sin(rad)
                    const y = 300 - Math.min(f * 100, 250)
                    return `L ${x} ${y}`
                  })
                  .join(" ")}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* Joriy nuqta */}
              <circle
                cx={40 + (angle / 180) * 336}
                cy={300 - Math.min(force * 100, 250)}
                r="6"
                fill="#ef4444"
                stroke="#fff"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  values="6;9;6"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Maksimal qiymat chizig'i */}
              <line
                x1="40"
                y1={
                  300 -
                  Math.min(
                    magneticField * current * (wireLength / 100) * 100,
                    250,
                  )
                }
                x2="376"
                y2={
                  300 -
                  Math.min(
                    magneticField * current * (wireLength / 100) * 100,
                    250,
                  )
                }
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              <text
                x="380"
                y={
                  295 -
                  Math.min(
                    magneticField * current * (wireLength / 100) * 100,
                    250,
                  )
                }
                fontSize="10"
                fill="#f59e0b"
                fontWeight="bold"
              >
                F_max
              </text>
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="font-semibold text-gray-700">Maksimal kuch:</p>
              <p className="text-green-700">α = 90° da F_max = B×I×L</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="font-semibold text-gray-700">Minimal kuch:</p>
              <p className="text-gray-700">α = 0° yoki 180° da F = 0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Natijalar */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Hisoblash natijalari
        </h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-blue-600"></div>
              <span className="font-semibold text-gray-900">Amper kuchi:</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {force.toFixed(4)} N
            </p>
            <p className="mt-2 text-xs text-gray-600">F = B × I × L × sin(α)</p>
          </div>

          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-purple-600"></div>
              <span className="font-semibold text-gray-900">Tezlanish:</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {acceleration.toFixed(2)} m/s²
            </p>
            <p className="mt-2 text-xs text-gray-600">a = F / m</p>
          </div>

          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-orange-600"></div>
              <span className="font-semibold text-gray-900">sin(α):</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {Math.sin(angleRad).toFixed(4)}
            </p>
            <p className="mt-2 text-xs text-gray-600">α = {angle}°</p>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-600"></div>
              <span className="font-semibold text-gray-900">F_max:</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {(magneticField * current * (wireLength / 100)).toFixed(4)} N
            </p>
            <p className="mt-2 text-xs text-gray-600">α = 90° da</p>
          </div>
        </div>

        {/* Tahlil */}
        <div className="mt-6 rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-4">
          <h5 className="mb-2 font-bold text-gray-900">📊 Tahlil:</h5>
          <p className="text-sm leading-relaxed text-gray-700">
            {angle === 0 || angle === 180
              ? `Burchak ${angle}° bo'lganda o'tkazgich magnit maydon chiziqlari bo'ylab joylashgan. Bu holatda Amper kuchi nolga teng, chunki sin(${angle}°) = 0.`
              : angle === 90
                ? `Burchak 90° bo'lganda o'tkazgich magnit maydon chiziqlariga perpendikulyar. Bu holatda Amper kuchi maksimal qiymatga erishadi: F_max = ${(magneticField * current * (wireLength / 100)).toFixed(4)} N.`
                : `Burchak ${angle}° bo'lganda Amper kuchi F = ${force.toFixed(4)} N. Kuch qiymati sin(${angle}°) = ${Math.sin(angleRad).toFixed(3)} ga proporsional. Maksimal kuchning ${(Math.sin(angleRad) * 100).toFixed(1)}% i.`}
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
            <h4 className="mb-2 font-bold text-gray-900">1. Amper qonuni:</h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Magnit maydonidagi tokli o'tkazgichga ta'sir etuvchi kuch:
            </p>
            <p className="my-2 text-center font-mono text-lg text-gray-900">
              F = B × I × L × sin(α)
            </p>
            <p className="text-xs text-gray-600">
              B - magnit maydon (T), I - tok kuchi (A), L - uzunlik (m), α -
              burchak
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">
              2. Kuch yo'nalishi:
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">
              Kuch yo'nalishi chap qo'l qoidasi bilan aniqlanadi: agar chap
              qo'lning ochiq kaftini magnit maydon chiziqlariga perpendikulyar
              qilib, to'rtta barmoq tok yo'nalishini ko'rsatsa, bosh barmoq kuch
              yo'nalishini ko'rsatadi.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">3. Maksimal kuch:</h4>
            <p className="text-sm leading-relaxed text-gray-700">
              O'tkazgich magnit maydon chiziqlariga perpendikulyar (α = 90°)
              bo'lganda kuch maksimal qiymatga erishadi: F_max = B × I × L. Bu
              holatda sin(90°) = 1.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h4 className="mb-2 font-bold text-gray-900">4. Nol kuch:</h4>
            <p className="text-sm leading-relaxed text-gray-700">
              O'tkazgich magnit maydon chiziqlari bo'ylab (α = 0° yoki 180°)
              joylashganda kuch nolga teng: F = 0. Chunki sin(0°) = sin(180°) =
              0.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
