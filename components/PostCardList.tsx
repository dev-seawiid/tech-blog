'use client'

import Image from '@/components/Image'
import { PostCard } from '@wiid-get/design-system'
import type { Blog } from 'contentlayer/generated'
import Link from 'next/link'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

interface PostCardListProps {
  posts: CoreContent<Blog>[]
}

export default function PostCardList({ posts }: PostCardListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const { path, date, title, summary, tags, readingTime, images } = post
        const readingTimeMinutes = readingTime?.minutes ? Math.ceil(readingTime.minutes) : undefined

        // 이미지 처리: images 배열에서 첫 번째 이미지 가져오기, 없으면 기본 이미지
        let imageUrl: string | undefined
        if (images) {
          const imageArray = typeof images === 'string' ? [images] : images
          imageUrl = imageArray.length > 0 ? imageArray[0] : undefined
        }
        // 이미지가 없거나 빈 배열이면 기본 이미지 사용 (샘플 블로그의 사진)
        if (!imageUrl) {
          imageUrl = '/static/images/canada/mountains.jpg'
        }

        // 날짜 형식: leohuynh.dev 스타일로 포맷 (예: "Jul 09, 2025")
        // PostCard는 영어 형식의 날짜를 기대하므로 영어 로케일 사용
        const formattedDate = formatDate(date, 'en-US')

        const postHref = `/${path}`

        return (
          <li key={path}>
            <PostCard
              title={title}
              summary={summary}
              date={formattedDate}
              readingTime={readingTimeMinutes}
              tags={tags}
              variant="grid"
              imageSlot={
                <Link href={postHref} className="wg-w-full wg-h-full">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={400}
                    className="wg-w-full wg-h-full wg-rounded-xl wg-shadow-2xl wg-object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </Link>
              }
              titleLinkSlot={<Link href={postHref}>{title}</Link>}
            />
          </li>
        )
      })}
    </ul>
  )
}
