import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost3Page() {
  const post = itPosts.find((item) => item.id === 3)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
