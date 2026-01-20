"use client"

import {
  attendanceService,
  lessonsService,
  studentsService,
  type AttendanceStatus,
  type Lesson,
  type Student,
} from "@/services/api"
import { useEffect, useState } from "react"

export default function TeacherAttendancePage() {
  const [todayLessons, setTodayLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadTodayLessons()
  }, [])

  useEffect(() => {
    if (selectedLesson) {
      loadStudents()
      loadAttendance()
    }
  }, [selectedLesson])

  const loadTodayLessons = async () => {
    try {
      setLoading(true)
      const lessons = await lessonsService.getToday()
      setTodayLessons(lessons)
      if (lessons.length > 0) {
        setSelectedLesson(lessons[0])
      }
    } catch (error) {
      console.error("Darslarni yuklashda xatolik:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async () => {
    if (!selectedLesson) return
    try {
      const data = await studentsService.getByGroup(selectedLesson.group)
      setStudents(data)
    } catch (error) {
      console.error("Studentlarni yuklashda xatolik:", error)
    }
  }

  const loadAttendance = async () => {
    if (!selectedLesson) return
    try {
      const data = await attendanceService.getAll({ lesson: selectedLesson.id })
      const attendanceMap: Record<string, AttendanceStatus> = {}
      data.forEach((att) => {
        attendanceMap[att.student] = att.status
      })
      setAttendance(attendanceMap)
    } catch (error) {
      console.error("Davomatni yuklashda xatolik:", error)
    }
  }

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSaveAttendance = async () => {
    if (!selectedLesson) return

    try {
      setSaving(true)
      const studentsStatus = Object.entries(attendance).map(
        ([studentId, status]) => ({
          student_id: studentId,
          status,
        }),
      )

      await attendanceService.bulkCreate({
        lesson_id: selectedLesson.id,
        students_status: studentsStatus,
      })

      alert("Davomat muvaffaqiyatli saqlandi!")
      loadAttendance()
    } catch (error) {
      console.error("Davomatni saqlashda xatolik:", error)
      alert("Xatolik yuz berdi!")
    } finally {
      setSaving(false)
    }
  }

  const getStatusButton = (
    studentId: string,
    status: AttendanceStatus,
    label: string,
    color: string,
  ) => {
    const isSelected = attendance[studentId] === status
    return (
      <button
        onClick={() => handleStatusChange(studentId, status)}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          isSelected
            ? `${color} text-white shadow-lg`
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
    )
  }

  const stats = {
    present: Object.values(attendance).filter((s) => s === "present").length,
    absent: Object.values(attendance).filter((s) => s === "absent").length,
    late: Object.values(attendance).filter((s) => s === "late").length,
    excused: Object.values(attendance).filter((s) => s === "excused").length,
  }

  if (loading) {
    return (
      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-72 flex flex-1 flex-col overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900">
              Davomat boshqaruvi
            </h1>
            <p className="mt-2 text-gray-600">
              Bugun:{" "}
              {new Date().toLocaleDateString("uz-UZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {todayLessons.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <div className="text-6xl">📅</div>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                Bugun darslar yo'q
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Darslar sidebar */}
              <div className="lg:col-span-3">
                <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Bugungi darslar ({todayLessons.length})
                  </h2>
                  <div className="space-y-2">
                    {todayLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full rounded-lg p-4 text-left transition ${
                          selectedLesson?.id === lesson.id
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="font-bold">{lesson.subject_name}</div>
                        <div
                          className={`mt-1 text-sm ${
                            selectedLesson?.id === lesson.id
                              ? "text-indigo-100"
                              : "text-gray-500"
                          }`}
                        >
                          {lesson.start_time} - {lesson.end_time}
                        </div>
                        <div
                          className={`mt-1 text-xs ${
                            selectedLesson?.id === lesson.id
                              ? "text-indigo-200"
                              : "text-gray-400"
                          }`}
                        >
                          {lesson.group_name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Davomat belgilash */}
              <div className="lg:col-span-9">
                {selectedLesson && (
                  <div className="space-y-6">
                    {/* Dars ma'lumotlari */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {selectedLesson.subject_name}
                          </h2>
                          <p className="text-gray-600">
                            {selectedLesson.group_name} •{" "}
                            {selectedLesson.start_time} -{" "}
                            {selectedLesson.end_time}
                          </p>
                        </div>
                        <button
                          onClick={handleSaveAttendance}
                          disabled={
                            saving || Object.keys(attendance).length === 0
                          }
                          className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                        >
                          {saving ? "Saqlanmoqda..." : "💾 Saqlash"}
                        </button>
                      </div>

                      {/* Statistika */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="rounded-lg bg-green-50 p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {stats.present}
                          </div>
                          <div className="text-sm text-green-700">Keldi</div>
                        </div>
                        <div className="rounded-lg bg-red-50 p-4 text-center">
                          <div className="text-3xl font-bold text-red-600">
                            {stats.absent}
                          </div>
                          <div className="text-sm text-red-700">Kelmadi</div>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-4 text-center">
                          <div className="text-3xl font-bold text-yellow-600">
                            {stats.late}
                          </div>
                          <div className="text-sm text-yellow-700">
                            Kech qoldi
                          </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {stats.excused}
                          </div>
                          <div className="text-sm text-blue-700">Sababli</div>
                        </div>
                      </div>
                    </div>

                    {/* Studentlar ro'yxati */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Talabalar ro'yxati ({students.length})
                      </h3>

                      <div className="space-y-3">
                        {students.map((student, index) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {student.full_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {student.user.phone_number}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {getStatusButton(
                                student.id,
                                "present",
                                "✓ Keldi",
                                "bg-green-600",
                              )}
                              {getStatusButton(
                                student.id,
                                "late",
                                "⏰ Kech",
                                "bg-yellow-600",
                              )}
                              {getStatusButton(
                                student.id,
                                "absent",
                                "✗ Yo'q",
                                "bg-red-600",
                              )}
                              {getStatusButton(
                                student.id,
                                "excused",
                                "📝 Sababli",
                                "bg-blue-600",
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
