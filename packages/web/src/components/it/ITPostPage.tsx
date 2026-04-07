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
            {post.category}
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
