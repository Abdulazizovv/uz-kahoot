"use client"

import { useAuthStore } from "@/stores/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { itPosts, ItPost } from "@/lib/it-posts"

interface PostCard {
  id: number
  title: string
  description: string
  icon: string
  color: string
  level: ItPost["level"]
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

  const posts: PostCard[] = itPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.summary,
    icon: "🧩",
    color:
      post.level === "Boshlang'ich"
        ? "from-emerald-500 to-teal-500"
        : post.level === "O'rta"
          ? "from-blue-500 to-indigo-500"
          : "from-purple-500 to-pink-500",
    level: post.level,
    duration: post.readTime,
    status: post.status === "locked" ? "coming-soon" : "available",
  }))

  const stats = [
    {
      title: "Jami postlar",
      value: posts.length.toString(),
      icon: "📚",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Mavjud",
      value: posts.filter((post) => post.status === "available").length.toString(),
      icon: "✅",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Tez kunda",
      value: posts.filter((post) => post.status === "coming-soon").length.toString(),
      icon: "⏳",
      color: "from-orange-600 to-red-600",
    },
  ]

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-indigo-800 shadow-lg">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              IT Postlar Kompleksi
            </h1>
            <p className="text-gray-600">
              14 ta IT yo'nalishidagi maqola va qo'llanmalar
            </p>
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-slate-900 bg-slate-50 p-4">
          <p className="text-sm text-gray-700">
            <strong className="text-slate-900">Diqqat:</strong> Har bir post amaliy
            misollar, kod parchalari va o'qituvchiga mo'ljallangan eslatmalar bilan
            boyitilgan.
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

      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md transition-all hover:border-blue-600 hover:shadow-xl"
          >
            {post.status === "coming-soon" && (
              <div className="absolute top-4 right-4 z-10 rounded-md bg-gray-900/90 px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
                Ishlanmoqda
              </div>
            )}

            <div
              className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${post.color}`}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 left-4 rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                Post #{post.id}
              </div>
              <div className="relative text-7xl drop-shadow-2xl">
                {post.icon}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span
                  className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${
                    post.level === "Boshlang'ich"
                      ? "bg-green-100 text-green-800"
                      : post.level === "O'rta"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {post.level}
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
                  <span className="font-semibold">{post.duration}</span>
                </div>
              </div>

              <h3 className="mb-2 text-lg leading-tight font-bold text-gray-900">
                {post.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                {post.description}
              </p>

              {post.status === "available" ? (
                <Link
                  href={`/teacher/labs/${post.id}`}
                  className={`flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${post.color} px-4 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg`}
                >
                  <span>Ko'rish</span>
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
    </div>
  )
}

export default LabsPage
