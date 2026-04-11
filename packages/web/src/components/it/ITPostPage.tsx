"use client"

import { useEffect, useMemo, useState } from "react"
import { getMiniQuizForPost } from "@/lib/it-post-quiz"
import {
  clearMiniQuizAttempt,
  loadMiniQuizAttempt,
  saveMiniQuizAttempt,
} from "@/lib/it-post-quiz-storage"
import { ItPost } from "@/lib/it-posts"

interface ITPostPageProps {
  post: ItPost
  audience?: "student" | "teacher"
}

const levelTone = (level: ItPost["level"]) => {
  switch (level) {
    case "Boshlang'ich":
      return "bg-emerald-100 text-emerald-800"
    case "O'rta":
      return "bg-amber-100 text-amber-800"
    case "Yuqori":
      return "bg-red-100 text-red-800"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

const statusTone = (status: ItPost["status"]) => {
  switch (status) {
    case "read":
      return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "available":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "locked":
      return "bg-slate-100 text-slate-500 border-slate-200"
    default:
      return "bg-slate-100 text-slate-500 border-slate-200"
  }
}

export default function ITPostPage({ post, audience = "student" }: ITPostPageProps) {
  const quiz = useMemo(() => getMiniQuizForPost(post.id), [post.id])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)

  const totalQuestions = quiz.length
  const answeredCount = quiz.filter((q) => answers[q.id] !== undefined).length
  const correctCount = submitted
    ? quiz.reduce((sum, q) => sum + (answers[q.id] === q.answerIndex ? 1 : 0), 0)
    : 0

  const canSubmit = totalQuestions > 0 && answeredCount === totalQuestions

  // Restore attempt from localStorage on first render for this post.
  useEffect(() => {
    const stored = loadMiniQuizAttempt(post.id)
    if (!stored) return
    setAnswers(stored.answers ?? {})
    setSubmitted(Boolean(stored.submitted))
    setLastSavedAt(stored.updatedAt ?? null)
  }, [post.id])

  // Persist progress and results.
  useEffect(() => {
    if (quiz.length === 0) return
    const updatedAt = new Date().toISOString()
    saveMiniQuizAttempt({
      v: 1,
      postId: post.id,
      answers,
      submitted,
      correctCount: submitted ? correctCount : null,
      totalQuestions,
      updatedAt,
    })
    setLastSavedAt(updatedAt)
  }, [post.id, quiz.length, totalQuestions, submitted, correctCount, answers])

  return (
    <div>
      <div className="mb-6 text-sm text-slate-600">
        <span className="hover:text-indigo-600">Bosh sahifa</span>
        <span className="mx-2">→</span>
        <span className="hover:text-indigo-600">IT postlar</span>
        <span className="mx-2">→</span>
        <span className="font-medium text-slate-900">Post #{post.id}</span>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-2xl font-bold text-white shadow-lg">
            {post.id}
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold text-slate-900">
              {post.title}
            </h1>
            <p className="text-lg text-slate-600">{post.summary}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${levelTone(post.level)}`}
          >
            {post.level}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {post.readTime}
          </span>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
            {post.category} • {post.track}
          </span>
          <span
            className={`rounded-full border px-4 py-2 text-sm font-medium ${statusTone(post.status)}`}
          >
            {post.status === "read"
              ? "O'qilgan"
              : post.status === "available"
                ? "Mavjud"
                : "Yopiq"}
          </span>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Prerequisites
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            {post.prerequisites.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-900"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Objectives
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            {post.objectives.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Takeaways
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            {post.takeaways.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {post.sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              {section.title}
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              {section.points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Code Samples
          </h3>
          <div className="space-y-4">
            {post.codeSamples.map((sample) => (
              <div key={sample.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{sample.title}</p>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    {sample.language}
                  </span>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
                  <code>{sample.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Mashqlar</h3>
          <div className="space-y-4">
            {post.exercises.map((exercise) => (
              <div key={exercise.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">{exercise.title}</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {exercise.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                      <p>{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {quiz.length > 0 && (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Mini Quiz</h3>
              <p className="mt-1 text-sm text-slate-600">
                {totalQuestions} ta savol • {answeredCount}/{totalQuestions} javoblandi
              </p>
              {lastSavedAt && (
                <p className="mt-1 text-xs text-slate-500">
                  Saqlangan: {new Date(lastSavedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {!submitted ? (
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => setSubmitted(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Tekshirish
                </button>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    Natija: {correctCount}/{totalQuestions}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Davom ettirish
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setAnswers({})
                      clearMiniQuizAttempt(post.id)
                      setLastSavedAt(null)
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Qayta ishlash
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {quiz.map((q, idx) => {
              const selected = answers[q.id]
              const isCorrect = selected === q.answerIndex

              return (
                <div key={q.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {idx + 1}. {q.question}
                    </p>
                    {submitted && (
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "To'g'ri" : "Noto'g'ri"}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    {q.choices.map((choice, choiceIndex) => {
                      const checked = selected === choiceIndex
                      const isAnswer = choiceIndex === q.answerIndex

                      const tone =
                        submitted && checked
                          ? isCorrect
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-red-300 bg-red-50"
                          : submitted && isAnswer
                            ? "border-emerald-200 bg-emerald-50/40"
                            : "border-slate-200 bg-white"

                      return (
                        <label
                          key={choice}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm text-slate-700 transition ${tone} ${
                            submitted ? "cursor-default" : "hover:border-indigo-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={checked}
                            disabled={submitted}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [q.id]: choiceIndex }))
                            }
                            className="mt-0.5"
                          />
                          <span className="flex-1">{choice}</span>
                          {submitted && isAnswer && (
                            <span className="shrink-0 text-xs font-semibold text-emerald-700">
                              To'g'ri javob
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">Izoh</p>
                      <p className="mt-1">{q.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Teglar</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            References
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            {post.references.map((ref) => (
              <a
                key={ref.href}
                href={ref.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
              >
                <p className="font-semibold text-slate-900">{ref.title}</p>
                {ref.note && <p className="mt-1 text-xs text-slate-500">{ref.note}</p>}
                <p className="mt-2 text-xs font-semibold text-indigo-600">
                  Ochish →
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            GitHub Repos
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            {post.githubRepos.map((repo) => (
              <a
                key={repo.href}
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
              >
                <p className="font-semibold text-slate-900">{repo.name}</p>
                <p className="mt-1 text-sm text-slate-600">{repo.why}</p>
                <p className="mt-2 text-xs font-semibold text-indigo-600">
                  GitHub →
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {audience === "teacher" && post.teacherNotes && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-amber-900">
            O'qituvchi uchun eslatmalar
          </h3>
          <div className="space-y-3 text-sm text-amber-800">
            {post.teacherNotes.map((note) => (
              <div key={note} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-600"></span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
