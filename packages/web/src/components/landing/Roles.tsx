"use client"

import { motion } from "motion/react"
import Link from "next/link"

const Roles = () => {
  return (
    <section id="roles" className="relative py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              Student + Teacher rollari
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Har bir rol uchun aniq oqim: o&apos;rganish va nazorat
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              Studentlar ro&apos;yxatdan o&apos;tadi. Teacherlar oldindan
              belgilangan. Har bir postga mini quiz qo&apos;shilgan.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/auth"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Kirish
            </Link>
            <a
              href="#features"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-fuchsia-400"
            >
              Imkoniyatlar
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glow-ring relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-7 backdrop-blur"
          >
            <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_60%)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-white/55">
                    STUDENT
                  </div>
                  <div className="mt-1 text-2xl font-black text-white/90">
                    O&apos;rganish oqimi
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/75">
                  read → quiz → progress
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    t: "IT postlar",
                    d: "Chuqur maqolalar: kod, checklist, amaliy fikrlar.",
                  },
                  {
                    t: "Mini quiz",
                    d: "Har post oxirida tez tekshiruv va feedback.",
                  },
                  {
                    t: "Roadmap",
                    d: "Ketma-ket mavzular va milestone bilan yo'nalish.",
                  },
                  {
                    t: "Progress",
                    d: "O'qilgan postlar va natijalar bo'yicha ko'rsatkichlar.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-sm font-bold text-white/90">{x.t}</div>
                    <div className="mt-1 text-sm text-white/70">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glow-ring relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-7 backdrop-blur"
          >
            <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_80%_20%,rgba(168,85,247,0.18),transparent_60%)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-white/55">
                    TEACHER
                  </div>
                  <div className="mt-1 text-2xl font-black text-white/90">
                    Materiallar markazi
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/75">
                  curate → assign → review
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    t: "GitHub loyihalar",
                    d: "Sifatli repolar, link va qisqa izoh (nima o'rganiladi).",
                  },
                  {
                    t: "Amaliy topshiriqlar",
                    d: "PR/Issue amaliyoti, code review va refactor mashqlari.",
                  },
                  {
                    t: "Monitoring",
                    d: "Student progressini ko'rish va tavsiya berish oqimi.",
                  },
                  {
                    t: "Standartlar",
                    d: "Readme, commit, branch, lint, test madaniyati.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-sm font-bold text-white/90">{x.t}</div>
                    <div className="mt-1 text-sm text-white/70">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Roles

