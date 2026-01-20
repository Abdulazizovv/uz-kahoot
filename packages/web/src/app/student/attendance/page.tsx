"use client"

import {
  attendanceService,
  lessonsService,
  type AttendanceStatistics,
  type Lesson,
} from "@/services/api/attendance.service"
import { studentsService } from "@/services/api/students.service"
import { useEffect, useState } from "react"

export default function StudentAttendancePage() {
  const [todayLessons, setTodayLessons] = useState<Lesson[]>([])
  const [statistics, setStatistics] = useState<AttendanceStatistics[]>([])
  const [loading, setLoading] = useState(true)
  const [studentGroup, setStudentGroup] = useState<string>("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Student profili va guruh ID
      const studentProfile = await studentsService.getMe()
      setStudentGroup(studentProfile.group.name)

      // Bugungi darslar
      const lessons = await lessonsService.getToday(studentProfile.group.id)
      setTodayLessons(lessons)

      // Davomat statistikasi
      const stats = await attendanceService.getMyStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      scheduled: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Rejalashtirilgan",
      },
      ongoing: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Davom etmoqda",
      },
      completed: { bg: "bg-gray-100", text: "text-gray-700", label: "Tugagan" },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Bekor qilingan",
      },
    }
    const badge = badges[status as keyof typeof badges] || badges.scheduled
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}
      >
        {badge.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="rounded-2xl border border-indigo-200 bg-white p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Davomat</h1>
              <p className="mt-2 text-lg text-gray-600">
                Guruh:{" "}
                <span className="font-semibold text-indigo-600">
                  {studentGroup}
                </span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Bugun</div>
              <div className="text-2xl font-bold text-indigo-600">
                {new Date().toLocaleDateString("uz-UZ", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bugungi darslar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-xl text-white">
              📅
            </span>
            Bugungi darslar
          </h2>

          {todayLessons.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <div className="text-6xl">📚</div>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                Bugun darslar yo'q
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Dam oling yoki o'tgan darslarni takrorlang
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-xl border-2 border-gray-200 bg-gradient-to-r from-white to-blue-50 p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {lesson.subject_name}
                        </h3>
                        {getStatusBadge(lesson.status)}
                        {lesson.auto_attendance_enabled && (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            ✅ Avtomatik davomat
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          🕐 Vaqt: {lesson.start_time} - {lesson.end_time}
                        </p>
                        {lesson.room && <p>🚪 Xona: {lesson.room}</p>}
                        {lesson.topic && <p>📖 Mavzu: {lesson.topic}</p>}
                        <p>👨‍🏫 O'qituvchi: {lesson.teacher_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Davomat</div>
                      <div className="text-3xl font-bold text-indigo-600">
                        {lesson.attendance_count}
                      </div>
                      <div className="text-xs text-gray-500">ta talaba</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Davomat statistikasi */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-xl text-white">
              📊
            </span>
            Fan bo'yicha statistika
          </h2>

          {statistics.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <div className="text-6xl">📈</div>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                Hali statistika yo'q
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Darslar boshlanganidan keyin statistika paydo bo'ladi
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {statistics.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-purple-50 p-6"
                >
                  <h3 className="mb-4 text-lg font-bold text-gray-900">
                    {stat.subject.name}
                  </h3>

                  {/* Davomat foizi */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-700">
                        Davomat foizi:
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {stat.attendance_rate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full transition-all duration-500 ${
                          stat.attendance_rate >= 80
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : stat.attendance_rate >= 60
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{ width: `${stat.attendance_rate}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistika detallari */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between rounded-lg bg-white p-2">
                      <span className="text-gray-600">Jami darslar:</span>
                      <span className="font-bold text-gray-900">
                        {stat.total_lessons}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-green-50 p-2">
                      <span className="text-green-700">✓ Keldi:</span>
                      <span className="font-bold text-green-700">
                        {stat.present_count}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-red-50 p-2">
                      <span className="text-red-700">✗ Kelmadi:</span>
                      <span className="font-bold text-red-700">
                        {stat.absent_count}
                      </span>
                    </div>
                    {stat.late_count > 0 && (
                      <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-2">
                        <span className="text-yellow-700">⏰ Kech qoldi:</span>
                        <span className="font-bold text-yellow-700">
                          {stat.late_count}
                        </span>
                      </div>
                    )}
                    {stat.excused_count > 0 && (
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2">
                        <span className="text-blue-700">📝 Sababli:</span>
                        <span className="font-bold text-blue-700">
                          {stat.excused_count}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-500">
                    Oxirgi yangilanish:{" "}
                    {new Date(stat.last_updated).toLocaleDateString("uz-UZ")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Eslatma */}
        <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-6 shadow-lg">
          <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
            <span>⚠️</span>
            Muhim ma'lumot
          </h3>
          <ul className="ml-6 space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>
                Avtomatik davomat yoqilgan darslarda test topshirganingizda
                davomat avtomatik olinadi
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>
                Test topshirish uchun dars vaqtidan 30 daqiqa oldin yoki keyin
                topshirishingiz mumkin
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">▸</span>
              <span>Davomat foizi 80% dan past bo'lmasligi kerak</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
