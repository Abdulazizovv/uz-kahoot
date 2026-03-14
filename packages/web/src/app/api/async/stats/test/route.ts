import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import { computeTestStats } from "@/server/async/stats"

export const runtime = "nodejs"

export const GET = (req: NextRequest) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const kind = searchParams.get("kind") as "truefalse" | "matching" | "kahoot" | null
  const testId = searchParams.get("testId")
  if (!kind || !testId) return NextResponse.json({ error: "kind va testId kerak" }, { status: 400 })

  const stats = computeTestStats({ kind, testId })
  if (!stats) return NextResponse.json({ error: "Statistika topilmadi" }, { status: 404 })
  return NextResponse.json(stats)
}

