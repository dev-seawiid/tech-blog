'use client'

import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'

interface TagFilterProps {
  tagCounts: Record<string, number>
}

export default function TagFilter({ tagCounts }: TagFilterProps) {
  const pathname = usePathname()

  // 태그 정렬
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  // 현재 선택된 태그 확인
  const currentTag = pathname.includes('/tags/') ? pathname.split('/tags/')[1]?.split('/')[0] : null

  return (
    <div className="pb-6">
      <div className="rounded-sm bg-gray-50 py-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40">
        <div className="px-6">
          {/* All Posts - 위에 배치 */}
          <div className="mb-4">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-primary-500 dark:text-primary-500 text-sm font-bold uppercase">
                All Posts
              </h3>
            ) : (
              <Link
                href="/blog"
                className="hover:text-primary-500 dark:hover:text-primary-500 text-sm font-bold text-gray-700 uppercase dark:text-gray-300"
              >
                All Posts
              </Link>
            )}
          </div>
          {/* 태그 목록 */}
          <ul className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => {
              const isSelected = currentTag && slug(tag) === decodeURI(currentTag)
              return (
                <li key={tag}>
                  <Link
                    href={`/tags/${slug(tag)}`}
                    className={`px-3 py-2 text-sm font-medium uppercase ${
                      isSelected
                        ? 'text-primary-500 dark:text-primary-500 font-bold'
                        : 'hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 dark:text-gray-300'
                    }`}
                    aria-label={`View posts tagged ${tag}`}
                  >
                    {`${tag} (${tagCounts[tag]})`}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
