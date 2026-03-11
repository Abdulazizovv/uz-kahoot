"use client"

import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import { useAuthStore } from "@/stores/auth"
import Link from "next/link"

export default function StudentDashboard() {
  const { user } = useAuthStore()

  const stats = [
    {
      title: "Laboratoriyalar",
      subtitle: "Bajarilgan",
      value: "3",
      meta: "14 dan",
      iconBg: "bg-emerald-100 text-emerald-900",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      title: "O'yinlar",
      subtitle: "Ishtirok",
      value: "8",
      meta: "marta",
      iconBg: "bg-blue-100 text-blue-900",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
    {
      title: "O'rtacha ball",
      subtitle: "Natija",
      value: "87",
      meta: "100 dan",
      iconBg: "bg-amber-100 text-amber-900",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
    },
    {
      title: "Yutuqlar",
      subtitle: "Olingan",
      value: "12",
      meta: "ta",
      iconBg: "bg-violet-100 text-violet-900",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
        </svg>
      ),
    },
  ]

  const labs = [
    { id: 1, title: "Elektrostatika", progress: 100, status: "done" as const },
    { id: 2, title: "Kondensator", progress: 100, status: "done" as const },
    { id: 3, title: "Om qonuni", progress: 100, status: "done" as const },
    { id: 4, title: "Uitston ko'prigi", progress: 0, status: "new" as const },
    { id: 5, title: "Kirxgof qonunlari", progress: 0, status: "new" as const },
  ]

  const recentGames = [
    { id: 1, name: "Fizika testi #42", date: "2 soat oldin", score: 95, rank: 3 },
    { id: 2, name: "Elektromagnetizm", date: "1 kun oldin", score: 87, rank: 8 },
    { id: 3, name: "Mexanika asoslari", date: "2 kun oldin", score: 92, rank: 5 },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Talaba paneli
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Salom{user?.first_name ? `, ${user.first_name}` : ""}! Bugungi reja va natijalaringiz shu yerda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Link
                href="/game/join"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                O'yinga qo'shilish
              </Link>
              <Link
                href="/student/labs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100"
              >
                Laboratoriyalar
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
                    <div className="mt-1 flex items-end gap-2">
                      <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        {stat.value}
                      </p>
                      <p className="pb-1 text-sm font-medium text-slate-500">
                        {stat.meta}
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-lg p-2.5 ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Faol laboratoriyalar
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Davom ettirish yoki yangisini boshlash.
                    </p>
                  </div>
                  <Link
                    href="/student/labs"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100"
                  >
                    Hammasi
                  </Link>
                </div>

                <div className="mt-5 space-y-3">
                  {labs.map((lab) => {
                    const actionLabel = lab.status === "done" ? "Ko'rish" : "Boshlash"
                    const barColor =
                      lab.progress === 100
                        ? "bg-gradient-to-r from-emerald-500 to-green-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600"

                    return (
                      <div
                        key={lab.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {lab.title}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              Progress: {lab.progress}%
                            </p>
                          </div>
                          <Link
                            href={`/student/labs/${lab.id}`}
                            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
                          >
                            {actionLabel}
                          </Link>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${lab.progress}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Daraja (demo)
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Keyingi darajagacha: 250 XP
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-semibold text-white shadow-sm">
                    5
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: "83%" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-slate-600">
                  <span>1250 XP</span>
                  <span className="font-medium text-slate-900">1500 XP</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      So'nggi testlar
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Oxirgi qatnashgan sessiyalar.
                    </p>
                  </div>
                  <Link
                    href="/student/results"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100"
                  >
                    Natijalar
                  </Link>
                </div>

                <div className="mt-5 space-y-3">
                  {recentGames.map((game) => (
                    <div
                      key={game.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {game.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{game.date}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
                            {game.score}
                          </span>
                          <span className="text-sm text-slate-600">ball</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          #{game.rank}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  So'nggi yutuqlar (demo)
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Eng oxirgi yutuqlar ro'yxati.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    { title: "Laboratoriya izlovchi", desc: "3 ta laboratoriya yakunlandi", tone: "border-amber-200 bg-amber-50 text-amber-900" },
                    { title: "Barqaror o'quvchi", desc: "5 kunlik ketma-ket faollik", tone: "border-blue-200 bg-blue-50 text-blue-900" },
                    { title: "Yuqori natija", desc: "90+ ball to'plandi", tone: "border-emerald-200 bg-emerald-50 text-emerald-900" },
                  ].map((a) => (
                    <div key={a.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${a.tone}`}>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {a.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">{a.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
