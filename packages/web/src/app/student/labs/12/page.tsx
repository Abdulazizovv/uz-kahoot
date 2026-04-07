import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost12Page() {
  const post = itPosts.find((item) => item.id === 12)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
