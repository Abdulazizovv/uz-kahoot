"use client"

import { useMemo } from "react"

export type BarDatum = {
  label: string
  value: number
  color?: string
  hint?: string
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export const MiniBar = ({
  value,
  max = 100,
  color = "#0f172a",
}: {
  value: number
  max?: number
  color?: string
}) => {
  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

export const HorizontalBarList = ({
  data,
  max,
}: {
  data: BarDatum[]
  max?: number
}) => {
  const computedMax = useMemo(() => {
    if (typeof max === "number") return max
    return Math.max(1, ...data.map((d) => d.value))
  }, [data, max])

  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
              {d.label}
            </p>
            <p className="text-sm font-bold text-slate-900">{d.hint ?? d.value}</p>
          </div>
          <div className="mt-2">
            <MiniBar value={d.value} max={computedMax} color={d.color ?? "#0f172a"} />
          </div>
        </div>
      ))}
    </div>
  )
}

export type LinePoint = { x: number; y: number }

export const LineChart = ({
  points,
  stroke = "#0ea5e9",
  height = 160,
}: {
  points: LinePoint[]
  stroke?: string
  height?: number
}) => {
  const w = 520
  const h = height
  const pad = 12

  const normalized = useMemo(() => {
    if (points.length === 0) return null
    const xs = points.map((p) => p.x)
    const ys = points.map((p) => p.y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    const dx = Math.max(1e-9, maxX - minX)
    const dy = Math.max(1e-9, maxY - minY)
    const toX = (x: number) => pad + ((x - minX) * (w - 2 * pad)) / dx
    const toY = (y: number) => pad + ((1 - (y - minY) / dy) * (h - 2 * pad))
    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.x)} ${toY(p.y)}`)
      .join(" ")
    return { path }
  }, [points, h])

  if (!normalized) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Ma&apos;lumot yo&apos;q.
      </div>
    )
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <rect x="0" y="0" width={w} height={h} rx="16" fill="#f8fafc" />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#e2e8f0" strokeWidth="2" />
      <path d={normalized.path} fill="none" stroke={stroke} strokeWidth="3" />
    </svg>
  )
}

export const Donut = ({
  parts,
  size = 180,
}: {
  parts: Array<{ label: string; value: number; color: string }>
  size?: number
}) => {
  const total = parts.reduce((acc, p) => acc + p.value, 0)
  const r = size / 2
  const stroke = Math.max(10, Math.round(size * 0.11))
  const cr = r - stroke / 2
  const circ = 2 * Math.PI * cr

  const lens = parts.map((p) => (total > 0 ? (p.value / total) * circ : 0))
  const offsets = lens.reduce<number[]>(
    (acc, len) => [...acc, (acc.length ? acc[acc.length - 1] : 0) + len],
    [],
  )

  const arcs = parts.map((p, idx) => {
    const len = lens[idx] ?? 0
    const start = idx === 0 ? 0 : offsets[idx - 1] ?? 0
    return (
      <circle
        key={p.label}
        cx={r}
        cy={r}
        r={cr}
        fill="transparent"
        stroke={p.color}
        strokeWidth={stroke}
        strokeDasharray={`${len} ${circ - len}`}
        strokeDashoffset={-start}
        strokeLinecap="round"
      />
    )
  })

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={cr} fill="transparent" stroke="#e2e8f0" strokeWidth={stroke} />
        {arcs}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
        {parts.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            {p.label} • {total ? Math.round((p.value / total) * 100) : 0}%
          </span>
        ))}
      </div>
    </div>
  )
}
