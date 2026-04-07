import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost7Page() {
  const post = itPosts.find((item) => item.id === 7)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
