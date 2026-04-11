"use client"

import { motion } from "motion/react"

const Research = () => {
  return (
    <section id="research" className="relative py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              Magistratura dissertatsiyasi
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Tadqiqotga mos dizayn va kontent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              Platforma faqat UI emas: IT kontent, mini quiz va progress orqali
              bilimni o&apos;lchash va yaxshilash konsepti ham kiritilgan.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Maqsad",
                  text: "Gamifikatsiya va mikro-o'qitish (IT postlar) orqali o'qish motivatsiyasi va natijani oshirish.",
                },
                {
                  title: "Metod",
                  text: "Har bir post: mazmun → mini quiz → feedback → progress. Roadmap orqali ketma-ket o'rganish.",
                },
                {
                  title: "O'lchov (KPI)",
                  text: "Quiz ballari, o'qilgan postlar, vaqt, qayta urinishlar, va mavzular bo'yicha muvaffaqiyat foizi.",
                },
                {
                  title: "Materiallar",
                  text: "Teacher bo'limida: sifatli GitHub repolar + izoh + o'rganish rejasi (kiritish va baholash).",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="glow-ring rounded-3xl border border-white/10 bg-slate-950/45 p-6 backdrop-blur"
                >
                  <div className="text-xs font-semibold text-white/55">
                    {c.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/75">
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 glow-ring rounded-3xl border border-white/10 bg-slate-950/45 p-6 backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-bold text-white/90">
                    Arxitektura g&apos;oyasi (soddalashtirilgan)
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    Next.js UI + local auth (student) + teacher (predefined) +
                    IT postlar + quiz modullari.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-white/75">
                  ui → content → quiz → progress
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Research

