"use client"

import Header from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import Loader from "@/components/Loader"
import Button from "@/components/Button"
import { studentsService } from "@/services/api/students.service"
import { useAuthStore } from "@/stores/auth"
import { apiGet, apiSend } from "@/lib/async-api"
import {
  MatchingAttempt,
  MatchingTestForStudent,
} from "@eduarena/common/types/matching"
import clsx from "clsx"
import { useParams, useRouter } from "next/navigation"
import { type DragEvent, useCallback, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

export default function StudentMatchingTakePage() {
  const router = useRouter()
  const { id }: { id?: string } = useParams()
  const { user, isHydrated } = useAuthStore()

  const [groupId, setGroupId] = useState<string | undefined>(undefined)
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [test, setTest] = useState<MatchingTestForStudent | null>(null)
  const [startedAt, setStartedAt] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<MatchingAttempt | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const me = await studentsService.getMe()
        if (mounted) setGroupId(me.group?.id)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoadingProfile(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!id) return
      try {
        const t = await apiGet<MatchingTestForStudent>(
          `/api/async/matching/tests/${encodeURIComponent(id)}?mode=student`,
        )
        if (!mounted) return
        setTest(t)
        setStartedAt(new Date().toISOString())
        const initial: Record<string, string | null> = {}
        for (const item of t.leftItems) initial[item.id] = null
        setAnswers(initial)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  const total = test?.leftItems.length ?? 0
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers],
  )

  const timeLeft = useMemo(() => {
    if (!test) return null
    const end = new Date(test.endAt).getTime()
    const now = Date.now()
    return Math.max(0, end - now)
  }, [test, tick])

  useEffect(() => {
    if (!test) return
    const t = setInterval(() => {
      setTick((x) => x + 1)
    }, 1000)
    return () => clearInterval(t)
  }, [test])

  const canSubmit = Boolean(
    test &&
      startedAt &&
      isHydrated &&
      user &&
      answeredCount === total &&
      (timeLeft ?? 0) > 0,
  )

  const handlePick = (leftId: string, rightId: string | null) => {
    setAnswers((prev) => ({ ...prev, [leftId]: rightId }))
  }

  const unassignRight = useCallback((rightId: string) => {
    setAnswers((prev) => {
      const next = { ...prev }
      for (const leftId of Object.keys(next)) {
        if (next[leftId] === rightId) next[leftId] = null
      }
      return next
    })
  }, [])

  const assignRight = useCallback(
    (leftId: string, rightId: string) => {
      setAnswers((prev) => {
        const next = { ...prev }
        for (const k of Object.keys(next)) {
          if (next[k] === rightId) next[k] = null
        }
        next[leftId] = rightId
        return next
      })
      setActiveOptionId(null)
    },
    [setActiveOptionId],
  )

  const assignedList = useMemo(
    () => Object.values(answers).filter((v): v is string => Boolean(v)),
    [answers],
  )

  const assignedSet = useMemo(() => new Set(assignedList), [assignedList])

  const availableOptions = useMemo(() => {
    if (!test) return []
    return test.rightOptions.filter((o) => !assignedSet.has(o.id))
  }, [test, assignedSet])

  const handleSubmit = () => {
    if (!test || !user || !startedAt) return
    if (!canSubmit) {
      toast.error("Avval barcha itemlar uchun javob tanlang")
      return
    }
    setSubmitting(true)
    ;(async () => {
      try {
        const attempt = await apiSend<MatchingAttempt>(
          "/api/async/matching/submit",
          "POST",
          {
            testId: test.id,
            studentUserId: user.id,
            studentName: `${user.first_name} ${user.last_name}`.trim(),
            groupId: groupId ?? undefined,
            startedAt,
            answers: test.leftItems.map((l) => ({
              leftId: l.id,
              rightId: answers[l.id] ?? null,
            })),
          },
        )
        setResult(attempt)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      } finally {
        setSubmitting(false)
      }
    })()
  }

  const formattedLeft = useMemo(() => {
    if (timeLeft === null) return ""
    const sec = Math.floor(timeLeft / 1000)
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }, [timeLeft])

  const rightLabel = (rightId: string) => {
    const opt = test?.rightOptions.find((o) => o.id === rightId)
    if (!opt) return "Tanlanmagan"
    if (opt.text) return opt.text
    return opt.image ? "🖼️ Rasm" : "Javob"
  }

  const handleDragStart = (rightId: string) => (e: DragEvent) => {
    e.dataTransfer.setData("text/plain", rightId)
    e.dataTransfer.effectAllowed = "move"
  }

  const readDragRightId = (e: DragEvent) => {
    const id = e.dataTransfer.getData("text/plain")
    return id || null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <StudentSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-slate-900">
                {test?.title ?? "Test"}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {test
                  ? `Juftliklar: ${answeredCount}/${total} • Qolgan vaqt: ${formattedLeft}`
                  : "Yuklanmoqda..."}
              </p>
            </div>
            <button
              onClick={() => router.push("/student/quizzes/matching")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span aria-hidden="true">←</span> Orqaga
            </button>
          </div>

          {loadingProfile || !test ? (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader /> Yuklanmoqda...
            </div>
          ) : result ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-600">Natija</p>
              <p className="mt-2 text-5xl font-extrabold text-slate-900">
                {result.score}/{result.total}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Javobingiz saqlandi. O&apos;qituvchi natijalarni ko&apos;rishi
                mumkin.
              </p>
              <div className="mt-6">
                <Button
                  className="w-auto bg-slate-900 text-white hover:bg-slate-800"
                  onClick={() => router.push("/student/quizzes/matching")}
                >
                  Ro&apos;yxatga qaytish
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              <div
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const rightId = readDragRightId(e)
                  if (rightId) unassignRight(rightId)
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Javoblar</h2>
                    <p className="mt-1 text-xs text-slate-600">
                      Kompyuterda sudrab tashlang. Telefonlarda: javobni bosing, keyin joyga bosing.
                    </p>
                  </div>
                  {activeOptionId && (
                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      onClick={() => setActiveOptionId(null)}
                    >
                      Bekor
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {availableOptions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-600">
                      Hamma javoblar joylashtirilgan.
                      <div className="mt-2 text-xs text-slate-500">
                        (Drag qilsangiz, bu yerga tashlab qaytarishingiz mumkin)
                      </div>
                    </div>
                  ) : (
                    availableOptions.map((o) => {
                      const isActive = activeOptionId === o.id
                      return (
                        <div
                          key={o.id}
                          draggable
                          onDragStart={handleDragStart(o.id)}
                          onClick={() => setActiveOptionId(o.id)}
                          role="button"
                          tabIndex={0}
                          className={clsx(
                            "group rounded-2xl border bg-white p-3 shadow-sm transition",
                            isActive
                              ? "border-slate-900 ring-2 ring-slate-900/10"
                              : "border-slate-200 hover:bg-slate-50",
                          )}
                          aria-label="Javob"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm">
                              ⠿
                            </div>
                            <div className="min-w-0 flex-1">
                              {o.text && (
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {o.text}
                                </p>
                              )}
                              {o.image && (
                                <img
                                  src={o.image}
                                  alt={o.text || "Option image"}
                                  className="mt-2 w-full rounded-xl border border-slate-200 object-cover"
                                />
                              )}
                              {!o.text && !o.image && (
                                <p className="text-sm font-semibold text-slate-900">Javob</p>
                              )}
                              <p className="mt-1 text-[11px] text-slate-500">
                                Sudrab tashlang yoki bosing
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              <div className="space-y-4 lg:col-span-2">
                {test.leftItems.map((l, idx) => {
                  const chosen = answers[l.id]
                  const chosenOpt = chosen
                    ? test.rightOptions.find((o) => o.id === chosen) ?? null
                    : null

                  return (
                    <div
                      key={l.id}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <p className="text-xs font-semibold text-slate-600">
                          Item #{idx + 1}
                        </p>
                        {chosen && (
                          <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Joylashtirildi
                          </span>
                        )}
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold text-slate-900">Chap</p>
                          {l.text && (
                            <p className="mt-2 text-base font-semibold text-slate-900">
                              {l.text}
                            </p>
                          )}
                          {l.image && (
                            <img
                              src={l.image}
                              alt={l.text || "Left image"}
                              className="mt-3 w-full max-w-2xl rounded-2xl border border-slate-200 object-cover"
                            />
                          )}
                        </div>

                        <div
                          className={clsx(
                            "rounded-3xl border p-4 transition",
                            chosen
                              ? "border-slate-200 bg-white"
                              : activeOptionId
                                ? "border-slate-900 bg-slate-50"
                                : "border-slate-200 bg-white",
                          )}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = "move"
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            const rightId = readDragRightId(e)
                            if (rightId) assignRight(l.id, rightId)
                          }}
                          onClick={() => {
                            if (activeOptionId) assignRight(l.id, activeOptionId)
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label="Drop zone"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                O&apos;ng javob
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                {chosen
                                  ? "Istasangiz boshqa javobni tashlab almashtiring"
                                  : "Bu yerga javobni tashlang"}
                              </p>
                            </div>
                            {chosen && (
                              <button
                                type="button"
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePick(l.id, null)
                                }}
                              >
                                Tozalash
                              </button>
                            )}
                          </div>

                          {!chosenOpt ? (
                            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
                              {activeOptionId
                                ? "Joylashtirish uchun shu blokka bosing"
                                : "Javobni bu yerga tashlang"}
                            </div>
                          ) : (
                            <div
                              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                              draggable
                              onDragStart={handleDragStart(chosenOpt.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm">
                                  ⠿
                                </div>
                                <div className="min-w-0 flex-1">
                                  {chosenOpt.text && (
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                      {chosenOpt.text}
                                    </p>
                                  )}
                                  {chosenOpt.image && (
                                    <img
                                      src={chosenOpt.image}
                                      alt={chosenOpt.text || "Right image"}
                                      className="mt-2 w-full rounded-xl border border-slate-200 object-cover"
                                    />
                                  )}
                                  <p className="mt-1 text-[11px] text-slate-500">
                                    Qaytarish uchun chapdagi “Javoblar” blokiga tashlang
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-slate-500">
                        Hozirgi tanlov:{" "}
                        <span className="font-semibold text-slate-700">
                          {chosen ? rightLabel(chosen) : "—"}
                        </span>
                      </p>
                    </div>
                  )
                })}

              <div className="sticky bottom-4">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-700">
                      Tayyor: {answeredCount}/{total}
                    </p>
                    <Button
                      className={clsx(
                        "w-auto bg-slate-900 text-white hover:bg-slate-800",
                        (!canSubmit || submitting) && "opacity-60",
                      )}
                      onClick={handleSubmit}
                      disabled={!canSubmit || submitting}
                    >
                      {submitting ? "Yuborilmoqda..." : "Yuborish"}
                    </Button>
                  </div>
                  {(timeLeft ?? 0) === 0 && (
                    <p className="mt-2 text-xs text-rose-600">
                      Test vaqti tugadi.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
