import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import {
  createTest,
  listAvailableTestsForStudent,
  listTests,
} from "@/server/async/truefalse-store"
import { TrueFalseTest } from "@eduarena/common/types/truefalse"

export const runtime = "nodejs"

export const GET = (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("mode")
  const groupId = searchParams.get("groupId") ?? undefined

  if (mode === "teacher") {
    const auth = requireTeacher(req)
    if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
    return NextResponse.json(listTests())
  }

  return NextResponse.json(listAvailableTestsForStudent(groupId))
}

export const POST = async (req: NextRequest) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })

  const input = (await req.json()) as Omit<TrueFalseTest, "id" | "createdAt" | "updatedAt">
  const created = createTest(input)
  return NextResponse.json(created, { status: 201 })
}

