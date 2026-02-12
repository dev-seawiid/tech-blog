import Image from '@/components/Image'
import PostCardClientWrapper from '@/components/PostCardClientWrapper'
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

        let imageUrl: string | undefined
        if (images) {
          const imageArray = typeof images === 'string' ? [images] : images
          imageUrl = imageArray.length > 0 ? imageArray[0] : undefined
        }
        if (!imageUrl) {
          imageUrl = '/static/images/canada/mountains.jpg'
        }

        const formattedDate = formatDate(date, 'en-US')
        const postHref = `/${path}`

        return (
          <li key={path} className="[contain-intrinsic-size:0_280px] [content-visibility:auto]">
            <PostCardClientWrapper
              title={title}
              summary={summary}
              date={formattedDate}
              readingTime={readingTimeMinutes}
              tags={tags}
              postDate={date}
              imageSlot={
                <Link href={postHref} className="wg-w-full wg-h-full">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={400}
                    className="wg-w-full wg-h-full wg-rounded-xl wg-shadow-2xl wg-object-cover"
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
