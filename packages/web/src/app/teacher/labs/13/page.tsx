import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function TeacherPost13Page() {
  const post = itPosts.find((item) => item.id === 13)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="teacher" />
}
