import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost22Page() {
  const post = itPosts.find((item) => item.id === 22)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
