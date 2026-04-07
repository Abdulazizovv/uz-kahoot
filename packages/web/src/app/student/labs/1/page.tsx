import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost1Page() {
  const post = itPosts.find((item) => item.id === 1)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
