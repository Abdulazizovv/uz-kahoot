import apiClient from "@/lib/api-client"

export type AttendanceStatus = "present" | "absent" | "late" | "excused"

export interface Attendance {
  id: string
  student: string
  lesson: string
  lesson_info: {
    subject: string
    date: string
    start_time: string
    end_time: string
  }
  status: AttendanceStatus
  is_auto_marked: boolean
  marked_at: string
  marked_by_name?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface AttendanceStatistics {
  id: string
  student: {
    id: string
    full_name: string
  }
  subject: {
    id: string
    name: string
  }
  total_lessons: number
  present_count: number
  absent_count: number
  late_count: number
  excused_count: number
  attendance_rate: number
  last_updated: string
}

export interface Lesson {
  id: string
  group: string
  group_name: string
  subject: string
  subject_name: string
  teacher_name: string
  date: string
  start_time: string
  end_time: string
  room?: string
  topic?: string
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  auto_attendance_enabled: boolean
  attendance_count: number
  created_at: string
  updated_at: string
}

export const attendanceService = {
  // Davomat ro'yxati
  async getAll(params?: {
    student?: string
    lesson?: string
    lesson__date?: string
    lesson__subject?: string
    status?: AttendanceStatus
    is_auto_marked?: boolean
  }) {
    const response = await apiClient.get<{ results: Attendance[] }>(
      "/api/attendance/",
      { params },
    )
    return response.data.results
  },

  // Mening davomatim
  async getMyAttendance(params?: { start_date?: string; end_date?: string }) {
    const response = await apiClient.get<{ results: Attendance[] }>(
      "/api/attendance/my_attendance/",
      { params },
    )
    return response.data.results
  },

  // Davomat belgilash (qo'lda)
  async create(data: {
    lesson: string
    student: string
    status: AttendanceStatus
    notes?: string
  }) {
    const response = await apiClient.post<Attendance>("/api/attendance/", data)
    return response.data
  },

  // Bir nechta talabaga davomat belgilash
  async bulkCreate(data: {
    lesson_id: string
    students_status: Array<{
      student_id: string
      status: AttendanceStatus
      notes?: string
    }>
  }) {
    const response = await apiClient.post<{ created: Attendance[] }>(
      "/api/attendance/bulk_create/",
      data,
    )
    return response.data.created
  },

  // Davomatni yangilash
  async update(
    id: string,
    data: { status?: AttendanceStatus; notes?: string },
  ) {
    const response = await apiClient.patch<Attendance>(
      `/api/attendance/${id}/`,
      data,
    )
    return response.data
  },

  // Davomatni o'chirish
  async delete(id: string) {
    await apiClient.delete(`/api/attendance/${id}/`)
  },

  // Davomat statistikasi
  async getStatistics(params?: { student?: string; subject?: string }) {
    const response = await apiClient.get<{ results: AttendanceStatistics[] }>(
      "/api/attendance-statistics/",
      { params },
    )
    return response.data.results
  },

  // Mening statistikam
  async getMyStatistics() {
    const response = await apiClient.get<AttendanceStatistics[]>(
      "/api/attendance-statistics/my_statistics/",
    )
    return response.data
  },

  // Davomat hisoboti
  async getReport(data: {
    start_date: string
    end_date: string
    group_id?: string
    subject_id?: string
  }) {
    const response = await apiClient.post(
      "/api/attendance-statistics/report/",
      data,
    )
    return response.data
  },
}

export const lessonsService = {
  // Darslar ro'yxati
  async getAll(params?: {
    group?: string
    subject?: string
    teacher?: string
    date?: string
    status?: string
    auto_attendance_enabled?: boolean
  }) {
    const response = await apiClient.get<{ results: Lesson[] }>(
      "/api/lessons/",
      { params },
    )
    return response.data.results
  },

  // Bugungi darslar
  async getToday(groupId?: string) {
    const response = await apiClient.get<Lesson[]>("/api/lessons/today/", {
      params: groupId ? { group_id: groupId } : undefined,
    })
    return response.data
  },

  // Haftalik darslar
  async getThisWeek(groupId?: string) {
    const response = await apiClient.get<Lesson[]>("/api/lessons/this_week/", {
      params: groupId ? { group_id: groupId } : undefined,
    })
    return response.data
  },

  // Dars tafsilotlari
  async getById(id: string) {
    const response = await apiClient.get<Lesson>(`/api/lessons/${id}/`)
    return response.data
  },

  // Yangi dars yaratish
  async create(data: {
    group: string
    subject: string
    teacher?: string
    date: string
    start_time: string
    end_time: string
    room?: string
    topic?: string
    auto_attendance_enabled?: boolean
    related_quiz_subject?: string
  }) {
    const response = await apiClient.post<Lesson>("/api/lessons/", data)
    return response.data
  },

  // Jadvалdan darslar yaratish
  async generateFromSchedule(data: {
    start_date: string
    end_date: string
    group_id?: string
  }) {
    const response = await apiClient.post<{
      created_count: number
      lessons: Lesson[]
    }>("/api/lessons/generate_from_schedule/", data)
    return response.data
  },
}
