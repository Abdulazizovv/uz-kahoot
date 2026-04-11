import Link from "next/link"

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <span className="font-mono text-sm font-bold text-white">
                  EA
                </span>
              </div>
              <div>
                <div className="text-base font-bold text-white/90">EduArena</div>
                <div className="text-sm text-white/60">
                  IT ta&apos;lim platformasi
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              Real-time quizlar, IT postlar va mini quizlar orqali talabaning
              bilimini mustahkamlash, o&apos;lchash va rivojlantirish.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/70">
                Next.js
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/70">
                Tailwind
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/70">
                Motion
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-white/85">Bo&apos;limlar</div>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="#features" className="text-white/70 hover:text-white">
                Imkoniyatlar
              </a>
              <a href="#roles" className="text-white/70 hover:text-white">
                Rollar
              </a>
              <a href="#research" className="text-white/70 hover:text-white">
                Dissertatsiya
              </a>
              <Link href="/auth" className="text-white/70 hover:text-white">
                Kirish
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-white/85">IT Markaz</div>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link
                href="/student/it-posts"
                className="text-white/70 hover:text-white"
              >
                IT postlar hub
              </Link>
              <Link
                href="/student/it-posts/roadmap"
                className="text-white/70 hover:text-white"
              >
                Roadmap
              </Link>
              <Link
                href="/student/it-posts/resources"
                className="text-white/70 hover:text-white"
              >
                Resurslar
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row">
          <div>© 2026 EduArena. Barcha huquqlar himoyalangan.</div>
          <div className="flex gap-4">
            <span>Magistratura dissertatsiyasi uchun</span>
            <span className="text-white/35">|</span>
            <span>IT mavzu</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

