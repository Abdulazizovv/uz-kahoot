import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import {
  createMatchingTest,
  listAvailableMatchingTestsForStudent,
  listMatchingTests,
} from "@/server/async/matching-store"
import { MatchingTest } from "@eduarena/common/types/matching"

export const runtime = "nodejs"

export const GET = (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("mode")
  const groupId = searchParams.get("groupId") ?? undefined

  if (mode === "teacher") {
    const auth = requireTeacher(req)
    if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
    return NextResponse.json(listMatchingTests())
  }

  return NextResponse.json(listAvailableMatchingTestsForStudent(groupId))
}

export const POST = async (req: NextRequest) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
  const input = (await req.json()) as Omit<MatchingTest, "id" | "createdAt" | "updatedAt">
  const created = createMatchingTest(input)
  return NextResponse.json(created, { status: 201 })
}

