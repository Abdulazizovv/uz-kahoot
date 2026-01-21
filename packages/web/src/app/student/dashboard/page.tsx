"use client"

import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import { useAuthStore } from "@/stores/auth"

export default function StudentDashboard() {
  const { user } = useAuthStore()

  const stats = [
    {
      id: 1,
      title: "Topshirilgan testlar",
      value: "8",
      total: "test",
      subtitle: "Faol ishtirok",
      change: "+3 bu hafta",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-900",
    },
    {
      id: 2,
      title: "O'yinlarda ishtirok",
      value: "8",
      total: "qatnashdi",
      subtitle: "Faol qatnashchi",
      change: "+2 bu hafta",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
    },
    {
      id: 3,
      title: "O'rtacha ball",
      value: "87",
      total: "100 dan",
      subtitle: "Yaxshi natija!",
      change: "+5% oshdi",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-900",
    },
    {
      id: 4,
      title: "Yutuqlar",
      value: "12",
      total: "ta olindi",
      subtitle: "Davom eting!",
      change: "+3 yangi",
      icon: (
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900",
    },
  ]

  const recentGames = [
    {
      id: 1,
      name: "Python Basics #15",
      date: "2 soat oldin",
      score: 95,
      rank: 3,
    },
    {
      id: 2,
      name: "JavaScript Fundamentals",
      date: "1 kun oldin",
      score: 87,
      rank: 8,
    },
    {
      id: 3,
      name: "Data Structures Quiz",
      date: "2 kun oldin",
      score: 92,
      rank: 5,
    },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <StudentSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className={`rounded-xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all hover:border-blue-500 hover:shadow-lg`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-3 text-slate-700 shadow-sm">
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      {stat.total}
                    </div>
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-bold tracking-wider text-slate-900 uppercase">
                  {stat.title}
                </h3>
                <p className="mb-2 text-xs text-gray-600">{stat.subtitle}</p>
                <div className="flex items-center gap-1 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Recent Games - Made Larger */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
                <div className="mb-6 border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    So'nggi Test Seanslar
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Oxirgi test natijalaringiz
                  </p>
                </div>
                <div className="space-y-4">
                  {recentGames.map((game) => (
                    <div
                      key={game.id}
                      className="rounded-xl border-2 border-slate-200 bg-gradient-to-r from-white to-blue-50 p-4 transition-all hover:border-blue-500 hover:shadow-md"
                    >
                      <h4 className="font-bold text-gray-900">{game.name}</h4>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">
                        {game.date}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg border-2 border-emerald-600 bg-emerald-600 px-4 py-2 text-lg font-bold text-white">
                            {game.score}
                          </span>
                          <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
                            Ball
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          #{game.rank} O'rin
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      Darajangiz: 5
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      Keyingi darajagacha 250 XP
                    </p>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border-4 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 text-3xl font-bold text-blue-900 shadow-lg">
                    5
                  </div>
                </div>

                <div className="relative h-4 overflow-hidden rounded-lg bg-slate-200 shadow-inner">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md transition-all duration-500"
                    style={{ width: "83%" }}
                  ></div>
                </div>
                <div className="mt-3 flex justify-between text-sm font-bold">
                  <span className="text-gray-600">1250 XP</span>
                  <span className="text-slate-900">1500 XP</span>
                </div>
              </div>
              {/* Recent Games */}
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <div className="mb-4 border-b-2 border-slate-100 pb-3">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    Recent Test Sessions
                  </h3>
                  <p className="text-xs text-gray-600">
                    So'nggi test o'yinlari
                  </p>
                </div>
                <div className="space-y-3">
                  {recentGames.map((game) => (
                    <div
                      key={game.id}
                      className="rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md"
                    >
                      <h4 className="font-bold text-gray-900">{game.name}</h4>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">
                        {game.date}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg border-2 border-emerald-600 bg-emerald-600 px-3 py-1 text-sm font-bold text-white">
                            {game.score}
                          </span>
                          <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                            Score
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <svg
                            className="h-4 w-4 text-amber-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>#{game.rank}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <div className="mb-4 border-b-2 border-slate-100 pb-3">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    So'nggi Yutuqlar
                  </h3>
                  <p className="text-xs text-gray-600">
                    Sizning muvaffaqiyatlaringiz
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-amber-500">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
                      <svg
                        className="h-7 w-7 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
                        Kod Mahorati
                      </h4>
                      <p className="text-xs text-gray-600">
                        5 ta test topshirildi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-blue-500">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                      <svg
                        className="h-7 w-7 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
                        Doimiylik
                      </h4>
                      <p className="text-xs text-gray-600">
                        5 kun ketma-ket faoliyat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-emerald-500">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm">
                      <svg
                        className="h-7 w-7 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
                        Eng Yaxshi Natija
                      </h4>
                      <p className="text-xs text-gray-600">90+ ball</p>
                    </div>
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
