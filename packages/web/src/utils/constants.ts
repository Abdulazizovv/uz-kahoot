import Answers from "@/components/game/states/Answers"
import Leaderboard from "@/components/game/states/Leaderboard"
import Podium from "@/components/game/states/Podium"
import Prepared from "@/components/game/states/Prepared"
import Question from "@/components/game/states/Question"
import Responses from "@/components/game/states/Responses"
import Result from "@/components/game/states/Result"
import Room from "@/components/game/states/Room"
import Start from "@/components/game/states/Start"
import Wait from "@/components/game/states/Wait"

import { STATUS } from "@eduarena/common/types/game/status"
import Circle from "@/components/icons/Circle"
import Rhombus from "@/components/icons/Rhombus"
import Square from "@/components/icons/Square"
import Triangle from "@/components/icons/Triangle"

export const ANSWERS_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-green-500",
]

export const ANSWERS_ICONS = [Triangle, Rhombus, Circle, Square]

export const GAME_STATES = {
  status: {
    name: STATUS.WAIT,
    data: { text: "O'yin boshlanishi kutilmoqda..." },
  },
  question: {
    current: 1,
    total: null,
  },
}

export const GAME_STATE_COMPONENTS = {
  [STATUS.SELECT_ANSWER]: Answers,
  [STATUS.SHOW_QUESTION]: Question,
  [STATUS.WAIT]: Wait,
  [STATUS.SHOW_START]: Start,
  [STATUS.SHOW_RESULT]: Result,
  [STATUS.SHOW_PREPARED]: Prepared,
}

export const GAME_STATE_COMPONENTS_MANAGER = {
  ...GAME_STATE_COMPONENTS,
  [STATUS.SHOW_ROOM]: Room,
  [STATUS.SHOW_RESPONSES]: Responses,
  [STATUS.SHOW_LEADERBOARD]: Leaderboard,
  [STATUS.FINISHED]: Podium,
}

export const SFX_ANSWERS_MUSIC = "/sounds/answersMusic.mp3"
export const SFX_ANSWERS_SOUND = "/sounds/answersSound.mp3"
export const SFX_RESULTS_SOUND = "/sounds/results.mp3"
export const SFX_SHOW_SOUND = "/sounds/show.mp3"
export const SFX_BOUMP_SOUND = "/sounds/boump.mp3"
export const SFX_PODIUM_THREE = "/sounds/three.mp3"
export const SFX_PODIUM_SECOND = "/sounds/second.mp3"
export const SFX_PODIUM_FIRST = "/sounds/first.mp3"
export const SFX_SNEAR_ROOL = "/sounds/snearRoll.mp3"

export const MANAGER_SKIP_BTN = {
  [STATUS.SHOW_ROOM]: "O'yinni boshlash",
  [STATUS.SHOW_START]: null,
  [STATUS.SHOW_PREPARED]: null,
  [STATUS.SHOW_QUESTION]: null,
  [STATUS.SELECT_ANSWER]: "O'tkazib yuborish",
  [STATUS.SHOW_RESULT]: null,
  [STATUS.SHOW_RESPONSES]: "Keyingisi",
  [STATUS.SHOW_LEADERBOARD]: "Keyingisi",
  [STATUS.FINISHED]: null,
  [STATUS.WAIT]: null,
}
