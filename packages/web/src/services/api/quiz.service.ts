import apiClient from "@/lib/api-client"

export interface Subject {
  id: string
  name: string
  description?: string
  order: number
  questions_count: number
  created_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  student: {
    id: string
    full_name: string
  }
  subject: string
  subject_name: string
  title: string
  started_at: string
  completed_at?: string
  is_completed: boolean
  total_questions: number
  correct_answers: number
  wrong_answers: number
  score: number
  percentage: number
  created_at: string
}

export interface QuizDetail extends Quiz {
  student_answers: Array<{
    id: string
    question_text: string
    selected_answer_text: string
    correct_answer: {
      id: string
      answer_text: string
    }
    is_correct: boolean
    time_taken: number
  }>
}

export interface QuizStatistics {
  id: string
  student: {
    id: string
    full_name: string
  }
  subject: {
    id: string
    name: string
  }
  total_attempts: number
  total_questions_answered: number
  total_correct: number
  total_wrong: number
  average_score: number
  best_score: number
  success_rate: number
  last_attempt_date: string
}

export interface Question {
  id: string
  question_text: string
  time_limit: number
  cooldown: number
  difficulty: "easy" | "medium" | "hard"
  answers: Array<{
    id: string
    answer_text: string
    order: number
  }>
}

export interface QuizStartResponse {
  quiz_id: string
  subject: Subject
  total_questions: number
  questions: Question[]
  started_at: string
}

export const quizService = {
  // Fanlar ro'yxati
  async getSubjects(params?: { search?: string; ordering?: string }) {
    const response = await apiClient.get<{ results: Subject[] }>(
      "/api/subjects/",
      { params },
    )
    return response.data.results
  },

  // Test boshlash
  async startQuiz(data: { subject_id: string; questions_count?: number }) {
    const response = await apiClient.post<QuizStartResponse>(
      "/api/quizzes/start_quiz/",
      data,
    )
    return response.data
  },

  // Javob yuborish
  async submitAnswer(data: {
    quiz_id: string
    question_id: string
    answer_id: string
    time_taken: number
  }) {
    const response = await apiClient.post("/api/quizzes/submit_answer/", data)
    return response.data
  },

  // Testni tugatish
  async completeQuiz(quizId: string) {
    const response = await apiClient.post<QuizDetail>(
      `/api/quizzes/${quizId}/complete_quiz/`,
    )
    return response.data
  },

  // Mening testlarim
  async getMyQuizzes(params?: { is_completed?: boolean }) {
    const response = await apiClient.get<{ results: Quiz[] }>(
      "/api/quizzes/my_quizzes/",
      { params },
    )
    return response.data.results
  },

  // Test tafsilotlari
  async getQuizById(id: string) {
    const response = await apiClient.get<QuizDetail>(`/api/quizzes/${id}/`)
    return response.data
  },

  // Mening statistikam
  async getMyStatistics() {
    const response = await apiClient.get<QuizStatistics[]>(
      "/api/statistics/my_statistics/",
    )
    return response.data
  },

  // Barcha statistika (admin)
  async getAllStatistics(params?: { student?: string; subject?: string }) {
    const response = await apiClient.get<{ results: QuizStatistics[] }>(
      "/api/statistics/",
      { params },
    )
    return response.data.results
  },
}
