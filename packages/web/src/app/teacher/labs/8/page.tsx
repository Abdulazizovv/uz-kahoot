import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost8Page() {
  const post = itPosts.find((item) => item.id === 8)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
