"use client"

import clsx from "clsx"
import { motion, useReducedMotion } from "motion/react"

type Props = {
  className?: string
  intensity?: "soft" | "strong"
}

const TechBackdrop = ({ className, intensity = "strong" }: Props) => {
  const reduce = useReducedMotion()
  const orbOpacity = intensity === "strong" ? 0.28 : 0.18
  const gridOpacity = intensity === "strong" ? 1 : 0.75

  return (
    <div className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Base gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(56,189,248,0.20),transparent_58%),radial-gradient(1000px_circle_at_85%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(900px_circle_at_50%_95%,rgba(34,197,94,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#070A12] to-slate-950" />

      {/* Grid + vignette */}
      <div className={clsx("absolute inset-0 tech-grid", gridOpacity < 1 ? "opacity-70" : "opacity-100")} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.85)_85%)]" />

      {/* Floating orbs (motion) */}
      <motion.div
        className="absolute -top-48 -left-48 h-[28rem] w-[28rem] rounded-full bg-cyan-500 blur-3xl"
        style={{ opacity: orbOpacity }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 60, 0],
                y: [0, 40, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-56 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500 blur-3xl"
        style={{ opacity: orbOpacity }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -70, 0],
                y: [0, 55, 0],
                scale: [1, 1.18, 1],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-56 left-1/3 h-[30rem] w-[30rem] rounded-full bg-emerald-500 blur-3xl"
        style={{ opacity: intensity === "strong" ? 0.16 : 0.1 }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 45, 0],
                y: [0, -55, 0],
                scale: [1, 1.09, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanline + noise */}
      {intensity === "strong" ? <div className="scanline" /> : null}
      <div className="noise" />
    </div>
  )
}

export default TechBackdrop

