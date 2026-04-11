"use client"

import { motion } from "motion/react"

type Feature = {
  title: string
  desc: string
  accent: string
  bullets: string[]
  icon: JSX.Element
}

const Icon = ({ children }: { children: JSX.Element }) => (
  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
    {children}
  </div>
)

const features: Feature[] = [
  {
    title: "Real-time Quiz (Kahoot uslubi)",
    desc: "Bir vaqtda test, leaderboard, ball tizimi va qiziqarli raqobat.",
    accent: "from-amber-300/30 via-orange-300/10 to-transparent",
    bullets: ["Live savollar", "Leaderboard", "Ball + timer", "Natijalar"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-amber-200">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5v5.1l3.4 2.1-.8 1.3L11 13V7Z"
        />
      </svg>
    ),
  },
  {
    title: "IT Postlar Kutubxonasi",
    desc: "Backend, frontend, DevOps va xavfsizlik bo'yicha chuqur, amaliy postlar.",
    accent: "from-cyan-300/30 via-sky-300/10 to-transparent",
    bullets: ["Kod misollar", "Checklist", "Best practice", "Amaliy task"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-200">
        <path
          fill="currentColor"
          d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Zm3-1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"
        />
      </svg>
    ),
  },
  {
    title: "Har Bir Postga Mini Quiz",
    desc: "Post mazmuni darhol tekshiriladi: qisqa savollar, tez feedback va progress.",
    accent: "from-fuchsia-300/30 via-purple-300/10 to-transparent",
    bullets: ["5-10 savol", "2-5 daqiqa", "Feedback", "Progress bar"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-fuchsia-200">
        <path
          fill="currentColor"
          d="M7 2h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm2 4h6v2H9Zm0 4h6v2H9Zm0 4h4v2H9Z"
        />
      </svg>
    ),
  },
  {
    title: "Yo'l Xarita (Roadmap)",
    desc: "Talaba uchun tizimli yo'nalish: mavzular ketma-ketligi va milestone'lar.",
    accent: "from-emerald-300/30 via-teal-300/10 to-transparent",
    bullets: ["Frontend", "Backend", "DevOps", "Security basics"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-200">
        <path
          fill="currentColor"
          d="M20 6H4V4h16Zm0 14H4v-2h16Zm-2-7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"
        />
      </svg>
    ),
  },
  {
    title: "Teacher Materials (GitHub)",
    desc: "Yaxshi ochiq manbali loyihalar: link, qisqa izoh va qanday o'rganish yo'li.",
    accent: "from-slate-200/20 via-slate-200/5 to-transparent",
    bullets: ["Repo link", "Arxitektura izohi", "Issue/PR amaliyoti", "O'rganish rejasi"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-200">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.17-3.36-1.17a2.64 2.64 0 0 0-1.1-1.46c-.9-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1.03a2.13 2.13 0 0 0 2.92.83a2.14 2.14 0 0 1 .63-1.34c-2.21-.25-4.54-1.11-4.54-4.93a3.86 3.86 0 0 1 1.03-2.68a3.58 3.58 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02a3.58 3.58 0 0 1 .1 2.64a3.86 3.86 0 0 1 1.03 2.68c0 3.83-2.33 4.68-4.55 4.93a2.4 2.4 0 0 1 .69 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      </svg>
    ),
  },
  {
    title: "Analytics va Progress",
    desc: "O'qish natijasini o'lchash: o'qilgan postlar, quiz ballari, tavsiyalar.",
    accent: "from-indigo-300/30 via-blue-300/10 to-transparent",
    bullets: ["Dashboard", "Progress tracking", "Zaif mavzular", "Rivojlanish"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-200">
        <path
          fill="currentColor"
          d="M4 19h16v2H4Zm2-2V3h2v14Zm5 0V8h2v9Zm5 0V5h2v12Z"
        />
      </svg>
    ),
  },
]

const Features = () => {
  return (
    <section id="features" className="relative py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
            Platforma imkoniyatlari
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
            IT mavzuga mos: kontent + amaliyot + o&apos;lchov
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Bu landing demo emas — magistratura dissertatsiyasi uchun konsept,
            UI/UX va ta&apos;lim jarayonini ko&apos;rsatadigan ishlab turadigan
            prototip.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.04 }}
              viewport={{ once: true }}
              className="glow-ring group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-6 backdrop-blur"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 transition group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <Icon>{f.icon}</Icon>
                  <div className="text-xs font-semibold text-white/45">v1</div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white/90">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {f.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.bullets.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/70"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

