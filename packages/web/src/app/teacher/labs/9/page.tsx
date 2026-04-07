import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost9Page() {
  const post = itPosts.find((item) => item.id === 9)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
