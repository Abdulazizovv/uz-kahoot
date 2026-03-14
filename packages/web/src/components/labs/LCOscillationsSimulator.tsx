"use client"

import { useMemo, useState } from "react"

type Series = { label: string; color: string; values: number[] }

const makeWave = (points: number, fn: (t: number) => number) => {
  const v: number[] = []
  for (let i = 0; i < points; i += 1) {
    const t = i / (points - 1)
    v.push(fn(t))
  }
  return v
}

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
      <line
        x1={pad}
        y1={h / 2}
        x2={w - pad}
        y2={h / 2}
        stroke="#cbd5e1"
        strokeWidth="1"
      />
      {series.map((s) => {
        const path = s.values
          .map((y, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(y)}`)
          .join(" ")
        return (
          <path
            key={s.label}
            d={path}
            fill="none"
            stroke={s.color}
            strokeWidth="3"
          />
        )
      })}
    </svg>
  )
}

export default function LCOscillationsSimulator() {
  const [inductancemH, setInductancemH] = useState(25)
  const [capacitanceuF, setCapacitanceuF] = useState(10)
  const [v0, setV0] = useState(5)
  const [phaseDeg, setPhaseDeg] = useState(0)
  const [timeFrac, setTimeFrac] = useState(0.15)

  const { L, C, omega, f, T, q0 } = useMemo(() => {
    const l = Math.max(0.001, inductancemH) * 1e-3
    const c = Math.max(0.001, capacitanceuF) * 1e-6
    const w = 1 / Math.sqrt(l * c)
    const freq = w / (2 * Math.PI)
    const period = 1 / Math.max(1e-12, freq)
    const Q0 = c * v0
    return { L: l, C: c, omega: w, f: freq, T: period, q0: Q0 }
  }, [inductancemH, capacitanceuF, v0])

  const phase = useMemo(
    () => (phaseDeg * Math.PI) / 180,
    [phaseDeg],
  )

  const t = useMemo(() => timeFrac * T, [timeFrac, T])

  const { q, i, v, we, wm } = useMemo(() => {
    const qt = q0 * Math.cos(omega * t + phase)
    const it = -omega * q0 * Math.sin(omega * t + phase)
    const vt = qt / C
    const weT = (qt * qt) / (2 * C)
    const wmT = (L * it * it) / 2
    return { q: qt, i: it, v: vt, we: weT, wm: wmT }
  }, [q0, omega, t, phase, C, L])

  const chart = useMemo(() => {
    const points = 160
    const qWave = makeWave(points, (x) => Math.cos(2 * Math.PI * x))
    const iWave = makeWave(points, (x) => -Math.sin(2 * Math.PI * x))
    return { q: normalize(qWave), i: normalize(iWave) }
  }, [])

  const eTotal = we + wm
  const eElecPct = eTotal > 0 ? Math.round((we / eTotal) * 100) : 0
  const eMagPct = 100 - eElecPct

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          LC kontur: erkin elektromagnit tebranishlar
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Thomson formulasi asosida ω, f, T ni hisoblang va energiya almashinuvini
          kuzating.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Parametrlar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Induktivlik L (mH)
              </label>
              <input
                type="number"
                value={inductancemH}
                onChange={(e) => setInductancemH(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.001}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Sig&apos;im C (µF)
              </label>
              <input
                type="number"
                value={capacitanceuF}
                onChange={(e) => setCapacitanceuF(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.001}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Boshlang&apos;ich kuchlanish V₀ (V)
              </label>
              <input
                type="number"
                value={v0}
                onChange={(e) => setV0(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Faza φ (°)
              </label>
              <input
                type="number"
                value={phaseDeg}
                onChange={(e) => setPhaseDeg(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                step={1}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600">
              Vaqt (T ga nisbatan): {(timeFrac * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={timeFrac}
              onChange={(e) => setTimeFrac(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Formulalar</p>
            <p className="mt-1 font-mono">ω = 1/√(LC)</p>
            <p className="mt-1 font-mono">f = ω/(2π), T = 1/f = 2π√(LC)</p>
            <p className="mt-1 font-mono">
              q(t)=Q₀ cos(ωt+φ), i(t)= -ωQ₀ sin(ωt+φ)
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natijalar</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">ω (rad/s)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {omega.toFixed(2)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">f (Hz)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {f.toFixed(2)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">T (s)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {T.toFixed(4)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Q₀ (C)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {q0.toExponential(3)}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">q(t) (C)</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {q.toExponential(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">i(t) (A)</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {i.toExponential(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">v(t) (V)</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {v.toFixed(3)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">
                Grafik (normallashgan)
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-xl bg-emerald-50 px-3 py-1 text-emerald-700">
                  q(t)
                </span>
                <span className="rounded-xl bg-violet-50 px-3 py-1 text-violet-700">
                  i(t)
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Spark
                series={[
                  { label: "q", color: "#059669", values: chart.q },
                  { label: "i", color: "#7c3aed", values: chart.i },
                ]}
              />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Energiya (elektr)
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {we.toExponential(3)} J • {eElecPct}%
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Energiya (magnit)
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {wm.toExponential(3)} J • {eMagPct}%
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Energiya yo&apos;qotishsiz ideal LC kontur uchun doimiy:{" "}
              <span className="font-mono">
                W = q²/(2C) + L i²/2
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

