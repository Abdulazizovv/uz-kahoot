import Link from "next/link"

const cards = [
  {
    title: "IT postlar kutubxonasi",
    description: "Barcha postlar, filterlar va featured bo'limi.",
    href: "/student/labs",
    icon: "📚",
  },
  {
    title: "Yo'l xarita",
    description: "Frontend, backend va DevOps yo'nalishlari bo'yicha roadmap.",
    href: "/student/it-posts/roadmap",
    icon: "🧭",
  },
  {
    title: "Resurslar",
    description: "Eng yaxshi docs va amaliy GitHub repolar ro'yxati.",
    href: "/student/it-posts/resources",
    icon: "🔗",
  },
]

export default function StudentItPostsHub() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">IT markazi</h1>
      <p className="mt-2 text-sm text-slate-600">
        IT postlar, roadmap va resurslar markazi. Kerakli bo'limni tanlang.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-white"
          >
            <div className="text-3xl">{card.icon}</div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
