import apiClient from "@/lib/api-client"

export interface Student {
  id: string
  user: {
    id: string
    phone_number: string
    first_name: string
    last_name: string
    is_active: boolean
  }
  full_name: string
  group: string
  group_name: string
  date_of_birth?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface StudentDetail extends Omit<Student, "group"> {
  group: {
    id: string
    name: string
    grade: number
    students_count: number
  }
  age?: number
}

export const studentsService = {
  // Studentlar ro'yxati
  async getAll(params?: {
    group?: string
    group__grade?: number
    search?: string
    ordering?: string
  }) {
    const response = await apiClient.get<{ results: Student[] }>(
      "/api/students/",
      { params },
    )
    return response.data.results
  },

  // Student tafsilotlari
  async getById(id: string) {
    const response = await apiClient.get<StudentDetail>(`/api/students/${id}/`)
    return response.data
  },

  // Mening profilim (student)
  async getMe() {
    const response = await apiClient.get<StudentDetail>("/api/students/me/")
    return response.data
  },

  // Guruh bo'yicha studentlar
  async getByGroup(groupId: string) {
    const response = await apiClient.get<{ results: Student[] }>(
      "/api/students/by_group/",
      {
        params: { group_id: groupId },
      },
    )
    return response.data.results
  },

  // Yangi student yaratish
  async create(data: {
    user_id: string
    group?: string
    date_of_birth?: string
    address?: string
  }) {
    const response = await apiClient.post<Student>("/api/students/", data)
    return response.data
  },

  // Studentni yangilash
  async update(
    id: string,
    data: Partial<{
      group: string
      date_of_birth: string
      address: string
    }>,
  ) {
    const response = await apiClient.patch<Student>(
      `/api/students/${id}/`,
      data,
    )
    return response.data
  },

  // Studentni o'chirish
  async delete(id: string) {
    await apiClient.delete(`/api/students/${id}/`)
  },
}
