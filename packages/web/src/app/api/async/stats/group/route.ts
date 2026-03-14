import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import { computeGroupStats } from "@/server/async/stats"

export const runtime = "nodejs"

export const GET = (req: NextRequest) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const groupId = searchParams.get("groupId")
  const from = searchParams.get("from") ?? undefined
  const to = searchParams.get("to") ?? undefined
  if (!groupId) return NextResponse.json({ error: "groupId kerak" }, { status: 400 })

  return NextResponse.json(computeGroupStats({ groupId, from, to }))
}

