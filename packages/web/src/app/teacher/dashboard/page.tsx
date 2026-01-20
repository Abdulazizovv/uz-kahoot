"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import { useAuthStore } from "@/stores/auth"
import Link from "next/link"

const TeacherDashboard = () => {
  const { user } = useAuthStore()

  // Layout already handles auth protection via ProtectedRoute
  // No need for redundant auth checks here

  const quizzes = [
    {
      id: "elektromagnetizm",
      name: "Elektromagnetizm",
      questions: 13,
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "example",
      name: "Example Quiz",
      questions: 3,
      icon: "📚",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const stats = [
    {
      title: "Umumiy o'yinlar",
      subtitle: "Barcha sessiyalar",
      value: "0",
      change: "+0%",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Faol talabalar",
      subtitle: "Hozirgi semester",
      value: "0",
      change: "+0%",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      color: "from-green-600 to-emerald-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Test modullari",
      subtitle: "Mavjud",
      value: quizzes.length.toString(),
      change: "Yangilandi",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-purple-600 to-indigo-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Laboratoriyalar",
      subtitle: "Virtual simulyatorlar",
      value: "14",
      change: "3 aktiv",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      color: "from-orange-600 to-red-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ]

  const quickActions = [
    {
      title: "O'yin yaratish",
      description: "Yangi test sessiyasini boshlash",
      icon: "🎮",
      href: "/game/manager",
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "Laboratoriya",
      description: "Fizika simulyatorlarini boshlash",
      icon: "🔬",
      href: "/teacher/labs",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Test yaratish",
      description: "Yangi test savollari qo'shish",
      icon: "➕",
      href: "/teacher/quizzes",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Natijalar",
      description: "O'tgan o'yinlar tahlili",
      icon: "📊",
      href: "/teacher/analytics",
      color: "from-orange-600 to-red-600",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex-1">
        <Header />

        <main className="p-8">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group rounded-xl border-2 ${stat.borderColor} ${stat.bgColor} p-6 shadow-md transition-all hover:shadow-xl`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <p className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-600">{stat.subtitle}</p>
                  </div>
                  <div
                    className={`rounded-lg bg-gradient-to-br ${stat.color} p-3 text-white shadow-md`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tezkor funksiyalar
                </h2>
                <p className="text-sm text-gray-600">
                  Asosiy amallarni tezkor bajarish
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all hover:border-blue-600 hover:shadow-xl"
                >
                  <div
                    className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br opacity-10 transition-all group-hover:scale-150 group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                  ></div>
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}
                  >
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {action.description}
                  </p>
                  <div className="flex items-center text-sm font-bold text-blue-900">
                    <span>Ochish</span>
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Available Quizzes */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Test modullari katalogi
                </h2>
                <p className="text-sm text-gray-600">
                  Mavjud test to'plamlari va o'quv materiallari
                </p>
              </div>
              <Link
                href="/teacher/quizzes"
                className="rounded-lg border-2 border-blue-900 bg-blue-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-800"
              >
                Barchasini ko'rish
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-blue-600 hover:shadow-xl"
                >
                  <div
                    className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${quiz.color}`}
                  >
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="relative text-7xl drop-shadow-lg">
                      {quiz.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        {quiz.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <span className="font-semibold">
                          {quiz.questions} savol
                        </span>
                      </div>
                      <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                        Faol
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Quiz Card */}
              <Link
                href="/teacher/quizzes"
                className="group flex flex-col items-center justify-center rounded-xl border-3 border-dashed border-gray-400 bg-slate-50 p-8 transition-all hover:border-blue-600 hover:bg-blue-50"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-800 shadow-lg transition-all group-hover:scale-110">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Yangi test moduli
                </h3>
                <p className="text-center text-sm text-gray-600">
                  Test to'plamini yaratish
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TeacherDashboard
