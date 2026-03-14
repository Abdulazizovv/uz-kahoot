import { NextRequest, NextResponse } from "next/server"
import { requireTeacher } from "@/app/api/async/_auth"
import { getMatchingResults } from "@/server/async/matching-store"

export const runtime = "nodejs"

export const GET = async (req: NextRequest, ctx: { params: Promise<{ testId: string }> }) => {
  const auth = requireTeacher(req)
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: 401 })
  const { testId } = await ctx.params
  return NextResponse.json(getMatchingResults(testId))
}
