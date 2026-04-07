import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost17Page() {
  const post = itPosts.find((item) => item.id === 17)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
