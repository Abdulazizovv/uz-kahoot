"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getMiniQuizForPost } from "@/lib/it-post-quiz"
import { loadMiniQuizAttempt } from "@/lib/it-post-quiz-storage"
import { itPosts } from "@/lib/it-posts"

const levelTone = (level: string) => {
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

const statusTone = (status: string) => {
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

const pageSize = 8

export default function StudentLabsPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Barchasi")
  const [level, setLevel] = useState("Barchasi")
  const [status, setStatus] = useState("Barchasi")
  const [tag, setTag] = useState("Barchasi")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [quizAttempts, setQuizAttempts] = useState<Record<number, ReturnType<typeof loadMiniQuizAttempt>>>({})

  useEffect(() => {
    const refresh = () => {
      const map: Record<number, ReturnType<typeof loadMiniQuizAttempt>> = {}
      for (const post of itPosts) {
        map[post.id] = loadMiniQuizAttempt(post.id)
      }
      setQuizAttempts(map)
    }

    refresh()
    const onFocus = () => refresh()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(itPosts.map((post) => post.category)))
    return ["Barchasi", ...unique]
  }, [])

  const tags = useMemo(() => {
    const unique = Array.from(new Set(itPosts.flatMap((post) => post.tags)))
    return ["Barchasi", ...unique]
  }, [])

  const featured = useMemo(
    () => itPosts.filter((post) => post.status !== "locked").slice(0, 3),
    []
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return itPosts
      .filter((post) => {
        if (category !== "Barchasi" && post.category !== category) return false
        if (level !== "Barchasi" && post.level !== level) return false
        if (status !== "Barchasi" && post.status !== status) return false
        if (tag !== "Barchasi" && !post.tags.includes(tag)) return false

        if (!normalized) return true
        const haystack = [
          post.title,
          post.summary,
          post.category,
          post.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
        return haystack.includes(normalized)
      })
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title)
        if (sort === "progress") return b.progress - a.progress
        return b.id - a.id
      })
  }, [category, level, status, tag, query, sort])

  useEffect(() => {
    setPage(1)
  }, [query, category, level, status, tag, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const completedCount = itPosts.filter((post) => post.status === "read").length
  const totalScore = itPosts
    .filter((post) => post.score)
    .reduce((sum, post) => sum + (post.score || 0), 0)
  const avgScore =
    completedCount > 0 ? Math.round(totalScore / completedCount) : 0

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-blue-200">
              IT postlar kutubxonasi
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {itPosts.length} ta IT post, qo'llanma va checklist
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100">
              Dasturlash, backend, DevOps, xavfsizlik va product mindset bo'yicha
              jamlangan postlar. Qidiruv va filtrlar orqali tez toping.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase text-blue-200">O'qilgan</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {completedCount}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase text-blue-200">O'rtacha ball</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {avgScore}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase text-blue-200">Kategoriyalar</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {categories.length - 1}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/student/it-posts"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            IT markazi
          </Link>
          <Link
            href="/student/it-posts/roadmap"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Yo'l xarita
          </Link>
          <Link
            href="/student/it-posts/resources"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Resurslar
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {featured.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Featured
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  {post.track} • {post.category} • {post.readTime}
                </p>
                {quizAttempts[post.id]?.submitted && (
                  <p className="mt-2 text-xs font-semibold text-emerald-700">
                    Quiz natija: {quizAttempts[post.id]?.correctCount ?? 0}/
                    {quizAttempts[post.id]?.totalQuestions ?? getMiniQuizForPost(post.id).length}
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${levelTone(post.level)}`}
              >
                {post.level}
              </span>
            </div>
            <Link
              href={`/student/labs/${post.id}`}
              className="mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              O'qishni boshlash →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Qidiruv
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-400">🔎</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Post nomi, kategoriya yoki tag..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Kategoriya
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Daraja
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          >
            {["Barchasi", "Boshlang'ich", "O'rta", "Yuqori"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Holat
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {["Barchasi", "read", "available", "locked"].map((item) => (
              <option key={item} value={item}>
                {item === "read"
                  ? "O'qilgan"
                  : item === "available"
                    ? "Mavjud"
                    : item === "locked"
                      ? "Yopiq"
                      : "Barchasi"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Tag
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Saralash
          </p>
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Eng yangi</option>
            <option value="progress">Progress bo'yicha</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {categories
          .filter((item) => item !== "Barchasi")
          .slice(0, 8)
          .map((item) => {
            const count = itPosts.filter((post) => post.category === item).length
            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-300 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-900">{item}</p>
                <p className="mt-2 text-xs text-slate-500">{count} ta post</p>
              </button>
            )
          })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {paged.map((post) => (
          <div
            key={post.id}
            className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
              post.status === "locked"
                ? "border-slate-200 opacity-70"
                : "border-slate-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-slate-500">Post #{post.id}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {post.track}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {post.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {post.codeSamples.length} code
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {post.exercises.length} mashq
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {getMiniQuizForPost(post.id).length} quiz
                  </span>
                  {quizAttempts[post.id] && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      {quizAttempts[post.id]?.submitted
                        ? `Natija ${quizAttempts[post.id]?.correctCount ?? 0}/${quizAttempts[post.id]?.totalQuestions ?? getMiniQuizForPost(post.id).length}`
                        : `Quiz ${Object.keys(quizAttempts[post.id]?.answers ?? {}).length}/${getMiniQuizForPost(post.id).length}`}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${levelTone(post.level)}`}
              >
                {post.level}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  #{item}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {post.readTime}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(post.status)}`}
                >
                  {post.status === "read"
                    ? "O'qilgan"
                    : post.status === "available"
                      ? "Mavjud"
                      : "Yopiq"}
                </span>
              </div>
              {post.status !== "locked" ? (
                <Link
                  href={`/student/labs/${post.id}`}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  O'qish →
                </Link>
              ) : (
                <span className="text-xs font-semibold text-slate-400">
                  Yopiq
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {filtered.length} ta post topildi
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Oldingi
          </button>
          <span className="text-xs font-semibold text-slate-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Keyingi
          </button>
        </div>
      </div>
    </div>
  )
}
