"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import { useAuthStore } from "@/stores/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Lab {
  id: number
  title: string
  description: string
  icon: string
  color: string
  difficulty: "Oson" | "O'rta" | "Qiyin"
  duration: string
  status: "available" | "coming-soon"
}

const LabsPage = () => {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    if (user && user.user_type !== "teacher") {
      router.push("/student/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.user_type !== "teacher") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  const labs: Lab[] = [
    {
      id: 1,
      title: "Elektrostatikaning asosiy tajribalari",
      description:
        "Elektrometrik kuchaytirgich yordamida elektrostatik hodisalarni o'rganish",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      difficulty: "O'rta",
      duration: "45 min",
      status: "available",
    },
    {
      id: 2,
      title: "Kondensatorlar elektr sig'imi",
      description:
        "Turli xil kondensatorlarning sig'imini aniqlash va tahlil qilish",
      icon: "🔋",
      color: "from-green-500 to-emerald-500",
      difficulty: "Oson",
      duration: "30 min",
      status: "available",
    },
    {
      id: 3,
      title: "Om qonuni va qarshilik",
      description:
        "Zanjirning bir qismi uchun Om qonunini o'rganish va qarshilikni aniqlash",
      icon: "🔌",
      color: "from-blue-500 to-cyan-500",
      difficulty: "Oson",
      duration: "40 min",
      status: "available",
    },
    {
      id: 4,
      title: "Uitston ko'prigi",
      description:
        "Uitston ko'prigidan foydalanib noma'lum qarshiliklarni aniqlash",
      icon: "🌉",
      color: "from-purple-500 to-pink-500",
      difficulty: "O'rta",
      duration: "50 min",
      status: "available",
    },
    {
      id: 5,
      title: "Ampermetr va Voltmetr",
      description:
        "O'lchash asboblarining chegaralarini orttirish va Kirxgoff qoidalari",
      icon: "📊",
      color: "from-red-500 to-pink-500",
      difficulty: "O'rta",
      duration: "45 min",
      status: "available",
    },
    {
      id: 6,
      title: "Isitish asboblari FIK",
      description:
        "Turli isitish asboblarining foydali ish koeffitsiyentini aniqlash",
      icon: "🔥",
      color: "from-orange-500 to-red-500",
      difficulty: "O'rta",
      duration: "55 min",
      status: "available",
    },
    {
      id: 7,
      title: "Vakuumli diod",
      description:
        "Vakuumli diodning volt-amper xarakteristikasi va Faradey doimiysi",
      icon: "💡",
      color: "from-amber-500 to-yellow-500",
      difficulty: "O'rta",
      duration: "60 min",
      status: "available",
    },
    {
      id: 8,
      title: "Yarim o'tkazgichlar",
      description: "Yarim o'tkazgichli asboblar va ularning xususiyatlari",
      icon: "🔬",
      color: "from-indigo-500 to-purple-500",
      difficulty: "Qiyin",
      duration: "70 min",
      status: "available",
    },
    {
      id: 9,
      title: "Magnit maydonida tokli o'tkazgich",
      description:
        "Taqasimon magnit maydonida tokli o'tkazgichga ta'sir etuvchi kuchni o'lchash",
      icon: "🧲",
      color: "from-blue-600 to-indigo-600",
      difficulty: "O'rta",
      duration: "60 min",
      status: "available",
    },
    {
      id: 10,
      title: "Magnit maydon",
      description: "To'g'ri o'tkazgich va halqaning magnit maydonini o'rganish",
      icon: "⚙️",
      color: "from-cyan-500 to-blue-500",
      difficulty: "O'rta",
      duration: "50 min",
      status: "coming-soon",
    },
    {
      id: 11,
      title: "Yer magnit maydoni",
      description:
        "Yer magnit maydoni kuchlanganligining gorizontal tashkil etuvchisi",
      icon: "🌍",
      color: "from-green-600 to-teal-600",
      difficulty: "Qiyin",
      duration: "55 min",
      status: "coming-soon",
    },
    {
      id: 12,
      title: "Elektromagnit induksiya",
      description: "Faradey elektromagnit induksiya qonunini o'rganish",
      icon: "🔄",
      color: "from-purple-600 to-indigo-600",
      difficulty: "O'rta",
      duration: "45 min",
      status: "coming-soon",
    },
    {
      id: 13,
      title: "Elektromagnit tebranishlar",
      description:
        "Erkin elektromagnit tebranishlarni o'rganish va tahlil qilish",
      icon: "〰️",
      color: "from-pink-500 to-rose-500",
      difficulty: "Qiyin",
      duration: "60 min",
      status: "coming-soon",
    },
    {
      id: 14,
      title: "Transformator",
      description:
        "Transformatoming FIK va o'zgaruvchan tok qonunlarini o'rganish",
      icon: "⚡",
      color: "from-red-600 to-orange-600",
      difficulty: "O'rta",
      duration: "50 min",
      status: "coming-soon",
    },
  ]

  const stats = [
    {
      title: "Jami laboratoriyalar",
      value: labs.length.toString(),
      icon: "🔬",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Mavjud",
      value: labs.filter((lab) => lab.status === "available").length.toString(),
      icon: "✅",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Tez kunda",
      value: labs
        .filter((lab) => lab.status === "coming-soon")
        .length.toString(),
      icon: "⏳",
      color: "from-orange-600 to-red-600",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex-1">
        <Header />

        <main className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-800 shadow-lg">
                <svg
                  className="h-8 w-8 text-white"
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
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Virtual Laboratoriya Kompleksi
                </h1>
                <p className="text-gray-600">
                  Fizika fanlari bo'yicha 14 ta interaktiv simulyatsiya moduli
                </p>
              </div>
            </div>
            <div className="rounded-lg border-l-4 border-blue-900 bg-blue-50 p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-900">Diqqat:</strong> Har bir
                laboratoriya mashg'uloti zamonaviy simulyatsiya texnologiyalari
                asosida ishlab chiqilgan bo'lib, nazariy bilimlarni amaliy
                ko'nikmalar bilan mustahkamlash imkonini beradi.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      {stat.title}
                    </p>
                    <p className="text-4xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-5xl">{stat.icon}</div>
                </div>
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                ></div>
              </div>
            ))}
          </div>

          {/* Labs Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-blue-600 hover:shadow-xl"
              >
                {lab.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 z-10 rounded-md bg-gray-900/90 px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
                    Ishlanmoqda
                  </div>
                )}

                <div
                  className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${lab.color}`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                    Lab #{lab.id}
                  </div>
                  <div className="relative text-7xl drop-shadow-2xl">
                    {lab.icon}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span
                      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${
                        lab.difficulty === "Oson"
                          ? "bg-green-100 text-green-800"
                          : lab.difficulty === "O'rta"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lab.difficulty}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold">{lab.duration}</span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg leading-tight font-bold text-gray-900">
                    {lab.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {lab.description}
                  </p>

                  {lab.status === "available" ? (
                    <Link
                      href={`/teacher/labs/${lab.id}`}
                      className={`flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${lab.color} px-4 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg`}
                    >
                      <span>Boshlash</span>
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full cursor-not-allowed rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-3 font-bold text-gray-400"
                    >
                      Ishlanmoqda
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default LabsPage
