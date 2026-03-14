export type KahootPlayerResult = {
  studentUserId?: string
  studentName: string
  groupId?: string
  points: number
  rank: number
}

export type KahootSessionResult = {
  sessionId: string
  inviteCode: string
  quizzId: string
  subject: string
  // ISO datetime
  createdAt: string
  // ISO datetime
  finishedAt: string
  players: KahootPlayerResult[]
}
