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

export default function FaradayInductionSimulator() {
  const [turns, setTurns] = useState(200)
  const [areaCm2, setAreaCm2] = useState(20)
  const [b0mT, setB0mT] = useState(50)
  const [freqHz, setFreqHz] = useState(2)

  const { eMax, b0, omega, area } = useMemo(() => {
    const A = Math.max(0, areaCm2) * 1e-4
    const B0 = Math.max(0, b0mT) * 1e-3
    const w = 2 * Math.PI * Math.max(0, freqHz)
    const max = turns * A * B0 * w
    return { eMax: max, b0: B0, omega: w, area: A }
  }, [turns, areaCm2, b0mT, freqHz])

  const chart = useMemo(() => {
    const points = 120
    const b = makeWave(points, (t) => Math.sin(2 * Math.PI * t))
    const e = makeWave(points, (t) => -Math.cos(2 * Math.PI * t))
    return {
      b: normalize(b),
      e: normalize(e),
    }
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Elektromagnit induksiya (Faradey qonuni)
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Sinusoidal B(t) uchun induksiya EYuK ni hisoblang va grafikni ko&apos;ring.
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
              <label className="text-xs font-semibold text-slate-600">
                A (cm²)
              </label>
              <input
                type="number"
                value={areaCm2}
                onChange={(e) => setAreaCm2(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                B₀ (mT)
              </label>
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
                f (Hz)
              </label>
              <input
                type="number"
                value={freqHz}
                onChange={(e) => setFreqHz(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={0.1}
              />
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Formulalar</p>
            <p className="mt-1 font-mono">Φ = B·A</p>
            <p className="mt-1 font-mono">ε = -N dΦ/dt = -N A dB/dt</p>
            <p className="mt-1 font-mono">
              B(t)=B₀ sin(ωt) ⇒ ε(t)= -N A B₀ ω cos(ωt)
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natijalar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">A (m²)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {area.toExponential(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">ω (rad/s)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {omega.toFixed(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">B₀ (T)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {b0.toExponential(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">εmax (V)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {eMax.toFixed(3)}
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
                  B(t)
                </span>
                <span className="rounded-xl bg-violet-50 px-3 py-1 text-violet-700">
                  ε(t)
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Spark
                series={[
                  { label: "B", color: "#059669", values: chart.b },
                  { label: "E", color: "#7c3aed", values: chart.e },
                ]}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              EYuK maksimal bo&apos;lishi uchun f va B₀ ni oshiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

