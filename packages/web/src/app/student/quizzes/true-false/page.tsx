"use client"

import Header from "@/components/student/StudentHeader"
import StudentSidebar from "@/components/student/StudentSidebar"
import Loader from "@/components/Loader"
import { studentsService } from "@/services/api/students.service"
import { apiGet } from "@/lib/async-api"
import { TrueFalseTestSummary } from "@eduarena/common/types/truefalse"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

export default function StudentTrueFalseListPage() {
  const [groupId, setGroupId] = useState<string | undefined>(undefined)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [tests, setTests] = useState<TrueFalseTestSummary[]>([])
  const [loadingTests, setLoadingTests] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const me = await studentsService.getMe()
        if (mounted) setGroupId(me.group?.id)
      } catch (e) {
        console.error(e)
        // Guruh bo'lmasa ham testlar ko'rinishi kerak.
        toast.error("Profil ma'lumotlarini olishda xatolik")
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
      if (loadingProfile) return
      setLoadingTests(true)
      try {
        const params = new URLSearchParams({ mode: "student" })
        if (groupId) params.set("groupId", groupId)
        const list = await apiGet<TrueFalseTestSummary[]>(
          `/api/async/truefalse/tests?${params.toString()}`,
        )
        if (mounted) setTests(list)
      } catch (e) {
        console.error(e)
        toast.error((e as Error).message)
      } finally {
        if (mounted) setLoadingTests(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [groupId, loadingProfile])

  const sorted = useMemo(
    () =>
      [...tests].sort(
        (a, b) => new Date(a.endAt).getTime() - new Date(b.endAt).getTime(),
      ),
    [tests],
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <StudentSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              True/False testlar
            </h1>
            <p className="mt-1 text-slate-600">
              Belgilangan vaqt oralig&apos;ida yechishingiz mumkin.
            </p>
          </div>

          {loadingProfile ? (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader /> Yuklanmoqda...
            </div>
          ) : loadingTests ? (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader /> Testlar yuklanmoqda...
            </div>
          ) : sorted.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
              Hozircha siz uchun faol test yo&apos;q.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sorted.map((t) => (
                <Link
                  key={t.id}
                  href={`/student/quizzes/true-false/${t.id}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold text-slate-900">
                      {t.title}
                    </p>
                    <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {t.questionsCount} savol
                    </span>
                  </div>
                  {t.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {t.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-slate-500">
                    Tugaydi: {new Date(t.endAt).toLocaleString()}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Boshlash <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
