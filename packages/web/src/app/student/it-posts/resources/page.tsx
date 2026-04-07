const resources = [
  {
    title: "MDN Web Docs",
    description: "HTML, CSS va JavaScript bo'yicha asosiy manba.",
    href: "https://developer.mozilla.org/",
    tag: "docs",
  },
  {
    title: "Frontend Roadmap",
    description: "Frontend bo'yicha bosqichma-bosqich roadmap.",
    href: "https://roadmap.sh/frontend",
    tag: "roadmap",
  },
  {
    title: "Backend Roadmap",
    description: "Backend yo'nalishi uchun tavsiya etilgan yo'l.",
    href: "https://roadmap.sh/backend",
    tag: "roadmap",
  },
  {
    title: "freeCodeCamp",
    description: "Amaliy mashqlar va sertifikatli kurslar.",
    href: "https://www.freecodecamp.org/",
    tag: "practice",
  },
  {
    title: "The Odin Project",
    description: "Fullstack o'quv yo'nalishi va real loyihalar.",
    href: "https://www.theodinproject.com/",
    tag: "practice",
  },
  {
    title: "Public APIs",
    description: "Ochiq API lar bilan demo loyihalar qilish uchun katalog.",
    href: "https://github.com/public-apis/public-apis",
    tag: "github",
  },
]

export default function ResourcesPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">IT resurslar</h1>
      <p className="mt-2 text-sm text-slate-600">
        Tez o'rganish va amaliy mashqlar uchun tavsiya etilgan resurslar.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-indigo-200 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {resource.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {resource.description}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                #{resource.tag}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-indigo-600">
              Resursga o'tish →
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
