"use client"

import { useMemo, useState } from "react"

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export default function TransformerSimulator() {
  const [v1, setV1] = useState(220)
  const [n1, setN1] = useState(500)
  const [n2, setN2] = useState(100)
  const [loadOhm, setLoadOhm] = useState(22)
  const [effPercent, setEffPercent] = useState(92)

  const out = useMemo(() => {
    const N1 = Math.max(1, n1)
    const N2 = Math.max(1, n2)
    const V1 = Math.max(0, v1)
    const ratio = N2 / N1
    const V2 = V1 * ratio

    const R = Math.max(0.1, loadOhm)
    const I2 = V2 / R
    const Pout = V2 * I2

    const eff = clamp(effPercent, 1, 100) / 100
    const Pin = Pout / eff
    const I1 = V1 > 0 ? Pin / V1 : 0
    const Ploss = Math.max(0, Pin - Pout)

    return {
      ratio,
      V2,
      I2,
      Pout,
      eff,
      Pin,
      I1,
      Ploss,
    }
  }, [n1, n2, v1, loadOhm, effPercent])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Transformator (RMS): kuchlanish, tok va F.I.K.
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          O&apos;ramlar nisbati orqali V₂, I₂ va quvvatlarni baholang. Natijalar
          o&apos;zgaruvchan tok uchun RMS qiymatlarida ko&apos;rsatiladi.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-600">Parametrlar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                V₁ (V)
              </label>
              <input
                type="number"
                value={v1}
                onChange={(e) => setV1(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Yuklama R (Ω)
              </label>
              <input
                type="number"
                value={loadOhm}
                onChange={(e) => setLoadOhm(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.1}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Birlamchi o&apos;ram N₁
              </label>
              <input
                type="number"
                value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={1}
                step={1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Ikkilamchi o&apos;ram N₂
              </label>
              <input
                type="number"
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={1}
                step={1}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs font-semibold text-slate-600">
              F.I.K. η (%): {effPercent}%
            </label>
            <input
              type="range"
              min={50}
              max={99}
              step={1}
              value={effPercent}
              onChange={(e) => setEffPercent(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Formulalar</p>
            <p className="mt-1 font-mono">V₂/V₁ = N₂/N₁</p>
            <p className="mt-1 font-mono">I₂/I₁ ≈ N₁/N₂ (ideal)</p>
            <p className="mt-1 font-mono">Pout = V₂·I₂, η = Pout/Pin</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natijalar</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">N₂/N₁</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {out.ratio.toFixed(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">V₂ (V)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {out.V2.toFixed(2)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">I₂ (A)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {out.I2.toFixed(3)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Pout (W)</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">
                {out.Pout.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">η</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {(out.eff * 100).toFixed(0)}%
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">Pin (W)</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {out.Pin.toFixed(2)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">I₁ (A)</p>
              <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                {out.I1.toFixed(3)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">
              Yo&apos;qotishlar
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Taxminiy yo&apos;qotilgan quvvat:{" "}
              <span className="font-mono font-semibold text-slate-900">
                {out.Ploss.toFixed(2)} W
              </span>
              . Amalda u mis simdagi Joule yo&apos;qotishlari, yadrodagi
              gisterezis va girdob toklariga bog&apos;liq bo&apos;ladi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

