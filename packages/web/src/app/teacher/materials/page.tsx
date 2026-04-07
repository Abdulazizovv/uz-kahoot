"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"

const projects = [
  {
    name: "freeCodeCamp",
    description:
      "To'liq o'quv platforma: frontend, backend, data science va intervyu tayyorgarligi.",
    tags: ["education", "fullstack", "curriculum"],
    level: "Boshlang'ich",
    stars: "370k+",
    href: "https://github.com/freeCodeCamp/freeCodeCamp",
  },
  {
    name: "awesome",
    description:
      "Turli yo'nalishlar bo'yicha eng yaxshi resurslar ro'yxati (frontend, backend, devops).",
    tags: ["resources", "lists", "meta"],
    level: "Boshlang'ich",
    stars: "340k+",
    href: "https://github.com/sindresorhus/awesome",
  },
  {
    name: "public-apis",
    description:
      "Bepul va ochiq API lar katalogi. Demo loyihalar uchun juda qulay.",
    tags: ["api", "practice", "catalog"],
    level: "Boshlang'ich",
    stars: "320k+",
    href: "https://github.com/public-apis/public-apis",
  },
  {
    name: "build-your-own-x",
    description:
      "Tizimlarni o'zingiz yozib ko'ring: Git, DB, Web server va boshqalar.",
    tags: ["systems", "practice", "deep-dive"],
    level: "O'rta",
    stars: "260k+",
    href: "https://github.com/codecrafters-io/build-your-own-x",
  },
  {
    name: "app-ideas",
    description:
      "Boshlang'ichdan murakkabgacha bo'lgan real loyiha g'oyalari to'plami.",
    tags: ["project-ideas", "practice"],
    level: "Boshlang'ich",
    stars: "80k+",
    href: "https://github.com/florinpop17/app-ideas",
  },
  {
    name: "system-design-primer",
    description:
      "System design bo'yicha konspekt, diagramlar va intervyu savollari.",
    tags: ["system-design", "interview"],
    level: "Yuqori",
    stars: "270k+",
    href: "https://github.com/donnemartin/system-design-primer",
  },
  {
    name: "developer-roadmap",
    description:
      "Frontend, backend, devops yo'llari bo'yicha aniq roadmaplar.",
    tags: ["roadmap", "career"],
    level: "Boshlang'ich",
    stars: "300k+",
    href: "https://github.com/kamranahmedse/developer-roadmap",
  },
  {
    name: "awesome-selfhosted",
    description:
      "O'z serveringizda ishga tushirish mumkin bo'lgan ochiq kodli tizimlar.",
    tags: ["selfhosted", "devops"],
    level: "O'rta",
    stars: "210k+",
    href: "https://github.com/awesome-selfhosted/awesome-selfhosted",
  },
]

const levelTone = (level: string) => {
  switch (level) {
    case "Boshlang'ich":
      return "bg-emerald-100 text-emerald-800"
    case "O'rta":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-red-100 text-red-800"
  }
}

export default function TeacherMaterialsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0 lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              GitHub loyihalar kutubxonasi
            </h1>
            <p className="mt-1 text-gray-600">
              IT fanlari uchun real loyihalar, resurslar va amaliy mashqlar.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Jami loyihalar
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {projects.length}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Har bir loyiha darsga integratsiya qilishga tayyor.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Yo'nalishlar
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">6+</p>
              <p className="mt-2 text-sm text-slate-600">
                Frontend, Backend, DevOps, System Design va boshqalar.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Foydalanish
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">Bepul</p>
              <p className="mt-2 text-sm text-slate-600">
                Ochiq kodli va jamoa tomonidan qo'llab-quvvatlanadi.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${levelTone(project.level)}`}
                  >
                    {project.level}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>⭐ {project.stars}</span>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    GitHub sahifasi →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
