import apiClient from "@/lib/api-client"

export interface StudentGroup {
  id: string
  name: string
  grade: number
  students_count: number
  created_at: string
  updated_at: string
}

export interface StudentGroupDetail extends StudentGroup {
  students: Array<{
    id: string
    full_name: string
    user: {
      id: string
      phone_number: string
      first_name: string
      last_name: string
    }
    date_of_birth?: string
    address?: string
  }>
}

export interface GroupStatistics {
  students_count: number
  active_students: number
  group_info: {
    name: string
    grade: number
    created_at: string
  }
}

export const groupsService = {
  // Guruhlar ro'yxati
  async getAll(params?: {
    grade?: number
    search?: string
    ordering?: string
  }) {
    const response = await apiClient.get<{ results: StudentGroup[] }>(
      "/api/students/groups/",
      { params },
    )
    return response.data.results
  },

  // Guruh tafsilotlari
  async getById(id: string) {
    const response = await apiClient.get<StudentGroupDetail>(
      `/api/students/groups/${id}/`,
    )
    return response.data
  },

  // Guruh statistikasi
  async getStatistics(id: string) {
    const response = await apiClient.get<GroupStatistics>(
      `/api/students/groups/${id}/statistics/`,
    )
    return response.data
  },

  // Yangi guruh yaratish
  async create(data: { name: string; grade: number }) {
    const response = await apiClient.post<StudentGroup>(
      "/api/students/groups/",
      data,
    )
    return response.data
  },

  // Guruhni yangilash
  async update(id: string, data: Partial<{ name: string; grade: number }>) {
    const response = await apiClient.patch<StudentGroup>(
      `/api/students/groups/${id}/`,
      data,
    )
    return response.data
  },

  // Guruhni o'chirish
  async delete(id: string) {
    await apiClient.delete(`/api/students/groups/${id}/`)
  },
}
