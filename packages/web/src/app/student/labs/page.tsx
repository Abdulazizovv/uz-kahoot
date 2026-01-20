"use client"

import StudentHeader from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import Link from "next/link"

export default function StudentLabsPage() {
  const labs = [
    {
      id: 1,
      title: "Elektrostatika. Kulon qonuni",
      description:
        "Elektr zaryadlari o'zaro ta'sirini o'rganish va Kulon qonunini eksperimental tekshirish",
      difficulty: "Oson",
      duration: "45 daqiqa",
      status: "completed",
      progress: 100,
      score: 95,
    },
    {
      id: 2,
      title: "Kondensatorlar va dielektriklar",
      description:
        "Kondensator sig'imi, dielektrik singdiruvchanlik va energiya to'planishini o'rganish",
      difficulty: "Oson",
      duration: "50 daqiqa",
      status: "completed",
      progress: 100,
      score: 92,
    },
    {
      id: 3,
      title: "Om qonuni. Ketma-ket va parallel ulanishlar",
      description:
        "Om qonunini o'rganish, tok kuchi, kuchlanish va qarshilik bog'lanishini tekshirish",
      difficulty: "Oson",
      duration: "40 daqiqa",
      status: "completed",
      progress: 100,
      score: 88,
    },
    {
      id: 4,
      title: "Uitston ko'prigi yordamida qarshilikni o'lchash",
      description:
        "Uitston ko'prigi prinsipini o'rganish va noma'lum qarshiliklarni yuqori aniqlikda o'lchash",
      difficulty: "O'rta",
      duration: "60 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 5,
      title: "Kirxgof qonunlarini o'rganish va tekshirish",
      description:
        "Ampermetr va voltmetr yordamida murakkab elektr zanjirlarda Kirxgof qonunlarini eksperimental tekshirish",
      difficulty: "Qiyin",
      duration: "70 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 6,
      title: "Isitish qurilmalarining F.I.K.",
      description:
        "Elektr isitish qurilmalarining foydali ish koeffitsientini aniqlash va energiya samaradorligini baholash",
      difficulty: "O'rta",
      duration: "55 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 7,
      title: "Vakuumli diod xarakteristikasi",
      description:
        "Vakuumli diodning volt-amper xarakteristikasini o'rganish va Child-Lengmyur qonunini tekshirish",
      difficulty: "O'rta",
      duration: "60 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 8,
      title: "Yarim o'tkazgichlar va p-n o'tish",
      description:
        "Yarim o'tkazgichlarning xossalari va p-n o'tishning volt-amper xarakteristikasini o'rganish",
      difficulty: "Murakkab",
      duration: "70 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 9,
      title: "Magnit maydoni tokli o'tkazgichga ta'siri",
      description:
        "Amper kuchi qonunini o'rganish va magnit maydonining tok o'tkazgichga ta'sirini tekshirish",
      difficulty: "O'rta",
      duration: "60 daqiqa",
      status: "available",
      progress: 0,
      score: null,
    },
    {
      id: 10,
      title: "To'g'ri o'tkazgich va g'altakning magnit maydoni",
      description:
        "Bio-Savar-Laplas qonuni va magnit maydonining kuchlanganligini o'rganish",
      difficulty: "O'rta",
      duration: "55 daqiqa",
      status: "locked",
      progress: 0,
      score: null,
    },
    {
      id: 11,
      title: "Yer magnit maydonini o'lchash",
      description:
        "Tangens-galvanometr yordamida Yer magnit maydonining gorizontal tashkil etuvchisini aniqlash",
      difficulty: "Qiyin",
      duration: "60 daqiqa",
      status: "locked",
      progress: 0,
      score: null,
    },
    {
      id: 12,
      title: "Elektromagnit induksiya. Faradey qonuni",
      description:
        "Elektromagnit induksiya hodisasini o'rganish va induksiya EYuK ni aniqlash",
      difficulty: "O'rta",
      duration: "50 daqiqa",
      status: "locked",
      progress: 0,
      score: null,
    },
    {
      id: 13,
      title: "Erkin elektromagnit tebranishlar",
      description:
        "Tebranish konturdagi erkin elektromagnit tebranishlarni o'rganish va Thomson formulasini tekshirish",
      difficulty: "Qiyin",
      duration: "70 daqiqa",
      status: "locked",
      progress: 0,
      score: null,
    },
    {
      id: 14,
      title: "Transformator F.I.K. va o'zgaruvchan tok qonunlari",
      description:
        "Transformatorning foydali ish koeffitsientini aniqlash va o'zgaruvchan tok qonunlarini o'rganish",
      difficulty: "Qiyin",
      duration: "65 daqiqa",
      status: "locked",
      progress: 0,
      score: null,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Oson":
        return "bg-green-100 text-green-700 border border-green-300"
      case "O'rta":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300"
      case "Qiyin":
        return "bg-red-100 text-red-700 border border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300"
    }
  }

  const getStatusBadge = (status: string, score: number | null) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-green-600 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              Bajarildi
            </span>
            {score && (
              <span className="rounded-md border border-blue-600 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                Ball: {score}
              </span>
            )}
          </div>
        )
      case "available":
        return (
          <span className="rounded-md border border-blue-600 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Mavjud
          </span>
        )
      case "locked":
        return (
          <span className="rounded-md border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
            Yopiq
          </span>
        )
      default:
        return null
    }
  }

  const completedCount = labs.filter((lab) => lab.status === "completed").length
  const totalScore = labs
    .filter((lab) => lab.score)
    .reduce((sum, lab) => sum + (lab.score || 0), 0)
  const avgScore =
    completedCount > 0 ? Math.round(totalScore / completedCount) : 0

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Virtual Laboratoriyalar
                </h1>
                <p className="text-sm text-gray-600">
                  Fizika bo'yicha 14 ta interaktiv laboratoriya simulyatori
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="group rounded-xl border border-green-200 bg-gradient-to-br from-white to-green-50 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {completedCount}/14
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Bajarilgan laboratoriyalar
                  </div>
                </div>
              </div>
            </div>

            <div className="group rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {avgScore}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    O'rtacha ball
                  </div>
                </div>
              </div>
            </div>

            <div className="group rounded-xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round((completedCount / labs.length) * 100)}%
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    To'ldirildi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Umumiy progress
                </h3>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {completedCount} / {labs.length} laboratoriya
              </span>
            </div>
            <div className="relative h-4 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 shadow-sm transition-all duration-500"
                style={{ width: `${(completedCount / labs.length) * 100}%` }}
              >
                <div className="absolute inset-0 animate-pulse bg-white/20"></div>
              </div>
            </div>
            <div className="mt-2 text-right text-xs text-gray-500">
              {Math.round((completedCount / labs.length) * 100)}% to'ldirildi
            </div>
          </div>

          {/* Labs Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className={`group rounded-xl border bg-white shadow-md transition-all ${
                  lab.status === "locked"
                    ? "border-gray-200 opacity-60"
                    : "border-gray-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                }`}
              >
                {/* Header */}
                <div className="relative overflow-hidden rounded-t-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6">
                  <div className="bg-grid-white/[0.05] absolute inset-0 bg-[length:20px_20px]"></div>
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-xl font-bold text-white backdrop-blur-sm">
                      {lab.id}
                    </span>
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${getDifficultyColor(lab.difficulty)}`}
                    >
                      {lab.difficulty}
                    </span>
                  </div>
                  <h3 className="relative mt-4 text-lg font-bold text-white">
                    {lab.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {lab.description}
                  </p>

                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
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
                      <span className="font-medium">{lab.duration}</span>
                    </div>
                    {lab.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">
                          {lab.progress}% bajarildi
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    {getStatusBadge(lab.status, lab.score)}
                  </div>

                  {lab.status !== "locked" && (
                    <Link
                      href={`/student/labs/${lab.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                    >
                      {lab.status === "completed" ? (
                        <>
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>Ko'rib chiqish</span>
                        </>
                      ) : (
                        <>
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
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Boshlash</span>
                        </>
                      )}
                    </Link>
                  )}

                  {lab.status === "locked" && (
                    <div className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      <span>Oldingi lablarni bajaring</span>
                    </div>
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
