"use client"

import { useMemo, useState } from "react"

const MU0 = 4 * Math.PI * 1e-7

const formatMicroTesla = (b: number) => `${(b * 1e6).toFixed(2)} µT`

export default function EarthMagneticFieldSimulator() {
  const [turns, setTurns] = useState(20)
  const [radiusCm, setRadiusCm] = useState(15)
  const [currentA, setCurrentA] = useState(0.5)
  const [thetaDeg, setThetaDeg] = useState(35)

  const bCoil = useMemo(() => {
    const R = Math.max(0.1, radiusCm) / 100
    return (MU0 * turns * currentA) / (2 * R)
  }, [turns, currentA, radiusCm])

  const bEarth = useMemo(() => {
    const theta = (Math.max(0.1, thetaDeg) * Math.PI) / 180
    const tan = Math.tan(theta)
    return tan === 0 ? 0 : bCoil / tan
  }, [bCoil, thetaDeg])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Yer magnit maydonini o&apos;lchash (Tangens-galvanometr)
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          O&apos;lchangan og&apos;ish burchagi orqali Yerning gorizontal magnit
          induksiyasini baholang.
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
                R (cm)
              </label>
              <input
                type="number"
                value={radiusCm}
                onChange={(e) => setRadiusCm(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0.1}
                step={0.1}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                I (A)
              </label>
              <input
                type="number"
                value={currentA}
                onChange={(e) => setCurrentA(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                θ (°)
              </label>
              <input
                type="number"
                value={thetaDeg}
                onChange={(e) => setThetaDeg(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                min={1}
                max={89}
                step={1}
              />
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Formulalar</p>
            <p className="mt-1 font-mono">
              B<sub>coil</sub> = μ₀ N I / (2R)
            </p>
            <p className="mt-1 font-mono">
              tanθ = B<sub>coil</sub> / B<sub>earth</sub>
            </p>
            <p className="mt-1 font-mono">
              B<sub>earth</sub> = B<sub>coil</sub> / tanθ
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-600">Natija</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Bcoil</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {formatMicroTesla(bCoil)}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Bearth (gorizontal)</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {formatMicroTesla(bEarth)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Tip</p>
            <p className="mt-2 text-sm text-slate-600">
              θ juda kichik bo&apos;lsa tanθ kichrayadi va hisob natijasi
              beqaror bo&apos;lishi mumkin. Amaliyotda 25–65° oralig&apos;i qulay.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

