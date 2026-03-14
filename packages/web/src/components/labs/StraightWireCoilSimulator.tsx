"use client"

import { useMemo, useState } from "react"

const MU0 = 4 * Math.PI * 1e-7

const formatTesla = (b: number) => {
  const abs = Math.abs(b)
  if (abs >= 1) return `${b.toFixed(3)} T`
  if (abs >= 1e-3) return `${(b * 1e3).toFixed(3)} mT`
  if (abs >= 1e-6) return `${(b * 1e6).toFixed(2)} µT`
  return `${(b * 1e9).toFixed(2)} nT`
}

export default function StraightWireCoilSimulator() {
  const [mode, setMode] = useState<"wire" | "solenoid">("wire")

  const [currentA, setCurrentA] = useState(5)
  const [distanceCm, setDistanceCm] = useState(5)

  const [turns, setTurns] = useState(200)
  const [lengthCm, setLengthCm] = useState(20)

  const bWire = useMemo(() => {
    const r = Math.max(0.1, distanceCm) / 100
    return (MU0 * currentA) / (2 * Math.PI * r)
  }, [currentA, distanceCm])

  const bSolenoid = useMemo(() => {
    const L = Math.max(0.1, lengthCm) / 100
    const n = turns / L
    return MU0 * n * currentA
  }, [turns, lengthCm, currentA])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Magnit maydon simulatori
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            To&apos;g&apos;ri o&apos;tkazgich va g&apos;altak/solenoid uchun B ni hisoblang.
          </p>
        </div>
        <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setMode("wire")}
            className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
              mode === "wire"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            O&apos;tkazgich
          </button>
          <button
            type="button"
            onClick={() => setMode("solenoid")}
            className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
              mode === "solenoid"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            Solenoid
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Parametrlar</p>

          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Tok kuchi I (A)
              </label>
              <input
                type="number"
                value={currentA}
                onChange={(e) => setCurrentA(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={0.1}
              />
            </div>

            {mode === "wire" ? (
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Masofa r (cm)
                </label>
                <input
                  type="number"
                  value={distanceCm}
                  onChange={(e) => setDistanceCm(Number(e.target.value))}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                  min={0.1}
                  step={0.1}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Formula: <span className="font-mono">B = μ₀ I / (2π r)</span>
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      O&apos;ramlar soni N
                    </label>
                    <input
                      type="number"
                      value={turns}
                      onChange={(e) => setTurns(Number(e.target.value))}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                      min={1}
                      step={1}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Uzunlik L (cm)
                    </label>
                    <input
                      type="number"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Number(e.target.value))}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Formula:{" "}
                  <span className="font-mono">B = μ₀ (N/L) I</span> (solenoid)
                </p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natija</p>
          <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-600">Magnit induksiya</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {formatTesla(mode === "wire" ? bWire : bSolenoid)}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              μ₀ = 4π·10⁻⁷ (T·m/A)
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Izoh</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Tok oshsa, B ham chiziqli oshadi.</li>
              <li>
                O&apos;tkazgichda masofa r oshsa, B kamayadi (1/r).
              </li>
              <li>
                Solenoiddagi B, o&apos;ramlar zichligiga (N/L) bog&apos;liq.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

