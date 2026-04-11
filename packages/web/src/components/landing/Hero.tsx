"use client"

import TechBackdrop from "@/components/tech/TechBackdrop"
import { useAuthStore } from "@/stores/auth"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"

const codeLines = [
  { dim: true, text: "edu-arena@it-lab:~$" },
  { dim: false, text: "pnpm dev  # Next.js + Tailwind + Motion" },
  { dim: true, text: "> Ready: http://localhost:3000" },
  { dim: true, text: "" },
  { dim: true, text: "▶ IT Post: REST API design checklist" },
  { dim: true, text: "▶ Mini quiz: 5 savol / 2 daqiqa" },
  { dim: true, text: "▶ Natija: progress + tavsiyalar" },
]

const Hero = () => {
  const { isAuthenticated, user, isHydrated } = useAuthStore()
  const reduce = useReducedMotion()

  const dashboardHref =
    user?.user_type === "teacher" ? "/teacher/dashboard" : "/student/dashboard"

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <TechBackdrop intensity="strong" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
              Magistratura dissertatsiyasi: gamifikatsiya + IT kontent + mini quiz
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl"
            >
              <span className="block text-white/90">Universitet uchun</span>
              <span
                className="glitch block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-200 bg-clip-text text-transparent"
                data-text="IT ta'lim laboratoriyasi"
              >
                IT ta&apos;lim laboratoriyasi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              EduArena — real-time quizlar, chuqur IT postlar va har bir postga
              mini-quiz bilan bilimni mustahkamlovchi platforma. Progress,
              resurslar va roadmap orqali talaba yo&apos;lini tizimli boshqaring.
            </motion.p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Real-time quiz",
                "IT post + mini quiz",
                "Roadmap + resurslar",
                "Teacher materials (GitHub)",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={isHydrated && isAuthenticated ? dashboardHref : "/auth"}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-fuchsia-400"
              >
                {isHydrated && isAuthenticated ? "Dashboard" : "Boshlash"}
              </Link>
              <a
                href="#research"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Dissertatsiya bo&apos;limi
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal card */}
            <div className="glow-ring relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <div className="text-xs font-semibold text-white/55">
                  IT lab preview
                </div>
              </div>

              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                }}
                className="mt-5 space-y-2 font-mono text-sm"
              >
                {codeLines.map((l, idx) => (
                  <motion.li
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className={l.dim ? "text-white/60" : "text-white/85"}
                  >
                    {l.text}
                    {idx === 1 ? (
                      <motion.span
                        aria-hidden="true"
                        className="ml-1 inline-block h-4 w-2 translate-y-[3px] bg-white/70"
                        animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ) : null}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Kontent", v: "IT postlar" },
                  { k: "Baholash", v: "Mini quiz" },
                  { k: "Natija", v: "Progress" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-xs font-semibold text-white/55">{x.k}</div>
                    <div className="mt-1 text-sm font-bold text-white/90">{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(56,189,248,0.16),transparent_55%)]" />
            </div>

            {/* Floating chip */}
            <motion.div
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs font-semibold text-white/75 backdrop-blur sm:block"
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [0, -1.6, 0],
                    }
              }
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white/55">Signal:</span> 0.98 ·{" "}
              <span className="text-white/55">Latency:</span> 32ms
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 hidden rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs font-semibold text-white/75 backdrop-blur sm:block"
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, 10, 0],
                      rotate: [0, 1.4, 0],
                    }
              }
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white/55">Mode:</span> IT-POSTS · QUIZ
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

