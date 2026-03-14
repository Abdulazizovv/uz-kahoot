import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import {
  deleteMatchingTest,
  getMatchingTest,
  getMatchingTestForStudent,
  updateMatchingTest,
} from "@/server/async/matching-store"
import { MatchingTest } from "@eduarena/common/types/matching"

export const runtime = "nodejs"

export const GET = async (req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("mode") ?? "student"
  const { id } = await ctx.params

  if (mode === "teacher") {
    const auth = requireTeacher(req)
    if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
    const test = getMatchingTest(id)
    if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })
    return NextResponse.json(test)
  }

  const test = getMatchingTestForStudent(id)
  if (!test) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })
  const now = Date.now()
  if (now < new Date(test.startAt).getTime() || now > new Date(test.endAt).getTime()) {
    return NextResponse.json({ error: "Test vaqti tugagan yoki hali boshlanmagan" }, { status: 400 })
  }
  return NextResponse.json(test)
}

export const PUT = async (req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
  const { id } = await ctx.params

  const body = (await req.json()) as MatchingTest
  if (body.id !== id) return NextResponse.json({ error: "ID mos emas" }, { status: 400 })

  return NextResponse.json(updateMatchingTest(body))
}

export const DELETE = async (req: NextRequest, ctx: { params: Promise<{ id: string }> }) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
  const { id } = await ctx.params

  const ok = deleteMatchingTest(id)
  if (!ok) return NextResponse.json({ error: "Test topilmadi" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
