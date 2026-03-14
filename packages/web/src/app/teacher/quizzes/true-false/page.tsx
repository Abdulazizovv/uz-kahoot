"use client"

import Button from "@/components/Button"
import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Loader from "@/components/Loader"
import { groupsService, StudentGroup } from "@/services/api/groups.service"
import { useAuthStore } from "@/stores/auth"
import { apiGet, apiSend } from "@/lib/async-api"
import {
  TrueFalseAttempt,
  TrueFalseTest,
  TrueFalseTestSummary,
} from "@eduarena/common/types/truefalse"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { v7 as uuid } from "uuid"

type DraftQuestion = {
  id: string
  statement: string
  correct: boolean
  image?: string
}

const toDatetimeLocal = (iso: string) => {
  const d = new Date(iso)
  const tz = d.getTimezoneOffset() * 60_000
  return new Date(d.getTime() - tz).toISOString().slice(0, 16)
}

export default function TeacherTrueFalsePage() {
  const { user, accessToken, isHydrated } = useAuthStore()
  const isTeacher = Boolean(accessToken && user?.user_type === "teacher")

  const [tests, setTests] = useState<TrueFalseTestSummary[]>([])
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<TrueFalseAttempt[]>([])
  const [loadingTests, setLoadingTests] = useState(false)

  const [groups, setGroups] = useState<StudentGroup[]>([])
  const [groupsLoading, setGroupsLoading] = useState(true)

  const [isCreating, setIsCreating] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [editingTest, setEditingTest] = useState<TrueFalseTest | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [groupIds, setGroupIds] = useState<string[]>([])
  const [telegramChatId, setTelegramChatId] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [questions, setQuestions] = useState<DraftQuestion[]>([
    { id: uuid(), statement: "", correct: true },
  ])

  const teacherHeaders = useMemo(() => {
    if (!accessToken || user?.user_type !== "teacher") {
      return null
    }
    return {
      authorization: `Bearer ${accessToken}`,
      "x-user-type": "teacher",
    }
  }, [accessToken, user?.user_type])

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
        const list = await apiGet<TrueFalseTestSummary[]>(
          "/api/async/truefalse/tests?mode=teacher",
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
    const list = await apiGet<TrueFalseTestSummary[]>(
      "/api/async/truefalse/tests?mode=teacher",
      { headers: teacherHeaders },
    )
    setTests(list)
  }

  const toggleGroup = (id: string) => {
    setGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { id: uuid(), statement: "", correct: true }])
  }

  const removeQuestion = (id: string) => {
    setQuestions((prev) => (prev.length > 1 ? prev.filter((q) => q.id !== id) : prev))
  }

  const updateQuestion = (id: string, patch: Partial<DraftQuestion>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  const moveQuestion = (id: string, dir: -1 | 1) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q.id === id)
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
    setTelegramChatId("")
    setStartAt("")
    setEndAt("")
    setQuestions([{ id: uuid(), statement: "", correct: true }])
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
        const test = await apiGet<TrueFalseTest>(
          `/api/async/truefalse/tests/${encodeURIComponent(testId)}?mode=teacher`,
          { headers: teacherHeaders },
        )
        setModalMode("edit")
        setEditingTest(test)
        setTitle(test.title ?? "")
        setDescription(test.description ?? "")
        setGroupIds(test.groupIds ?? [])
        setTelegramChatId(test.telegramChatId ?? "")
        setStartAt(toDatetimeLocal(test.startAt))
        setEndAt(toDatetimeLocal(test.endAt))
        setQuestions(
          (test.questions ?? []).map((q) => ({
            id: q.id,
            statement: q.statement ?? "",
            correct: Boolean(q.correct),
            image: q.image,
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
    const cleaned = questions
      .map((q) => ({
        id: q.id,
        statement: q.statement.trim(),
        correct: q.correct,
        image: q.image?.trim() || undefined,
      }))
      .filter((q) => q.statement.length > 0)

    if (cleaned.length === 0) {
      toast.error("Kamida bitta savol kiriting")
      return
    }

    ;(async () => {
      try {
        if (modalMode === "create") {
          const payload: Omit<TrueFalseTest, "id" | "createdAt" | "updatedAt"> = {
            title: title.trim(),
            description: description.trim() || undefined,
            groupIds,
            telegramChatId: telegramChatId.trim() || undefined,
            startAt: startIso,
            endAt: endIso,
            questions: cleaned,
          }
          await apiSend<TrueFalseTest>("/api/async/truefalse/tests", "POST", payload, {
            headers: teacherHeaders,
          })
          toast.success("Test yaratildi")
        } else {
          if (!editingTest) {
            toast.error("Tahrirlash uchun test topilmadi")
            return
          }
          const payload: TrueFalseTest = {
            ...editingTest,
            title: title.trim(),
            description: description.trim() || undefined,
            groupIds,
            telegramChatId: telegramChatId.trim() || undefined,
            startAt: startIso,
            endAt: endIso,
            questions: cleaned,
          }
          await apiSend<TrueFalseTest>(
            `/api/async/truefalse/tests/${encodeURIComponent(editingTest.id)}`,
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
          `/api/async/truefalse/tests/${encodeURIComponent(testId)}`,
          "DELETE",
          undefined,
          { headers: teacherHeaders },
        )
        if (selectedTestId === testId) {
          setSelectedTestId(null)
          setAttempts([])
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
        const list = await apiGet<TrueFalseAttempt[]>(
          `/api/async/truefalse/results/${testId}`,
          { headers: teacherHeaders },
        )
        setAttempts(list)
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
                True/False testlar
              </h1>
              <p className="mt-1 text-slate-600">
                JSON faylda saqlanadi, vaqt bo&apos;yicha ishlaydi.
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
                    <h2 className="text-lg font-bold text-slate-900">
                      Testlar ro&apos;yxati
                    </h2>
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
                    {loadingTests && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Loader /> Testlar yuklanmoqda...
                      </div>
                    )}
                    {tests.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                        Hozircha testlar yo&apos;q.
                      </div>
                    ) : (
                      tests.map((t) => (
                        <div
                          key={t.id}
                          className={clsx(
                            "flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 transition",
                            selectedTestId === t.id
                              ? "border-slate-900 bg-slate-50"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          )}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {t.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              {new Date(t.startAt).toLocaleString()} —{" "}
                              {new Date(t.endAt).toLocaleString()} •{" "}
                              {t.questionsCount} savol
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openResults(t.id)}
                              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Natijalar
                            </button>
                            <button
                              onClick={() => openEdit(t.id)}
                              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Tahrirlash
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                            >
                              O&apos;chirish
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">
                    Natijalar
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {selectedTest ? selectedTest.title : "Test tanlang"}
                  </p>

                  <div className="mt-4">
                    {!selectedTest ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                        Chapdan test tanlang.
                      </div>
                    ) : attempts.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                        Hozircha natijalar yo&apos;q.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {attempts.slice(0, 20).map((a) => (
                          <div
                            key={a.id}
                            className="rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {a.studentName}
                                </p>
                                <p className="mt-1 text-xs text-slate-600">
                                  {new Date(a.submittedAt).toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                                {a.score}/{a.total}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
                  <p className="font-semibold text-slate-900">Telegram</p>
                  <p className="mt-1">
                    Natija yuborish uchun `TELEGRAM_BOT_TOKEN` va `config/truefalse/telegram.json` ichida `groups`/`students` mapping kerak.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Create modal */}
          {isCreating && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
              <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {modalMode === "create"
                        ? "Yangi True/False test"
                        : "True/False testni tahrirlash"}
                    </p>
                    <p className="text-sm text-slate-600">
                      Savollar JSON faylga saqlanadi.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreating(false)
                      resetDraft()
                    }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">
                        Sarlavha
                      </span>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                        placeholder="Masalan: 1-mavzu True/False"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">
                        Tavsif (ixtiyoriy)
                      </span>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                        placeholder="Qisqa izoh"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">
                        Boshlanish vaqti
                      </span>
                      <input
                        type="datetime-local"
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">
                        Tugash vaqti
                      </span>
                      <input
                        type="datetime-local"
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                      />
                    </label>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Telegram (ixtiyoriy)
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Natijani guruh chatiga yuborish uchun chat ID kiriting
                      (masalan: <span className="font-mono">-1001234567890</span>).
                      Agar bo&apos;sh qoldirsangiz, `telegram.json` dagi guruh mapping ishlatiladi.
                    </p>
                    <label className="mt-3 block">
                      <span className="text-xs font-semibold text-slate-600">
                        Guruh chat ID
                      </span>
                      <input
                        value={telegramChatId}
                        onChange={(e) => setTelegramChatId(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                        placeholder="-100..."
                      />
                    </label>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-700">
                      Guruhlar
                    </p>
                    {groupsLoading ? (
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <Loader /> Yuklanmoqda...
                      </div>
                    ) : (
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {groups.map((g) => (
                          <label
                            key={g.id}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <input
                              type="checkbox"
                              checked={groupIds.includes(g.id)}
                              onChange={() => toggleGroup(g.id)}
                            />
                            <span className="min-w-0 truncate">
                              {g.name} • {g.students_count} talaba
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-700">
                        Savollar
                      </p>
                      <button
                        onClick={addQuestion}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        + Savol qo&apos;shish
                      </button>
                    </div>

                    <div className="mt-3 space-y-3">
                      {questions.map((q, idx) => (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <p className="text-xs font-semibold text-slate-600">
                              Savol #{idx + 1}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => moveQuestion(q.id, -1)}
                                disabled={idx === 0}
                                className={clsx(
                                  "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50",
                                  idx === 0 && "cursor-not-allowed opacity-50",
                                )}
                                aria-label="Yuqoriga"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => moveQuestion(q.id, 1)}
                                disabled={idx === questions.length - 1}
                                className={clsx(
                                  "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50",
                                  idx === questions.length - 1 &&
                                    "cursor-not-allowed opacity-50",
                                )}
                                aria-label="Pastga"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                onClick={() => removeQuestion(q.id)}
                                className={clsx(
                                  "rounded-xl border px-3 py-1.5 text-xs font-semibold transition",
                                  questions.length <= 1
                                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-400"
                                    : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
                                )}
                                disabled={questions.length <= 1}
                              >
                                O&apos;chirish
                              </button>
                            </div>
                          </div>
                          <textarea
                            value={q.statement}
                            onChange={(e) =>
                              updateQuestion(q.id, { statement: e.target.value })
                            }
                            className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                            rows={2}
                            placeholder="Bayonot (statement)"
                          />
                          <div className="mt-3 grid gap-3 sm:grid-cols-3">
                            <label className="block sm:col-span-2">
                              <span className="text-xs font-semibold text-slate-600">
                                Rasm URL (ixtiyoriy)
                              </span>
                              <input
                                value={q.image ?? ""}
                                onChange={(e) =>
                                  updateQuestion(q.id, { image: e.target.value })
                                }
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                                placeholder="https://..."
                              />
                            </label>
                            <label className="block">
                              <span className="text-xs font-semibold text-slate-600">
                                To&apos;g&apos;ri javob
                              </span>
                              <div className="mt-1 flex overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <button
                                  type="button"
                                  onClick={() => updateQuestion(q.id, { correct: true })}
                                  className={clsx(
                                    "flex-1 px-3 py-2 text-sm font-semibold",
                                    q.correct
                                      ? "bg-emerald-600 text-white"
                                      : "text-slate-700 hover:bg-slate-50",
                                  )}
                                  aria-label="To'g'ri"
                                >
                                  ✅ To&apos;g&apos;ri
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateQuestion(q.id, { correct: false })}
                                  className={clsx(
                                    "flex-1 px-3 py-2 text-sm font-semibold",
                                    !q.correct
                                      ? "bg-rose-600 text-white"
                                      : "text-slate-700 hover:bg-slate-50",
                                  )}
                                  aria-label="Noto'g'ri"
                                >
                                  ❌ Noto&apos;g&apos;ri
                                </button>
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 p-5">
                  <button
                    onClick={() => {
                      setIsCreating(false)
                      resetDraft()
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Bekor qilish
                  </button>
                  <Button
                    className="w-auto bg-slate-900 text-white hover:bg-slate-800"
                    onClick={handleSave}
                  >
                    Saqlash
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
