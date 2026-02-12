import { GithubContributionsWrapper } from '@/components/GithubContributionsWrapper'
import { HeroBackground } from '@/components/HeroBackground'
import { HeroContent } from '@/components/HeroContent'
import Image from '@/components/Image'
import Link from '@/components/Link'
import projectsData from '@/data/projectsData'
import { ParallaxTextSection } from '@/components/ParallaxTextSection'
import { PostCard, ProjectCard } from '@wiid-get/design-system'
const MAX_POSTS = 3
const MAX_PROJECTS = 2

// Placeholder for blur data to match preview/best practices
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8Q'

export default function Home({ posts }) {
  return (
    <>
      {/* Hero Section with Parallax Background - Full Width */}
      <div className="relative mb-12 w-full">
        {/* Parallax Background - Full viewport width, not constrained */}
        <HeroBackground />

        {/* Content - Constrained by max-width */}
        <div className="relative px-4 pt-12 pb-16 sm:px-6 md:pt-20 md:pb-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col-reverse items-start gap-8 lg:flex-row lg:items-start lg:justify-between">
              <HeroContent />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12 divide-y divide-gray-200 dark:divide-gray-700">
        {/* Recent Posts Section */}
        <div className="space-y-6 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              View All &rarr;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_POSTS).map((post) => {
              const { slug, date, title, summary, tags, images } = post
              // Using the first image if available, else null
              const displayImage =
                images && images.length > 0 ? images[0] : '/static/images/canada/mountains.jpg'

              return (
                <PostCard
                  key={slug}
                  title={title}
                  summary={summary}
                  date={date}
                  tags={tags}
                  variant="grid"
                  imageSlot={
                    <Link href={`/blog/${slug}`} className="block h-full w-full">
                      <span className="relative block h-full w-full">
                        <Image
                          src={displayImage}
                          alt={title}
                          fill
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          loading="lazy"
                          className="rounded-xl object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </span>
                    </Link>
                  }
                  titleLinkSlot={<Link href={`/blog/${slug}`}>{title}</Link>}
                />
              )
            })}
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-6 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Recent Projects
            </h2>
            <Link
              href="/projects"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All projects"
            >
              View All &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projectsData.slice(0, MAX_PROJECTS).map((d) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.description}
                linkSlot={
                  d.href ? (
                    <Link
                      href={d.href}
                      className="block h-full no-underline"
                      aria-label={`Link to ${d.title}`}
                    />
                  ) : null
                }
                logoSlot={
                  d.imgSrc ? (
                    <Image
                      src={d.imgSrc}
                      alt={d.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                  ) : null
                }
                // Default tags since projectsData doesn't strictly adhere to tags in the array yet
                tags={[]}
              />
            ))}
          </div>
        </div>

        {/* Parallax Text Divider - 메모로 스크롤 시 불필요 리렌더 방지 */}
        <ParallaxTextSection />

        {/* GitHub Contributions Section */}
        <div className="py-12">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Contributions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">My coding journey visualized</p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <GithubContributionsWrapper username="dev-seawiid" year="last" colorScheme="auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
