import ITPostPage from "@/components/it/ITPostPage"
import { itPosts } from "@/lib/it-posts"

export default function StudentPost24Page() {
  const post = itPosts.find((item) => item.id === 24)

  if (!post) {
    return null
  }

  return <ITPostPage post={post} audience="student" />
}
