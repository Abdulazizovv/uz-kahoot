export interface StoredMiniQuizAttempt {
  v: 1
  postId: number
  answers: Record<string, number>
  submitted: boolean
  correctCount: number | null
  totalQuestions: number
  updatedAt: string
}

const keyForPost = (postId: number) => `itpost:mini-quiz:v1:${postId}`

export const loadMiniQuizAttempt = (postId: number): StoredMiniQuizAttempt | null => {
  try {
    const raw = localStorage.getItem(keyForPost(postId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredMiniQuizAttempt
    if (!parsed || parsed.v !== 1 || parsed.postId !== postId) return null
    if (!parsed.answers || typeof parsed.answers !== "object") return null
    return parsed
  } catch {
    return null
  }
}

export const saveMiniQuizAttempt = (attempt: StoredMiniQuizAttempt) => {
  try {
    localStorage.setItem(keyForPost(attempt.postId), JSON.stringify(attempt))
  } catch {
    // Ignore storage failures (private mode/quota).
  }
}

export const clearMiniQuizAttempt = (postId: number) => {
  try {
    localStorage.removeItem(keyForPost(postId))
  } catch {
    // Ignore storage failures.
  }
}

