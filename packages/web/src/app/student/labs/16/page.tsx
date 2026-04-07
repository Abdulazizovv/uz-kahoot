import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost16Page() {
  const post = itPosts.find((item) => item.id === 16)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
