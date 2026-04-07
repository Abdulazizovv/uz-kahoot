import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost19Page() {
  const post = itPosts.find((item) => item.id === 19)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
