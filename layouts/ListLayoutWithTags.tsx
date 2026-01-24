import PostCardList from '@/components/PostCardList'
import Pagination from '@/components/Pagination'
import TagFilter from '@/components/TagFilter'
import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  // 태그 데이터 추출
  const tagCounts: Record<string, number> = {}
  allBlogs.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        const tagKey = tag
        tagCounts[tagKey] = (tagCounts[tagKey] || 0) + 1
      })
    }
  })

  return (
    <div>
      <TagFilter tagCounts={tagCounts} />
      <PostCardList posts={displayPosts} />
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
