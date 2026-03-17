"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Series = { label: string; color: string; values: number[] }

const normalize = (values: number[]) => {
  const max = Math.max(1e-12, ...values.map((x) => Math.abs(x)))
  return values.map((x) => x / max)
}

const Spark = ({ series }: { series: Series[] }) => {
  const points = series[0]?.values.length ?? 0
  if (!points) return null

  const w = 520
  const h = 160
  const pad = 10

  const toX = (i: number) => pad + (i * (w - 2 * pad)) / (points - 1)
  const toY = (y: number) => pad + ((1 - (y + 1) / 2) * (h - 2 * pad))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <rect x="0" y="0" width={w} height={h} rx="16" fill="#f8fafc" />
      <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="#cbd5e1" strokeWidth="1" />
      {series.map((s) => {
        const path = s.values
          .map((y, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(y)}`)
          .join(" ")
        return <path key={s.label} d={path} fill="none" stroke={s.color} strokeWidth="3" />
      })}
    </svg>
  )
}

type MotionMode = "pass" | "oscillate"

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const format = (value: number, digits = 3) => {
  if (!Number.isFinite(value)) return "—"
  const abs = Math.abs(value)
  if (abs !== 0 && (abs < 1e-3 || abs >= 1e3)) return value.toExponential(digits)
  return value.toFixed(digits)
}

const CHART_POINTS = 140

export default function FaradayInductionSimulator() {
  const [turns, setTurns] = useState(250)
  const [coilRadiusCm, setCoilRadiusCm] = useState(4)
  const [coilLengthCm, setCoilLengthCm] = useState(6)
  const [resistanceOhm, setResistanceOhm] = useState(6)
  const [b0mT, setB0mT] = useState(80)
  const [speedCms, setSpeedCms] = useState(35)
  const [mode, setMode] = useState<MotionMode>("pass")
  const [running, setRunning] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const [zCm, setZCm] = useState(-18)
  const [iA, setIA] = useState(0)
  const [emfV, setEmfV] = useState(0)
  const [fluxWb, setFluxWb] = useState(0)
  const [bT, setBT] = useState(0)
  const [chart, setChart] = useState<{ e: number[]; i: number[] }>({
    e: Array(CHART_POINTS).fill(0),
    i: Array(CHART_POINTS).fill(0),
  })

  const seriesRef = useRef<{ e: number[]; i: number[] }>({
    e: Array(CHART_POINTS).fill(0),
    i: Array(CHART_POINTS).fill(0),
  })
  const rafRef = useRef<number | null>(null)
  const lastTRef = useRef<number | null>(null)
  const lastChartUpdateRef = useRef<number>(0)
  const zRef = useRef<number>(zCm)
  const iRef = useRef<number>(0)

  useEffect(() => {
    zRef.current = zCm
  }, [zCm])

  useEffect(() => {
    iRef.current = iA
  }, [iA])

  const params = useMemo(() => {
    const mu0 = 4 * Math.PI * 1e-7
    const r = Math.max(0.2, coilRadiusCm) * 1e-2
    const l = Math.max(0.2, coilLengthCm) * 1e-2
    const A = Math.PI * r * r
    const B0 = Math.max(0, b0mT) * 1e-3
    const R = Math.max(1e-3, resistanceOhm)
    const v = Math.max(0, speedCms) * 1e-2
    const N = Math.max(1, Math.round(turns))
    const L = (mu0 * N * N * A) / l

    const z0 = Math.max(1e-4, r)
    const zMax = Math.max(3 * r, 0.18)

    return { mu0, r, l, A, B0, R, v, N, L, z0, zMax }
  }, [b0mT, coilLengthCm, coilRadiusCm, resistanceOhm, speedCms, turns])

  const computeAt = useMemo(() => {
    return (z: number, v: number) => {
      const { A, B0, N, R, L, z0 } = params
      const u = z / z0
      const denom = Math.pow(1 + u * u, 1.5)
      const B = denom === 0 ? 0 : B0 / denom
      const dBdz = (-3 * B0 * u) / (z0 * Math.pow(1 + u * u, 2.5))
      const flux = B * A
      const emf = -N * A * dBdz * v
      const iOhmic = emf / R
      return { B, flux, emf, iOhmic, L, R }
    }
  }, [params])

  const reset = () => {
    setRunning(false)
    setDirection(1)
    setZCm(-Math.round(params.zMax * 100))
    setIA(0)
    setEmfV(0)
    setFluxWb(0)
    setBT(0)
    seriesRef.current = {
      e: Array(CHART_POINTS).fill(0),
      i: Array(CHART_POINTS).fill(0),
    }
    setChart({ e: Array(CHART_POINTS).fill(0), i: Array(CHART_POINTS).fill(0) })
    iRef.current = 0
    lastTRef.current = null
    lastChartUpdateRef.current = 0
  }

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTRef.current = null
      return
    }

    const step = (t: number) => {
      const last = lastTRef.current
      lastTRef.current = t
      const dt = last == null ? 0 : clamp((t - last) / 1000, 0, 0.05)

      const z = zRef.current * 1e-2
      const v = direction * params.v
      const nextZ = z + v * dt

      let zClamped = nextZ
      let dir: 1 | -1 = direction

      if (mode === "oscillate") {
        if (nextZ > params.zMax) {
          zClamped = params.zMax
          dir = -1
        }
        if (nextZ < -params.zMax) {
          zClamped = -params.zMax
          dir = 1
        }
      } else {
        if (nextZ > params.zMax) {
          zClamped = params.zMax
          setRunning(false)
        }
      }

      const { B, flux, emf, iOhmic, L, R } = computeAt(zClamped, v)
      let iNext = iRef.current
      if (L > 1e-9) {
        const di = ((emf - R * iNext) / L) * dt
        iNext += di
      } else {
        iNext = iOhmic
      }

      iRef.current = iNext
      zRef.current = zClamped * 100
      setDirection(dir)
      setZCm(zClamped * 100)
      setIA(iNext)
      setEmfV(emf)
      setFluxWb(flux)
      setBT(B)

      const nextE = seriesRef.current.e.slice(1).concat(emf)
      const nextI = seriesRef.current.i.slice(1).concat(iNext)
      seriesRef.current = { e: nextE, i: nextI }

      if (t - lastChartUpdateRef.current > 90) {
        lastChartUpdateRef.current = t
        setChart({ e: normalize(nextE), i: normalize(nextI) })
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [computeAt, direction, mode, params.v, params.zMax, running])

  // `chart` is updated from the animation loop (throttled) to avoid reading refs during render.

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Elektromagnit induksiya (Faradey qonuni)
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Magnit g&apos;altak ichidan harakatlanganda magnit oqimi o&apos;zgaradi va induksiya EYuK hamda tok hosil bo&apos;ladi.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Parametrlar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">N</label>
              <input
                type="number"
                value={turns}
                onChange={(e) => setTurns(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">R (Ω)</label>
              <input
                type="number"
                value={resistanceOhm}
                onChange={(e) => setResistanceOhm(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.1}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">r (cm)</label>
              <input
                type="number"
                value={coilRadiusCm}
                onChange={(e) => setCoilRadiusCm(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.5}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">l (cm)</label>
              <input
                type="number"
                value={coilLengthCm}
                onChange={(e) => setCoilLengthCm(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.5}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">B₀ (mT)</label>
              <input
                type="number"
                value={b0mT}
                onChange={(e) => setB0mT(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                v (cm/s)
              </label>
              <input
                type="number"
                value={speedCms}
                onChange={(e) => setSpeedCms(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={1}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setRunning((v) => !v)}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              {running ? "To'xtatish" : "Boshlash"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Qayta
            </button>
            <div className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
              <span className="text-slate-600">Rejim</span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as MotionMode)}
                className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-900 outline-none"
              >
                <option value="pass">Bir marta</option>
                <option value="oscillate">Oldi-orqa</option>
              </select>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Magnit holati (z)</p>
              <span className="text-xs font-semibold text-slate-600">{format(zCm, 1)} cm</span>
            </div>
            <input
              type="range"
              min={-Math.round(params.zMax * 100)}
              max={Math.round(params.zMax * 100)}
              step={1}
              value={Math.round(zCm)}
              onChange={(e) => setZCm(Number(e.target.value))}
              className="mt-3 w-full accent-violet-600"
            />
            <p className="mt-2 text-xs text-slate-500">
              Magnitni qo&apos;lda siljitib ham dΦ/dt ni o&apos;zgartirishingiz mumkin (tok qiymati ko&apos;rinadi).
            </p>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Formulalar</p>
            <p className="mt-1 font-mono">Φ(z) = B(z)·A</p>
            <p className="mt-1 font-mono">ε = -N dΦ/dt</p>
            <p className="mt-1 font-mono">dΦ/dt = (dΦ/dz)·(dz/dt)</p>
            <p className="mt-1 font-mono">L di/dt + R i = ε</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natijalar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">B (T)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {format(bT)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Φ (Wb)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {format(fluxWb)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">ε (V)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {format(emfV)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">i (A)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {format(iA)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Vizual ko&apos;rinish</p>
            <div className="mt-3 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <svg viewBox="0 0 680 180" className="w-full">
                <rect x="0" y="0" width="680" height="180" rx="18" fill="#0f172a" />
                <defs>
                  <linearGradient id="coil" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#22c55e" />
                  </linearGradient>
                  <linearGradient id="mag" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ef4444" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* coil */}
                <circle cx="340" cy="92" r="48" fill="none" stroke="url(#coil)" strokeWidth="10" opacity="0.95" />
                <circle cx="340" cy="92" r="30" fill="none" stroke="url(#coil)" strokeWidth="6" opacity="0.55" />

                {/* magnet position mapping */}
                {(() => {
                  const xMin = 120
                  const xMax = 560
                  const zMin = -params.zMax * 100
                  const zMax = params.zMax * 100
                  const x = xMin + ((clamp(zCm, zMin, zMax) - zMin) * (xMax - xMin)) / (zMax - zMin)
                  const y = 92
                  return (
                    <>
                      <rect x={x - 34} y={y - 18} width="68" height="36" rx="10" fill="url(#mag)" />
                      <text x={x - 20} y={y + 5} fontSize="12" fill="#fff" fontWeight="700">N</text>
                      <text x={x + 12} y={y + 5} fontSize="12" fill="#fff" fontWeight="700">S</text>
                    </>
                  )
                })()}

                {/* current direction */}
                <text x="28" y="36" fontSize="13" fill="#e2e8f0" fontWeight="700">
                  Tok yo&apos;nalishi (Lents): {iA === 0 ? "—" : iA > 0 ? "↻" : "↺"}
                </text>
                <text x="28" y="58" fontSize="12" fill="#cbd5e1">
                  Harakat yo&apos;nalishi: {running ? (direction === 1 ? "→" : "←") : "—"}
                </text>
              </svg>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Model: magnit o&apos;q bo&apos;ylab harakatlanadi, B(z) silliq funksiya bilan yaqinlashtirilgan.
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">
                Grafik (normallashgan)
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-xl bg-violet-50 px-3 py-1 text-violet-700">ε(t)</span>
                <span className="rounded-xl bg-sky-50 px-3 py-1 text-sky-700">i(t)</span>
              </div>
            </div>
            <div className="mt-3">
              <Spark
                series={[
                  { label: "E", color: "#7c3aed", values: chart.e },
                  { label: "I", color: "#0284c7", values: chart.i },
                ]}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Tezlik (v), N va B₀ oshsa impuls kattalashadi; R oshsa tok kamayadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
