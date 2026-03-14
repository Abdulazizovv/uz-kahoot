import { KahootSessionResult } from "@eduarena/common/types/kahoot-results"
import fs from "fs"
import { resolve } from "path"
import { ensureDir, writeJsonAtomic } from "@/server/async/fs"
import { getConfigPath } from "@/server/async/config-path"

const resultsDir = () => getConfigPath("kahoot/results")

export const initKahootResultsStore = () => {
  ensureDir(getConfigPath("kahoot"))
  ensureDir(resultsDir())
}

const sessionFile = (sessionId: string) => resolve(resultsDir(), `${sessionId}.json`)

export const saveKahootSessionResult = (result: KahootSessionResult) => {
  initKahootResultsStore()
  writeJsonAtomic(sessionFile(result.sessionId), result)
}

export const listKahootSessionIds = (): string[] => {
  initKahootResultsStore()
  return fs
    .readdirSync(resultsDir())
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\\.json$/u, ""))
}

export const getKahootSessionResult = (sessionId: string): KahootSessionResult | null => {
  initKahootResultsStore()
  const path = sessionFile(sessionId)
  if (!fs.existsSync(path)) {
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8")) as KahootSessionResult
  } catch {
    return null
  }
}

