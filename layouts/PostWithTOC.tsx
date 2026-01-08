import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import TOCSidebar, { type Toc } from '@/components/TOCSidebar'
import siteMetadata from '@/data/siteMetadata'
import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { ReactNode } from 'react'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: Toc
}

export default function PostWithTOC({ content, next, prev, children, toc = [] }: LayoutProps) {
  const { slug, date, title } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="xl:overflow-visible">
        <header>
          <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
              </div>
            </dl>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>
        <div className="divide-y divide-gray-200 pb-8 xl:flex xl:gap-x-24 xl:divide-y-0 dark:divide-gray-700">
          {toc.length > 0 && (
            <aside className="hidden xl:block xl:overflow-visible">
              <div className="toc-sidebar-container safari-sticky-fix sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <div className="h-full max-w-[280px] min-w-[280px] overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40">
                  <div className="px-6 py-4">
                    <h2 className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      목차
                    </h2>
                    <TOCSidebar toc={toc} />
                  </div>
                </div>
              </div>
            </aside>
          )}
          <div className="divide-y divide-gray-200 xl:min-w-0 xl:flex-1 xl:pb-0 dark:divide-gray-700">
            <div className="prose dark:prose-invert max-w-none overflow-x-auto pt-10 pb-8">
              {children}
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev?.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next?.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
