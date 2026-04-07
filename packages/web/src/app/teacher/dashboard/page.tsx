"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function TeacherDashboard() {
  const stats = [
    {
      title: "Faol sessiyalar",
      subtitle: "Bugun",
      value: "0",
      hint: "Hozirda",
      iconBg: "bg-blue-100 text-blue-900",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Guruhlar",
      subtitle: "Ro'yxatda",
      value: "0",
      hint: "Jami",
      iconBg: "bg-emerald-100 text-emerald-900",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Testlar",
      subtitle: "Modullar",
      value: "2",
      hint: "Mavjud",
      iconBg: "bg-violet-100 text-violet-900",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "IT postlar",
      subtitle: "Maqolalar",
      value: "14",
      hint: "Bo'lim",
      iconBg: "bg-amber-100 text-amber-900",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ]

  const actions = [
    {
      title: "O'yin boshlash",
      description: "Yangi test sessiyasini ochish",
      href: "/game/manager",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "IT postlar",
      description: "Maqolalar va qo'llanmalar",
      href: "/teacher/labs",
      color: "bg-emerald-600 hover:bg-emerald-700",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "Testlar",
      description: "Test modullarini boshqarish",
      href: "/teacher/quizzes",
      color: "bg-violet-600 hover:bg-violet-700",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Statistika",
      description: "Natijalar va tahlil",
      href: "/teacher/analytics",
      color: "bg-amber-600 hover:bg-amber-700",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  const modules = [
    { id: "frontend", name: "Frontend asoslari", questions: 13, icon: "🧩", tone: "from-blue-50 to-white" },
    { id: "backend", name: "Backend basics", questions: 6, icon: "🛠️", tone: "from-violet-50 to-white" },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 min-w-0 lg:ml-72">
        <Header />

        <main className="p-4 sm:p-6 lg:p-10">
          <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                O'qituvchi paneli
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Guruhlar, testlar va IT postlar bo'yicha umumiy ko'rinish.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Link
                href="/game/manager"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                O'yin boshlash
              </Link>
              <Link
                href="/teacher/groups"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100"
              >
                Guruhlar
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-lg p-2.5 ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {stat.subtitle} • {stat.hint}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Tezkor amallar
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Eng ko'p ishlatiladigan bo'limlar.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {actions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm ${action.color}`}
                        >
                          {action.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            {action.title}
                          </p>
                          <p className="mt-1 hidden text-sm text-slate-600 sm:block">
                            {action.description}
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-900">
                            Ochish →
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                So'nggi faollik
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Oxirgi o'yinlar va harakatlar (demo).
              </p>

              <div className="mt-4 space-y-3">
                {[
                  { title: "O'yin sessiyasi yakunlandi", meta: "2 soat oldin" },
                  { title: "Davomat belgilandi", meta: "Kecha" },
                  { title: "Test yangilandi", meta: "2 kun oldin" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Test modullari
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Mavjud test to'plamlari.
                </p>
              </div>
              <Link
                href="/teacher/quizzes"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100"
              >
                Barchasi
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((quiz) => (
                <Link
                  key={quiz.id}
                  href="/teacher/quizzes"
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {quiz.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {quiz.questions} savol
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl shadow-sm">
                      {quiz.icon}
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                    Ochish{" "}
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/teacher/quizzes"
                className="inline-flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                + Yangi test qo'shish
              </Link>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
