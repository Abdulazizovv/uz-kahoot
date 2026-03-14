"use client"

import Header from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import Loader from "@/components/Loader"
import Button from "@/components/Button"
import { studentsService } from "@/services/api/students.service"
import { useAuthStore } from "@/stores/auth"
import { apiGet, apiSend } from "@/lib/async-api"
import {
  TrueFalseAttempt,
  TrueFalseTestForStudent,
} from "@eduarena/common/types/truefalse"
import clsx from "clsx"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

export default function StudentTrueFalseTakePage() {
  const router = useRouter()
  const { id }: { id?: string } = useParams()
  const { user, isHydrated } = useAuthStore()

  const [groupId, setGroupId] = useState<string | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [test, setTest] = useState<TrueFalseTestForStudent | null>(null)
  const [startedAt, setStartedAt] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<TrueFalseAttempt | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const me = await studentsService.getMe()
        if (mounted) setGroupId(me.group.id)
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
        const t = await apiGet<TrueFalseTestForStudent>(
          `/api/async/truefalse/tests/${encodeURIComponent(id)}?mode=student`,
        )
        if (!mounted) return
        setTest(t)
        setStartedAt(new Date().toISOString())
        const initial: Record<string, boolean | null> = {}
        for (const q of t.questions) initial[q.id] = null
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

  const total = test?.questions.length ?? 0
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

  const handlePick = (questionId: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    if (!test || !user || !startedAt) return
    if (!canSubmit) {
      toast.error("Avval barcha savollarga javob bering")
      return
    }
    setSubmitting(true)
    ;(async () => {
      try {
        const attempt = await apiSend<TrueFalseAttempt>(
          "/api/async/truefalse/submit",
          "POST",
          {
            testId: test.id,
            studentUserId: user.id,
            studentName: `${user.first_name} ${user.last_name}`.trim(),
            groupId: groupId ?? undefined,
            startedAt,
            answers: test.questions.map((q) => ({
              questionId: q.id,
              answer: Boolean(answers[q.id]),
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
                  ? `Savollar: ${answeredCount}/${total} • Qolgan vaqt: ${formattedLeft}`
                  : "Yuklanmoqda..."}
              </p>
            </div>
            <button
              onClick={() => router.push("/student/quizzes/true-false")}
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
                  onClick={() => router.push("/student/quizzes/true-false")}
                >
                  Ro&apos;yxatga qaytish
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {test.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold text-slate-600">
                      Savol #{idx + 1}
                    </p>
                    {answers[q.id] !== null && (
                      <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Tanlandi
                      </span>
                    )}
                  </div>
                  <p className="text-base font-semibold text-slate-900">
                    {q.statement}
                  </p>
                  {q.image && (
                    <img
                      src={q.image}
                      alt={q.statement}
                      className="mt-3 w-full max-w-2xl rounded-2xl border border-slate-200 object-cover"
                    />
                  )}
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handlePick(q.id, true)}
                      className={clsx(
                        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                        answers[q.id] === true
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                      )}
                      aria-label="To'g'ri"
                    >
                      ✅ To&apos;g&apos;ri
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePick(q.id, false)}
                      className={clsx(
                        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                        answers[q.id] === false
                          ? "border-rose-600 bg-rose-600 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                      )}
                      aria-label="Noto'g'ri"
                    >
                      ❌ Noto&apos;g&apos;ri
                    </button>
                  </div>
                </div>
              ))}

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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
