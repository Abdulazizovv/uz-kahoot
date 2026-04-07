import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost5Page() {
  const post = itPosts.find((item) => item.id === 5)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
