import { Server as ServerIO, Socket as SocketIO } from "socket.io"
import { GameUpdateQuestion, Player, QuizzWithId } from "."
import { Status, StatusDataMap } from "./status"
import {
  TrueFalseAttempt,
  TrueFalseTest,
  TrueFalseTestForStudent,
  TrueFalseTestSummary,
} from "../truefalse"

export type Server = ServerIO<ClientToServerEvents, ServerToClientEvents>
export type Socket = SocketIO<ClientToServerEvents, ServerToClientEvents>

export type Message<K extends keyof StatusDataMap = keyof StatusDataMap> = {
  gameId?: string
  status: K
  data: StatusDataMap[K]
}

export type MessageWithoutStatus<T = any> = {
  gameId?: string
  data: T
}

export type MessageGameId = {
  gameId?: string
}

export interface ServerToClientEvents {
  connect: () => void

  // Game events
  "game:status": (_data: { name: Status; data: StatusDataMap[Status] }) => void
  "game:successRoom": (_data: string) => void
  "game:successJoin": (_gameId: string) => void
  "game:totalPlayers": (_count: number) => void
  "game:errorMessage": (_message: string) => void
  "game:startCooldown": () => void
  "game:cooldown": (_count: number) => void
  "game:reset": (_message: string) => void
  "game:updateQuestion": (_data: { current: number; total: number }) => void
  "game:playerAnswer": (_count: number) => void

  // Player events
  "player:successReconnect": (_data: {
    gameId: string
    status: { name: Status; data: StatusDataMap[Status] }
    player: { username: string; points: number }
    currentQuestion: GameUpdateQuestion
  }) => void
  "player:updateLeaderboard": (_data: { leaderboard: Player[] }) => void

  // Manager events
  "manager:successReconnect": (_data: {
    gameId: string
    status: { name: Status; data: StatusDataMap[Status] }
    players: Player[]
    currentQuestion: GameUpdateQuestion
  }) => void
  "manager:quizzList": (_quizzList: QuizzWithId[]) => void
  "manager:gameCreated": (_data: { gameId: string; inviteCode: string }) => void
  "manager:statusUpdate": (_data: {
    status: Status
    data: StatusDataMap[Status]
  }) => void
  "manager:newPlayer": (_player: Player) => void
  "manager:removePlayer": (_playerId: string) => void
  "manager:errorMessage": (_message: string) => void
  "manager:playerKicked": (_playerId: string) => void

  // True/False tests
  "tf:tests": (_tests: TrueFalseTestSummary[]) => void
  "tf:test": (_test: TrueFalseTestForStudent | TrueFalseTest) => void
  "tf:results": (_attempts: TrueFalseAttempt[]) => void
  "tf:created": (_test: TrueFalseTestSummary) => void
  "tf:updated": (_test: TrueFalseTestSummary) => void
  "tf:deleted": (_testId: string) => void
  "tf:submitted": (_attempt: TrueFalseAttempt) => void
  "tf:error": (_message: string) => void
}

export interface ClientToServerEvents {
  // Manager actions
  "game:create": (_quizzId: string) => void
  "manager:auth": (_password: string) => void
  "manager:reconnect": (_message: { gameId: string }) => void
  "manager:kickPlayer": (_message: { gameId: string; playerId: string }) => void
  "manager:startGame": (_message: MessageGameId) => void
  "manager:abortQuiz": (_message: MessageGameId) => void
  "manager:nextQuestion": (_message: MessageGameId) => void
  "manager:showLeaderboard": (_message: MessageGameId) => void

  // Player actions
  "player:join": (_inviteCode: string) => void
  "player:login": (_message: MessageWithoutStatus<{ username: string }>) => void
  "player:reconnect": (_message: { gameId: string }) => void
  "player:selectedAnswer": (
    _message: MessageWithoutStatus<{ answerKey: number }>
  ) => void

  // Common
  // True/False tests
  "tf:list": (_payload: { mode: "teacher" } | { mode: "student"; groupId?: string }) => void
  "tf:get": (_payload: { id: string; mode: "teacher" | "student" }) => void
  "tf:create": (_test: Omit<TrueFalseTest, "id" | "createdAt" | "updatedAt">) => void
  "tf:update": (_test: TrueFalseTest) => void
  "tf:delete": (_payload: { id: string }) => void
  "tf:results": (_payload: { testId: string }) => void
  "tf:submit": (_payload: { testId: string; studentUserId: string; studentName: string; groupId?: string; answers: Array<{ questionId: string; answer: boolean }>; startedAt?: string }) => void
  disconnect: () => void
}
