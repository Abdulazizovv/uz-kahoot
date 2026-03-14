"use client"

import Button from "@/components/Button"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Loader from "@/components/Loader"
import { groupsService, StudentGroup } from "@/services/api/groups.service"
import { useAuthStore } from "@/stores/auth"
import { apiGet } from "@/lib/async-api"
import { GroupQuizStats, QuizAttemptSummary, QuizKind, QuizTestStats } from "@eduarena/common/types/stats"
import { Donut, HorizontalBarList, LineChart } from "@/components/stats/Charts"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const kindLabel: Record<QuizKind, string> = {
  truefalse: "🧩 True/False",
  matching: "🧠 Moslashtirish",
  kahoot: "🎮 Kahoot",
}

const pct = (score: number, total: number) =>
  total > 0 ? Math.round((score / total) * 1000) / 10 : 0

type AttemptsResponse = {
  kind: QuizKind
  testId: string
  groupId?: string
  from?: string
  to?: string
  total: number
  offset: number
  limit: number
  items: QuizAttemptSummary[]
}

export default function TeacherStatsPage() {
  const { user, accessToken, isHydrated } = useAuthStore()
  const isTeacher = Boolean(accessToken && user?.user_type === "teacher")

  const teacherHeaders = useMemo(() => {
    if (!accessToken || user?.user_type !== "teacher") {
      return null
    }
    return {
      authorization: `Bearer ${accessToken}`,
      "x-user-type": "teacher",
    }
  }, [accessToken, user?.user_type])

  const [groups, setGroups] = useState<StudentGroup[]>([])
  const [groupsLoading, setGroupsLoading] = useState(true)

  const [groupId, setGroupId] = useState<string>("")
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")

  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<GroupQuizStats | null>(null)
  const [testStats, setTestStats] = useState<QuizTestStats | null>(null)
  const [tab, setTab] = useState<"group" | "compare">("group")

  const [attempts, setAttempts] = useState<QuizAttemptSummary[]>([])
  const [attemptsTotal, setAttemptsTotal] = useState(0)
  const [attemptsOffset, setAttemptsOffset] = useState(0)
  const [attemptsLoading, setAttemptsLoading] = useState(false)
  const [attemptsQuery, setAttemptsQuery] = useState("")

  const [compareGroupIds, setCompareGroupIds] = useState<string[]>([])
  const [compareLoading, setCompareLoading] = useState(false)
  const [compareStats, setCompareStats] = useState<Record<string, GroupQuizStats>>({})

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await groupsService.getAll()
        if (mounted) {
          setGroups(list)
          if (list[0]?.id) setGroupId(list[0].id)
          if (list.slice(0, 2).every((g) => g.id)) {
            setCompareGroupIds(list.slice(0, 2).map((g) => g.id))
          }
        }
      } catch (e) {
        console.error(e)
        toast.error("Guruhlarni yuklashda xatolik")
      } finally {
        if (mounted) setGroupsLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const selectedGroupName = useMemo(
    () => groups.find((g) => g.id === groupId)?.name ?? "",
    [groups, groupId],
  )

  const fetchStats = () => {
    if (!teacherHeaders) return
    if (!groupId) {
      toast.error("Guruh tanlang")
      return
    }
    setLoading(true)
    setStats(null)
    setTestStats(null)
    ;(async () => {
      try {
        const params = new URLSearchParams({
          groupId,
          ...(from ? { from: new Date(from).toISOString() } : {}),
          ...(to ? { to: new Date(to).toISOString() } : {}),
        })
        const payload = await apiGet<GroupQuizStats>(`/api/async/stats/group?${params.toString()}`, {
          headers: teacherHeaders,
        })
        setStats(payload)
        setTestStats(null)
        setAttempts([])
        setAttemptsTotal(0)
        setAttemptsOffset(0)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      } finally {
        setLoading(false)
      }
    })()
  }

  const fetchAttempts = async (payload: {
    kind: QuizKind
    testId: string
    offset: number
    append: boolean
  }) => {
    if (!teacherHeaders) return
    setAttemptsLoading(true)
    try {
      const params = new URLSearchParams({
        kind: payload.kind,
        testId: payload.testId,
        ...(groupId ? { groupId } : {}),
        ...(from ? { from: new Date(from).toISOString() } : {}),
        ...(to ? { to: new Date(to).toISOString() } : {}),
        limit: "100",
        offset: String(payload.offset),
      })
      const res = await apiGet<AttemptsResponse>(`/api/async/stats/attempts?${params.toString()}`, {
        headers: teacherHeaders,
      })
      setAttemptsTotal(res.total)
      setAttemptsOffset(res.offset + res.items.length)
      setAttempts((prev) => (payload.append ? [...prev, ...res.items] : res.items))
    } catch (e) {
      console.error(e)
      toast.error((e as Error).message)
    } finally {
      setAttemptsLoading(false)
    }
  }

  const openTest = (kind: QuizKind, testId: string) => {
    ;(async () => {
      try {
        if (!teacherHeaders) return
        const params = new URLSearchParams({
          kind,
          testId,
        })
        const payload = await apiGet<QuizTestStats>(`/api/async/stats/test?${params.toString()}`, {
          headers: teacherHeaders,
        })
        setTestStats(payload)
        setAttempts([])
        setAttemptsTotal(0)
        setAttemptsOffset(0)
        await fetchAttempts({ kind, testId, offset: 0, append: false })
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  const fetchCompare = () => {
    if (!teacherHeaders) return
    if (compareGroupIds.length < 2) {
      toast.error("Kamida 2 ta guruh tanlang")
      return
    }
    setCompareLoading(true)
    setCompareStats({})
    ;(async () => {
      try {
        const results = await Promise.all(
          compareGroupIds.map(async (gid) => {
            const params = new URLSearchParams({
              groupId: gid,
              ...(from ? { from: new Date(from).toISOString() } : {}),
              ...(to ? { to: new Date(to).toISOString() } : {}),
            })
            const payload = await apiGet<GroupQuizStats>(`/api/async/stats/group?${params.toString()}`, {
              headers: teacherHeaders,
            })
            return [gid, payload] as const
          }),
        )
        setCompareStats(Object.fromEntries(results))
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      } finally {
        setCompareLoading(false)
      }
    })()
  }

  const selectedKindBreakdown = useMemo(() => {
    if (!stats) return null
    return [
      { label: "True/False", value: stats.byKind.truefalse.attempts, color: "#059669" },
      { label: "Matching", value: stats.byKind.matching.attempts, color: "#7c3aed" },
      { label: "Kahoot", value: stats.byKind.kahoot.attempts, color: "#0ea5e9" },
    ]
  }, [stats])

  const recentScoreLine = useMemo(() => {
    if (!stats) return []
    const items = stats.recentAttempts
      .slice()
      .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
      .map((a) => ({
        x: new Date(a.submittedAt).getTime(),
        y: pct(a.score, a.total),
      }))
    return items
  }, [stats])

  const attemptsFiltered = useMemo(() => {
    const q = attemptsQuery.trim().toLowerCase()
    if (!q) return attempts
    return attempts.filter((a) => a.studentName.toLowerCase().includes(q))
  }, [attempts, attemptsQuery])

  const compareList = useMemo(() => {
    const palette = ["#0ea5e9", "#7c3aed", "#059669", "#f59e0b", "#ef4444", "#14b8a6"]
    const list = compareGroupIds
      .map((gid, idx) => {
        const s = compareStats[gid]
        const label = groups.find((g) => g.id === gid)?.name ?? gid
        return {
          gid,
          label,
          color: palette[idx % palette.length],
          stats: s,
        }
      })
      .filter((x) => Boolean(x.stats))
      .map((x) => ({ ...x, stats: x.stats as GroupQuizStats }))
    return list
  }, [compareGroupIds, compareStats, groups])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Statistika</h1>
              <p className="mt-1 text-slate-600">
                Guruh bo&apos;yicha natijalarni tushunarli ko&apos;rinishda tahlil qiling.
              </p>
            </div>
            <Link
              href="/teacher/quizzes"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span aria-hidden="true">←</span> Orqaga
            </Link>
          </div>

          {!isTeacher ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Ruxsat</h2>
              <p className="mt-1 text-sm text-slate-600">
                Bu sahifa faqat o&apos;qituvchilar uchun.
              </p>
              {!isHydrated ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Loader /> Yuklanmoqda...
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-700">
                  Iltimos, o&apos;qituvchi sifatida tizimga kiring.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTab("group")}
                  className={clsx(
                    "rounded-2xl border px-4 py-2 text-sm font-semibold shadow-sm transition",
                    tab === "group"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  Guruh statistikasi
                </button>
                <button
                  type="button"
                  onClick={() => setTab("compare")}
                  className={clsx(
                    "rounded-2xl border px-4 py-2 text-sm font-semibold shadow-sm transition",
                    tab === "compare"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  Guruhlarni solishtirish
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">Filtrlar</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Sana oralig&apos;ini tanlang (hamma bo&apos;limlar uchun).
                  </p>

                  <div className="mt-4 space-y-3">
                    {tab === "group" && (
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Guruh
                      </label>
                      {groupsLoading ? (
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                          <Loader /> Yuklanmoqda...
                        </div>
                      ) : (
                        <select
                          value={groupId}
                          onChange={(e) => setGroupId(e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                        >
                          {groups.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    )}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">
                          From
                        </label>
                        <input
                          type="date"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">
                          To
                        </label>
                        <input
                          type="date"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                        />
                      </div>
                    </div>

                    {tab === "group" ? (
                      <Button
                        className={clsx(
                          "w-full bg-slate-900 text-white hover:bg-slate-800",
                          loading && "opacity-70",
                        )}
                        onClick={fetchStats}
                        disabled={loading || !groupId}
                      >
                        {loading ? "Yuklanmoqda..." : "Ko'rsatish"}
                      </Button>
                    ) : (
                      <>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <p className="text-xs font-semibold text-slate-600">
                            Guruhlar (kamida 2 ta)
                          </p>
                          {groupsLoading ? (
                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                              <Loader /> Yuklanmoqda...
                            </div>
                          ) : (
                            <div className="mt-2 max-h-56 space-y-2 overflow-auto pr-1">
                              {groups.map((g) => {
                                const checked = compareGroupIds.includes(g.id)
                                return (
                                  <label key={g.id} className="flex items-center gap-2 text-sm text-slate-700">
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={(e) => {
                                        setCompareGroupIds((prev) => {
                                          if (e.target.checked) return Array.from(new Set([...prev, g.id]))
                                          return prev.filter((x) => x !== g.id)
                                        })
                                      }}
                                      className="h-4 w-4 rounded border-slate-300 text-slate-900"
                                    />
                                    <span className="min-w-0 truncate">{g.name}</span>
                                  </label>
                                )
                              })}
                            </div>
                          )}
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              onClick={() => setCompareGroupIds(groups.map((g) => g.id))}
                              disabled={groupsLoading}
                            >
                              Hammasi
                            </button>
                            <button
                              type="button"
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                              onClick={() => setCompareGroupIds([])}
                              disabled={groupsLoading}
                            >
                              Tozalash
                            </button>
                          </div>
                        </div>

                        <Button
                          className={clsx(
                            "w-full bg-slate-900 text-white hover:bg-slate-800",
                            compareLoading && "opacity-70",
                          )}
                          onClick={fetchCompare}
                          disabled={compareLoading || compareGroupIds.length < 2}
                        >
                          {compareLoading ? "Yuklanmoqda..." : "Solishtirish"}
                        </Button>
                      </>
                    )}
                    {!teacherHeaders && (
                      <p className="text-xs text-slate-500">
                        Token topilmadi.
                      </p>
                    )}
                  </div>
                </div>

                {tab === "group" && testStats && (
                  <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-bold text-slate-900">
                          {testStats.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">
                          {kindLabel[testStats.kind]} • Urinishlar: {testStats.attempts} • O&apos;rtacha:{" "}
                          {testStats.avgScorePct}%
                        </p>
                      </div>
                      <button
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        onClick={() => setTestStats(null)}
                      >
                        Yopish
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-600">Best</p>
                        <p className="mt-1 text-2xl font-extrabold text-slate-900">
                          {testStats.bestScorePct}%
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-600">Avg</p>
                        <p className="mt-1 text-2xl font-extrabold text-slate-900">
                          {testStats.avgScorePct}%
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-600">Worst</p>
                        <p className="mt-1 text-2xl font-extrabold text-slate-900">
                          {testStats.worstScorePct}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-600">
                        So&apos;nggi urinishlar trendi (score %)
                      </p>
                      <div className="mt-2">
                        <LineChart
                          points={testStats.recentAttempts
                            .slice()
                            .sort(
                              (a, b) =>
                                new Date(a.submittedAt).getTime() -
                                new Date(b.submittedAt).getTime(),
                            )
                            .map((a) => ({
                              x: new Date(a.submittedAt).getTime(),
                              y: pct(a.score, a.total),
                            }))}
                          stroke="#7c3aed"
                        />
                      </div>
                    </div>

                    {testStats.itemStats && testStats.itemStats.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {testStats.itemStats.slice(0, 12).map((i) => (
                          <div key={i.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                                {i.label}
                              </p>
                              <p className="text-sm font-bold text-slate-900">{i.correctPct}%</p>
                            </div>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                              <div
                                className="h-full rounded-full bg-emerald-600"
                                style={{ width: `${i.correctPct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        {testStats.itemStats.length > 12 && (
                          <p className="text-xs text-slate-500">
                            +{testStats.itemStats.length - 12} ta item
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Talabalar natijalari
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            Jami: {attemptsTotal}. Guruh:{" "}
                            <span className="font-semibold">{selectedGroupName || groupId}</span>
                          </p>
                        </div>
                        <input
                          value={attemptsQuery}
                          onChange={(e) => setAttemptsQuery(e.target.value)}
                          placeholder="Talaba ismi..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 sm:w-56"
                        />
                      </div>

                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="text-left text-xs font-semibold text-slate-500">
                              <th className="py-2 pr-4">Talaba</th>
                              <th className="py-2 pr-4">Ball</th>
                              <th className="py-2 pr-4">%</th>
                              <th className="py-2 pr-4">Vaqt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {attemptsFiltered.slice(0, 100).map((a) => (
                              <tr key={`${a.studentUserId ?? a.studentName}:${a.submittedAt}`}>
                                <td className="py-2 pr-4">
                                  <p className="max-w-[260px] truncate font-semibold text-slate-900">
                                    {a.studentName}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {kindLabel[a.kind]}
                                  </p>
                                </td>
                                <td className="py-2 pr-4 font-mono text-slate-900">
                                  {a.score}/{a.total}
                                </td>
                                <td className="py-2 pr-4 font-bold text-slate-900">
                                  {pct(a.score, a.total)}%
                                </td>
                                <td className="py-2 pr-4 text-slate-600">
                                  {new Date(a.submittedAt).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          Ko&apos;rsatilmoqda:{" "}
                          {Math.min(attemptsFiltered.length, 100)} /{" "}
                          {attemptsFiltered.length} (qidiruv natijasi)
                        </p>
                        <button
                          type="button"
                          disabled={
                            attemptsLoading ||
                            !testStats ||
                            attemptsOffset >= attemptsTotal
                          }
                          onClick={() =>
                            testStats
                              ? fetchAttempts({
                                  kind: testStats.kind,
                                  testId: testStats.testId,
                                  offset: attemptsOffset,
                                  append: true,
                                })
                              : null
                          }
                          className={clsx(
                            "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                            (attemptsLoading || attemptsOffset >= attemptsTotal) &&
                              "cursor-not-allowed opacity-60",
                          )}
                        >
                          {attemptsLoading ? "Yuklanmoqda..." : "Ko'proq yuklash"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-3">
                {tab === "compare" ? (
                  <div className="space-y-4">
                    {compareList.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
                        Guruhlarni tanlab, &quot;Solishtirish&quot; ni bosing.
                      </div>
                    ) : (
                      <>
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                          <h2 className="text-lg font-bold text-slate-900">
                            Guruhlar bo&apos;yicha taqqoslash
                          </h2>
                          <p className="mt-1 text-sm text-slate-600">
                            O&apos;rtacha ball va urinishlar soni.
                          </p>

                          <div className="mt-4 grid gap-4 lg:grid-cols-2">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-sm font-semibold text-slate-900">
                                O&apos;rtacha ball (%)
                              </p>
                              <div className="mt-3">
                                <HorizontalBarList
                                  max={100}
                                  data={compareList
                                    .slice()
                                    .sort((a, b) => b.stats.avgScorePct - a.stats.avgScorePct)
                                    .map((g) => ({
                                      label: g.label,
                                      value: g.stats.avgScorePct,
                                      hint: `${g.stats.avgScorePct}%`,
                                      color: g.color,
                                    }))}
                                />
                              </div>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-sm font-semibold text-slate-900">
                                Urinishlar soni
                              </p>
                              <div className="mt-3">
                                <HorizontalBarList
                                  data={compareList
                                    .slice()
                                    .sort((a, b) => b.stats.attempts - a.stats.attempts)
                                    .map((g) => ({
                                      label: g.label,
                                      value: g.stats.attempts,
                                      hint: `${g.stats.attempts}`,
                                      color: g.color,
                                    }))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                          <h3 className="text-base font-bold text-slate-900">
                            Tafsilot (bo&apos;limlar bo&apos;yicha)
                          </h3>
                          <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr className="text-left text-xs font-semibold text-slate-500">
                                  <th className="py-2 pr-4">Guruh</th>
                                  <th className="py-2 pr-4">Attempts</th>
                                  <th className="py-2 pr-4">Avg</th>
                                  <th className="py-2 pr-4">🧩</th>
                                  <th className="py-2 pr-4">🧠</th>
                                  <th className="py-2 pr-4">🎮</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {compareList.map((g) => (
                                  <tr key={g.gid}>
                                    <td className="py-2 pr-4">
                                      <span className="font-semibold text-slate-900">
                                        {g.label}
                                      </span>
                                    </td>
                                    <td className="py-2 pr-4 font-mono text-slate-900">
                                      {g.stats.attempts}
                                    </td>
                                    <td className="py-2 pr-4 font-bold text-slate-900">
                                      {g.stats.avgScorePct}%
                                    </td>
                                    <td className="py-2 pr-4 text-slate-700">
                                      {g.stats.byKind.truefalse.attempts} •{" "}
                                      {g.stats.byKind.truefalse.avgScorePct}%
                                    </td>
                                    <td className="py-2 pr-4 text-slate-700">
                                      {g.stats.byKind.matching.attempts} •{" "}
                                      {g.stats.byKind.matching.avgScorePct}%
                                    </td>
                                    <td className="py-2 pr-4 text-slate-700">
                                      {g.stats.byKind.kahoot.attempts} •{" "}
                                      {g.stats.byKind.kahoot.avgScorePct}%
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : !stats ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
                    Guruh tanlab, statistika chiqarishni bosing.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-slate-900">
                            {selectedGroupName || stats.groupId}
                          </h2>
                          <p className="mt-1 text-sm text-slate-600">
                            Urinishlar: {stats.attempts} • Talabalar:{" "}
                            {stats.uniqueStudents} • O&apos;rtacha: {stats.avgScorePct}%
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                            🧩 {stats.byKind.truefalse.attempts}
                          </span>
                          <span className="rounded-2xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
                            🧠 {stats.byKind.matching.attempts}
                          </span>
                          <span className="rounded-2xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">
                            🎮 {stats.byKind.kahoot.attempts}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-base font-bold text-slate-900">
                          Bo&apos;limlar ulushi
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Urinishlar soni bo&apos;yicha.
                        </p>
                        <div className="mt-4">
                          {selectedKindBreakdown ? (
                            <Donut parts={selectedKindBreakdown} />
                          ) : (
                            <p className="text-sm text-slate-600">Ma&apos;lumot yo&apos;q.</p>
                          )}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-base font-bold text-slate-900">
                          So&apos;nggi urinishlar trendi
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Yakunlangan urinishlar bo&apos;yicha score %.
                        </p>
                        <div className="mt-4">
                          <LineChart points={recentScoreLine} stroke="#0ea5e9" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-bold text-slate-900">Top talabalar</h3>
                      <div className="mt-3 space-y-2">
                        {stats.topStudents.length === 0 ? (
                          <p className="text-sm text-slate-600">Ma&apos;lumot yo&apos;q.</p>
                        ) : (
                          stats.topStudents.map((s) => (
                            <div key={(s.studentUserId ?? s.studentName) + s.attempts} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                              <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                                {s.studentName}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="rounded-xl bg-white px-2 py-1 font-semibold text-slate-700">
                                  {s.attempts}x
                                </span>
                                <span className="rounded-xl bg-white px-2 py-1 font-bold text-slate-900">
                                  {s.avgScorePct}%
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-bold text-slate-900">Testlar</h3>
                      <div className="mt-3 space-y-2">
                        {stats.tests.length === 0 ? (
                          <p className="text-sm text-slate-600">Ma&apos;lumot yo&apos;q.</p>
                        ) : (
                          stats.tests.slice(0, 25).map((t) => (
                            <button
                              key={`${t.kind}:${t.testId}`}
                              onClick={() => openTest(t.kind, t.testId)}
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-slate-900">
                                    {t.title}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-600">
                                    {kindLabel[t.kind]} • Urinishlar: {t.attempts} • Talabalar:{" "}
                                    {t.uniqueStudents}
                                  </p>
                                </div>
                                <div className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-bold text-slate-900">
                                  {t.avgScorePct}%
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-base font-bold text-slate-900">So&apos;nggi urinishlar</h3>
                      <div className="mt-3 space-y-2">
                        {stats.recentAttempts.length === 0 ? (
                          <p className="text-sm text-slate-600">Ma&apos;lumot yo&apos;q.</p>
                        ) : (
                          stats.recentAttempts.map((a) => (
                            <div key={`${a.kind}:${a.testId}:${a.submittedAt}:${a.studentName}`} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {a.studentName}
                                </p>
                                <p className="mt-1 text-xs text-slate-600">
                                  {kindLabel[a.kind]} • {a.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {new Date(a.submittedAt).toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-xl bg-white px-3 py-1 text-sm font-bold text-slate-900">
                                {a.total ? Math.round((a.score / a.total) * 100) : 0}%
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
