import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost18Page() {
  const post = itPosts.find((item) => item.id === 18)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
