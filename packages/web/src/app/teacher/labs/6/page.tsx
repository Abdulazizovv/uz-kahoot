import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost6Page() {
  const post = itPosts.find((item) => item.id === 6)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
