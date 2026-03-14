"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import Link from "next/link"

export default function TeacherQuizzesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0 lg:ml-72">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Testlar</h1>
            <p className="mt-1 text-gray-600">
              Turli formatdagi testlarni yaratish va natijalarni ko&apos;rish
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/teacher/quizzes/true-false"
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/60 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-sky-200/60 blur-2xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  🧩 True/False
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Vaqt bo&apos;yicha test (JSON)
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Boshlanish/tugash vaqtini belgilang, guruh tanlang, rasm
                  qo&apos;shing va natijalarni ko&apos;ring.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Boshqarish <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>

            <Link
              href="/teacher/quizzes/matching"
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-200/60 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-200/60 blur-2xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                  🧠 Moslashtirish
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Chap-ong moslashtirish (JSON)
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Chap tomonda rasm/matn, o&apos;ng tomonda javoblar: talabalar
                  moslashtiradi, natijalar saqlanadi.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Boshqarish <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                🎮 Live quiz
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Real-time o&apos;yin (mavjud)
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Hozirgi Socket.IO asosidagi o&apos;yinlar bo&apos;limi.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Eslatma: bu format hozircha `config/quizz/*.json` orqali
                boshqariladi.
              </p>
            </div>

            <Link
              href="/teacher/quizzes/stats"
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-200/60 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-emerald-200/60 blur-2xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">
                  📈 Statistika
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Guruh bo&apos;yicha tahlil
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  True/False, Moslashtirish va Kahoot natijalari asosida
                  umumiy ko&apos;rsatkichlar.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Ko&apos;rish <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
