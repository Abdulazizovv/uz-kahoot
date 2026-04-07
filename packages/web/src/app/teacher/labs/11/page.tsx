import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost11Page() {
  const post = itPosts.find((item) => item.id === 11)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
