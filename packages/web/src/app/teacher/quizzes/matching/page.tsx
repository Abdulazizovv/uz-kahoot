"use client"

import Button from "@/components/Button"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Loader from "@/components/Loader"
import { groupsService, StudentGroup } from "@/services/api/groups.service"
import { useAuthStore } from "@/stores/auth"
import { apiGet, apiSend } from "@/lib/async-api"
import {
  MatchingAttempt,
  MatchingTest,
  MatchingTestSummary,
} from "@eduarena/common/types/matching"
import { QuizTestStats } from "@eduarena/common/types/stats"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { v7 as uuid } from "uuid"

type DraftPair = {
  pairId: string
  leftId: string
  rightId: string
  leftText: string
  leftImage: string
  rightText: string
  rightImage: string
}

const toDatetimeLocal = (iso: string) => {
  const d = new Date(iso)
  const tz = d.getTimezoneOffset() * 60_000
  return new Date(d.getTime() - tz).toISOString().slice(0, 16)
}

export default function TeacherMatchingPage() {
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

  const [tests, setTests] = useState<MatchingTestSummary[]>([])
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<MatchingAttempt[]>([])
  const [loadingTests, setLoadingTests] = useState(false)

  const [stats, setStats] = useState<QuizTestStats | null>(null)
  const [statsOpen, setStatsOpen] = useState(false)

  const [isCreating, setIsCreating] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [editingTest, setEditingTest] = useState<MatchingTest | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [groupIds, setGroupIds] = useState<string[]>([])
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [pairs, setPairs] = useState<DraftPair[]>([
    {
      pairId: uuid(),
      leftId: uuid(),
      rightId: uuid(),
      leftText: "",
      leftImage: "",
      rightText: "",
      rightImage: "",
    },
  ])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await groupsService.getAll()
        if (mounted) setGroups(list)
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

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!isHydrated) return
      if (!teacherHeaders) return
      setLoadingTests(true)
      try {
        const list = await apiGet<MatchingTestSummary[]>(
          "/api/async/matching/tests?mode=teacher",
          { headers: teacherHeaders },
        )
        if (mounted) setTests(list)
      } catch (e) {
        console.error(e)
        toast.error("Testlarni yuklashda xatolik")
      } finally {
        if (mounted) setLoadingTests(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [isHydrated, teacherHeaders])

  const selectedTest = useMemo(
    () => tests.find((t) => t.id === selectedTestId) ?? null,
    [tests, selectedTestId],
  )

  const reloadTests = async () => {
    if (!teacherHeaders) return
    const list = await apiGet<MatchingTestSummary[]>(
      "/api/async/matching/tests?mode=teacher",
      { headers: teacherHeaders },
    )
    setTests(list)
  }

  const toggleGroup = (id: string) => {
    setGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const addPair = () => {
    setPairs((prev) => [
      ...prev,
      {
        pairId: uuid(),
        leftId: uuid(),
        rightId: uuid(),
        leftText: "",
        leftImage: "",
        rightText: "",
        rightImage: "",
      },
    ])
  }

  const removePair = (pairId: string) => {
    setPairs((prev) =>
      prev.length > 1 ? prev.filter((p) => p.pairId !== pairId) : prev,
    )
  }

  const updatePair = (pairId: string, patch: Partial<DraftPair>) => {
    setPairs((prev) =>
      prev.map((p) => (p.pairId === pairId ? { ...p, ...patch } : p)),
    )
  }

  const movePair = (pairId: string, dir: -1 | 1) => {
    setPairs((prev) => {
      const idx = prev.findIndex((p) => p.pairId === pairId)
      if (idx < 0) return prev
      const nextIdx = idx + dir
      if (nextIdx < 0 || nextIdx >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[nextIdx]] = [next[nextIdx], next[idx]]
      return next
    })
  }

  const resetDraft = () => {
    setModalMode("create")
    setEditingTest(null)
    setTitle("")
    setDescription("")
    setGroupIds([])
    setStartAt("")
    setEndAt("")
    setPairs([
      {
        pairId: uuid(),
        leftId: uuid(),
        rightId: uuid(),
        leftText: "",
        leftImage: "",
        rightText: "",
        rightImage: "",
      },
    ])
  }

  const openCreate = () => {
    resetDraft()
    setModalMode("create")
    setIsCreating(true)
  }

  const openEdit = (testId: string) => {
    if (!teacherHeaders) return
    ;(async () => {
      try {
        const test = await apiGet<MatchingTest>(
          `/api/async/matching/tests/${encodeURIComponent(testId)}?mode=teacher`,
          { headers: teacherHeaders },
        )
        setModalMode("edit")
        setEditingTest(test)
        setTitle(test.title ?? "")
        setDescription(test.description ?? "")
        setGroupIds(test.groupIds ?? [])
        setStartAt(toDatetimeLocal(test.startAt))
        setEndAt(toDatetimeLocal(test.endAt))
        setPairs(
          (test.pairs ?? []).map((p) => ({
            pairId: p.id,
            leftId: p.left.id,
            rightId: p.right.id,
            leftText: p.left.text ?? "",
            leftImage: p.left.image ?? "",
            rightText: p.right.text ?? "",
            rightImage: p.right.image ?? "",
          })),
        )
        setIsCreating(true)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  const handleSave = () => {
    if (!teacherHeaders) return
    if (!title.trim()) {
      toast.error("Sarlavha kiriting")
      return
    }
    if (!startAt || !endAt) {
      toast.error("Boshlanish va tugash vaqtini belgilang")
      return
    }
    const startIso = new Date(startAt).toISOString()
    const endIso = new Date(endAt).toISOString()
    if (new Date(startIso).getTime() >= new Date(endIso).getTime()) {
      toast.error("Tugash vaqti boshlanishdan keyin bo'lishi kerak")
      return
    }
    if (groupIds.length === 0) {
      toast.error("Kamida bitta guruh tanlang")
      return
    }

    const cleaned = pairs
      .map((p) => ({
        id: p.pairId,
        left: {
          id: p.leftId,
          text: p.leftText.trim() || undefined,
          image: p.leftImage.trim() || undefined,
        },
        right: {
          id: p.rightId,
          text: p.rightText.trim() || undefined,
          image: p.rightImage.trim() || undefined,
        },
      }))
      .filter((p) => Boolean(p.left.text || p.left.image) && Boolean(p.right.text || p.right.image))

    if (cleaned.length === 0) {
      toast.error("Kamida bitta juftlik kiriting")
      return
    }

    ;(async () => {
      try {
        if (modalMode === "create") {
          const payload: Omit<MatchingTest, "id" | "createdAt" | "updatedAt"> = {
            title: title.trim(),
            description: description.trim() || undefined,
            groupIds,
            startAt: startIso,
            endAt: endIso,
            pairs: cleaned,
          }
          await apiSend<MatchingTest>("/api/async/matching/tests", "POST", payload, {
            headers: teacherHeaders,
          })
          toast.success("Test yaratildi")
        } else {
          if (!editingTest) {
            toast.error("Tahrirlash uchun test topilmadi")
            return
          }
          const payload: MatchingTest = {
            ...editingTest,
            title: title.trim(),
            description: description.trim() || undefined,
            groupIds,
            startAt: startIso,
            endAt: endIso,
            pairs: cleaned,
          }
          await apiSend<MatchingTest>(
            `/api/async/matching/tests/${encodeURIComponent(editingTest.id)}`,
            "PUT",
            payload,
            { headers: teacherHeaders },
          )
          toast.success("Test yangilandi")
        }

        await reloadTests()
        setIsCreating(false)
        resetDraft()
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  const handleDelete = (testId: string) => {
    if (!teacherHeaders) return
    const found = tests.find((t) => t.id === testId)
    const ok = window.confirm(
      `Test o'chirilsinmi?\n\n${found?.title ?? testId}\n\nEslatma: test natijalari ham o'chiriladi.`,
    )
    if (!ok) return
    ;(async () => {
      try {
        await apiSend<{ ok: true }>(
          `/api/async/matching/tests/${encodeURIComponent(testId)}`,
          "DELETE",
          undefined,
          { headers: teacherHeaders },
        )
        if (selectedTestId === testId) {
          setSelectedTestId(null)
          setAttempts([])
          setStats(null)
          setStatsOpen(false)
        }
        await reloadTests()
        toast.success("Test o'chirildi")
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  const openResults = (testId: string) => {
    setSelectedTestId(testId)
    ;(async () => {
      try {
        if (!teacherHeaders) return
        const list = await apiGet<MatchingAttempt[]>(
          `/api/async/matching/results/${testId}`,
          { headers: teacherHeaders },
        )
        setAttempts(list)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  const openStats = (testId: string) => {
    ;(async () => {
      try {
        if (!teacherHeaders) return
        const payload = await apiGet<QuizTestStats>(
          `/api/async/stats/test?kind=matching&testId=${encodeURIComponent(testId)}`,
          { headers: teacherHeaders },
        )
        setStats(payload)
        setStatsOpen(true)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Moslashtirish testlar
              </h1>
              <p className="mt-1 text-slate-600">
                Chapda rasm/matn, o&apos;ngda javoblar: natijalar JSON faylda saqlanadi.
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
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">Testlar</h2>
                    <Button
                      className="w-auto bg-slate-900 text-white hover:bg-slate-800"
                      onClick={openCreate}
                    >
                      + Yangi test
                    </Button>
                  </div>

                  {loadingTests && (
                    <p className="mt-3 text-sm text-slate-600">Yuklanmoqda...</p>
                  )}

                  <div className="mt-4 space-y-3">
                    {tests.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-600">
                        Hozircha test yo&apos;q.
                      </div>
                    ) : (
                      tests.map((t) => (
                        <div
                          key={t.id}
                          className={clsx(
                            "rounded-2xl border p-4 transition",
                            selectedTestId === t.id
                              ? "border-slate-900 bg-slate-50"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          )}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-base font-bold text-slate-900">
                                {t.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                Juftliklar: {t.pairsCount} • Tugaydi:{" "}
                                {new Date(t.endAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                onClick={() => openResults(t.id)}
                              >
                                Natijalar
                              </button>
                              <button
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                onClick={() => openStats(t.id)}
                              >
                                Statistika
                              </button>
                              <button
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                onClick={() => openEdit(t.id)}
                              >
                                Tahrirlash
                              </button>
                              <button
                                className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
                                onClick={() => handleDelete(t.id)}
                              >
                                O&apos;chirish
                              </button>
                            </div>
                          </div>
                          {t.description && (
                            <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                              {t.description}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">Natijalar</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {selectedTest ? selectedTest.title : "Test tanlang"}
                  </p>

                  {selectedTestId ? (
                    <div className="mt-4 space-y-3">
                      {attempts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                          Hozircha natija yo&apos;q.
                        </div>
                      ) : (
                        attempts.slice(0, 15).map((a) => (
                          <div
                            key={a.id}
                            className="rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {a.studentName}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {new Date(a.submittedAt).toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-bold text-slate-900">
                                {a.score}/{a.total}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                      Chapdan test tanlang.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isCreating && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
              <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {modalMode === "create"
                        ? "Yangi moslashtirish test"
                        : "Moslashtirish testni tahrirlash"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Kamida 1 juftlik kiriting.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreating(false)
                      resetDraft()
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Yopish
                  </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Sarlavha
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                        placeholder="Masalan: Fizika - moslashtirish"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Tavsif (ixtiyoriy)
                      </label>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                        placeholder="Qisqa izoh"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Boshlanish
                      </label>
                      <input
                        type="datetime-local"
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600">
                        Tugash
                      </label>
                      <input
                        type="datetime-local"
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold text-slate-600">Guruhlar</p>
                    {groupsLoading ? (
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <Loader /> Yuklanmoqda...
                      </div>
                    ) : (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {groups.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => toggleGroup(g.id)}
                            className={clsx(
                              "rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                              groupIds.includes(g.id)
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                            )}
                          >
                            {g.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        Juftliklar
                      </h4>
                      <button
                        type="button"
                        onClick={addPair}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        + Qo&apos;shish
                      </button>
                    </div>

                    <div className="mt-3 space-y-3">
                      {pairs.map((p, idx) => (
                        <div
                          key={p.pairId}
                          className="rounded-3xl border border-slate-200 bg-white p-4"
                        >
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold text-slate-600">
                              Juftlik #{idx + 1}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => movePair(p.pairId, -1)}
                                disabled={idx === 0}
                                className={clsx(
                                  "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50",
                                  idx === 0 && "cursor-not-allowed opacity-50",
                                )}
                                aria-label="Yuqoriga"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => movePair(p.pairId, 1)}
                                disabled={idx === pairs.length - 1}
                                className={clsx(
                                  "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50",
                                  idx === pairs.length - 1 &&
                                    "cursor-not-allowed opacity-50",
                                )}
                                aria-label="Pastga"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                onClick={() => removePair(p.pairId)}
                                className={clsx(
                                  "rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition",
                                  pairs.length <= 1
                                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-400"
                                    : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
                                )}
                                disabled={pairs.length <= 1}
                              >
                                O&apos;chirish
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                              <p className="text-xs font-bold text-slate-900">Chap (savol)</p>
                              <input
                                value={p.leftText}
                                onChange={(e) =>
                                  updatePair(p.pairId, { leftText: e.target.value })
                                }
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                                placeholder="Matn (ixtiyoriy)"
                              />
                              <input
                                value={p.leftImage}
                                onChange={(e) =>
                                  updatePair(p.pairId, { leftImage: e.target.value })
                                }
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                                placeholder="Rasm URL (ixtiyoriy)"
                              />
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                              <p className="text-xs font-bold text-slate-900">O&apos;ng (javob)</p>
                              <input
                                value={p.rightText}
                                onChange={(e) =>
                                  updatePair(p.pairId, { rightText: e.target.value })
                                }
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                                placeholder="Matn (ixtiyoriy)"
                              />
                              <input
                                value={p.rightImage}
                                onChange={(e) =>
                                  updatePair(p.pairId, { rightImage: e.target.value })
                                }
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                                placeholder="Rasm URL (ixtiyoriy)"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-5">
                  <button
                    type="button"
                    onClick={resetDraft}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Tozalash
                  </button>
                  <Button
                    className="w-auto bg-slate-900 text-white hover:bg-slate-800"
                    onClick={handleSave}
                  >
                    {modalMode === "create" ? "Yaratish" : "Saqlash"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {statsOpen && stats && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
              <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Statistika</h3>
                    <p className="mt-1 text-sm text-slate-600">{stats.title}</p>
                  </div>
                  <button
                    onClick={() => setStatsOpen(false)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Yopish
                  </button>
                </div>
                <div className="max-h-[75vh] overflow-y-auto p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-600">Urinishlar</p>
                      <p className="mt-1 text-2xl font-extrabold text-slate-900">{stats.attempts}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-600">O&apos;rtacha</p>
                      <p className="mt-1 text-2xl font-extrabold text-slate-900">{stats.avgScorePct}%</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-600">Talabalar</p>
                      <p className="mt-1 text-2xl font-extrabold text-slate-900">{stats.uniqueStudents}</p>
                    </div>
                  </div>

                  {stats.itemStats && stats.itemStats.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-bold text-slate-900">Item bo&apos;yicha</h4>
                      <div className="mt-3 space-y-2">
                        {stats.itemStats.slice(0, 25).map((i) => (
                          <div key={i.id} className="rounded-2xl border border-slate-200 bg-white p-3">
                            <div className="flex items-start justify-between gap-3">
                              <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                                {i.label}
                              </p>
                              <p className="text-sm font-bold text-slate-900">{i.correctPct}%</p>
                            </div>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-emerald-600"
                                style={{ width: `${i.correctPct}%` }}
                              />
                            </div>
                          </div>
                        ))}
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
