import { NextRequest } from "next/server"

export const requireTeacher = (req: NextRequest) => {
  const userType = req.headers.get("x-user-type")
  const auth = req.headers.get("authorization")

  if (userType !== "teacher") {
    return { ok: false, message: "Ruxsat yo'q" as const }
  }

  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    return { ok: false, message: "Token topilmadi" as const }
  }

  const token = auth.slice("bearer ".length).trim()
  if (!token) {
    return { ok: false, message: "Token topilmadi" as const }
  }

  return { ok: true as const }
}

