import Link from "next/link"
import { itPosts } from "@/data/itPosts"

interface PostDetailProps {
  postId: number
  backHref: string
  backLabel: string
}

export default function PostDetail({ postId, backHref, backLabel }: PostDetailProps) {
  const post = itPosts.find((item) => item.id === postId)

  if (!post) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Post topilmadi</h1>
        <p className="mt-2 text-sm text-slate-600">
          So'ralgan post mavjud emas. Ro'yxatga qaytib, boshqa postni tanlang.
        </p>
        <Link
          href={backHref}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          {backLabel}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href={backHref} className="hover:text-slate-900">
          {backLabel}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-900">{post.title}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
            {post.category}
          </span>
          <span className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
            {post.level}
          </span>
          <span className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
            {post.readTime}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          {post.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {post.sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm text-slate-600">
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Asosiy fikrlar</h3>
            <div className="mt-4 space-y-3">
              {post.takeaways.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Keyingi qadam</h3>
            <p className="mt-2 text-sm text-slate-600">
              Postdagi tavsiyalarni amaliyotga qo'llash uchun kichik loyiha
              yoki mini mashq tanlang.
            </p>
            <Link
              href={backHref}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Barcha postlar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
