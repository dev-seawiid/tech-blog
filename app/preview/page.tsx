import Image from '@/components/Image'
import {
  Avatar,
  Badge,
  ParallaxText,
  PostCard,
  ProfileCard,
  ProjectCard,
  SpotifyLastPlayed,
  SpotifyNowPlaying,
  TypingText,
} from '@wiid-get/design-system'
import { GithubContributions } from '@wiid-get/design-system/github-contributions'
import { RotatingSphere } from '@wiid-get/design-system/rotating-sphere'
import { genPageMetadata } from 'app/seo'
import Link from 'next/link'

import avatarImg from '../../public/static/images/avatar.png'
import mapleImg from '../../public/static/images/canada/maple.jpg'
import mountainsImg from '../../public/static/images/canada/mountains.jpg'

/** public/ import는 Next가 blur를 생성하지 않으므로, 공통 플레이스홀더 사용 (leohuynh.dev·Pinterest처럼) */
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8Q'

export const metadata = genPageMetadata({
  title: 'Preview',
  description: '@wiid-get/design-system 컴포넌트 미리보기 (개발자용)',
})

const PREVIEW_SECTION_CLASS = 'divide-y divide-gray-200 dark:divide-gray-700'
const PREVIEW_HEADING_CLASS =
  'text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl'
const PREVIEW_DESC_CLASS = 'mt-1 text-sm text-gray-500 dark:text-gray-400'

/** SpotifyLastPlayed 샘플용 (렌더 중 Date.now() 호출 방지) */
const SAMPLE_PLAYED_AT_ISO = new Date(Date.now() - 30 * 60 * 1000).toISOString()

function PreviewSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4 py-8 first:pt-0">
      <div>
        <h2 className={PREVIEW_HEADING_CLASS}>{title}</h2>
        {description && <p className={PREVIEW_DESC_CLASS}>{description}</p>}
      </div>
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-900/30">
        {children}
      </div>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <div className={PREVIEW_SECTION_CLASS}>
      <div className="space-y-2 pt-6 pb-2 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl dark:text-gray-100">
          Design System Preview
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          <code className="rounded bg-gray-200 px-1.5 py-0.5 dark:bg-gray-700">
            @wiid-get/design-system
          </code>{' '}
          컴포넌트를 Stories와 비슷하게 사용한 예시입니다. 개발 시 참고용입니다.
        </p>
      </div>

      <PreviewSection
        title="Badge"
        description="variant, size (xs · sm · md · lg). Stories: Variants, Sizes, BlogTags"
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
                <Badge key={s} variant="primary" size={s}>
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Variants</p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'default',
                  'primary',
                  'secondary',
                  'success',
                  'warning',
                  'error',
                  'outline',
                ] as const
              ).map((v) => (
                <Badge key={v} variant={v}>
                  {v}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              BlogTags (primary)
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Design System'].map((t) => (
                <Badge key={t} variant="primary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        title="Avatar"
        description="imageSlot (next/image 권장), size, shape, fallback. Stories: WithImage, Sizes, Shapes, WithFallback"
      >
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar
              imageSlot={
                <Image
                  src={avatarImg}
                  alt="avatar"
                  width={32}
                  height={32}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              }
              alt="avatar"
              size="sm"
              shape="circle"
            />
            <span className="text-xs text-gray-500">sm circle</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar
              imageSlot={
                <Image
                  src={avatarImg}
                  alt="avatar"
                  width={40}
                  height={40}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  className="object-cover"
                />
              }
              alt="avatar"
              size="md"
              shape="circle"
            />
            <span className="text-xs text-gray-500">md circle (Image)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" shape="circle" fallback="AB" />
            <span className="text-xs text-gray-500">lg fallback</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="xl" shape="square" fallback="W" />
            <span className="text-xs text-gray-500">xl square</span>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        title="TypingText"
        description="strings, typeSpeed, backSpeed, loop, showCursor, cursorChar. Stories: Default, WithoutCursor, Fast/Slow, NoLoop, SingleString"
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Default (cursor)
            </p>
            <TypingText
              strings={['Developer', 'Frontend', 'Design System']}
              typeSpeed={80}
              backSpeed={50}
              loop
              showCursor
            />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Without cursor, custom speed
            </p>
            <TypingText
              strings={['Single string only']}
              typeSpeed={40}
              backSpeed={10}
              loop
              showCursor={false}
            />
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        title="ParallaxText"
        description="items ({ text, href? }), baseVelocity, itemsPerRow, pauseOnHover. Stories: Default, WithLinks"
      >
        <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <ParallaxText
            items={[
              { text: 'React' },
              { text: 'Next.js', href: '/blog' },
              { text: 'TypeScript' },
              { text: 'Tailwind' },
              { text: 'Design System', href: '/preview' },
              { text: 'Storybook' },
            ]}
            baseVelocity={0.5}
            itemsPerRow={2}
            pauseOnHover
          />
        </div>
      </PreviewSection>

      <PreviewSection
        title="PostCard"
        description="imageSlot, titleLinkSlot 필수. variant: grid/list, isNew. Stories: GridView, ListView, WithoutImage, NewPost"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <PostCard
            title="Grid variant sample"
            summary="PostCard with variant=grid. imageSlot and titleLinkSlot can be customized."
            date="Feb 10, 2026"
            readingTime={3}
            tags={['Preview', 'Design System']}
            variant="grid"
            isNew
            imageSlot={
              <Link href="/blog" className="block h-full w-full">
                <span className="relative block h-full w-full">
                  <Image
                    src={mountainsImg}
                    alt="Post"
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
            titleLinkSlot={<Link href="/blog">Grid variant sample</Link>}
          />
          <PostCard
            title="List variant sample"
            summary="PostCard with variant=list. Same props, different layout."
            date="Feb 10, 2026"
            readingTime={2}
            tags={['Preview']}
            variant="list"
            imageSlot={
              <Link href="/blog" className="block h-full w-full">
                <span className="relative block h-full w-full">
                  <Image
                    src={mapleImg}
                    alt="Post"
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    loading="lazy"
                    className="rounded-lg object-cover"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </span>
              </Link>
            }
            titleLinkSlot={<Link href="/blog">List variant sample</Link>}
          />
          <PostCard
            title="Without image (imageSlot: null)"
            summary="TypeScript Best Practices. imageSlot=null이면 제목·메타·태그만 표시."
            date="Feb 10, 2026"
            readingTime={6}
            tags={['TypeScript', 'Programming']}
            variant="grid"
            imageSlot={null}
            titleLinkSlot={<Link href="/blog">Without image (imageSlot: null)</Link>}
          />
        </div>
      </PreviewSection>

      <PreviewSection
        title="ProfileCard"
        description="info, imageSlot 필수 (null 가능), spotify 옵션. Stories: Default, WithSpotify, WithoutSpotify"
      >
        <div className="max-w-md">
          <ProfileCard
            info={{
              name: 'Preview User',
              title: 'Frontend Developer',
              bio: 'Design system preview용 프로필 카드입니다.',
              socialLinks: [
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'Twitter', href: 'https://twitter.com' },
              ],
            }}
            imageSlot={
              <div className="relative h-full w-full">
                <Image
                  src={mountainsImg}
                  alt="Profile header"
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  className="object-cover object-[50%_15%]"
                  sizes="(max-width: 448px) 100vw, 448px"
                />
              </div>
            }
          />
        </div>
      </PreviewSection>

      <PreviewSection
        title="ProjectCard"
        description="logoSlot, linkSlot 필수 (null 가능). tags: { label, icon? }. Stories: Default, WithoutLink, WithoutLogo"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            title="Preview Project A"
            description="Design system 컴포넌트 미리보기 페이지입니다."
            logoSlot={
              <Image
                src={avatarImg}
                alt="Preview Project A"
                width={48}
                height={48}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                className="h-12 w-12 rounded-lg object-contain"
              />
            }
            linkSlot={
              <Link
                href="/preview"
                className="block h-full no-underline"
                aria-label="Link to Preview Project A"
              />
            }
            tags={[{ label: 'Next.js' }, { label: 'Design System' }]}
          />
          <ProjectCard
            title="Preview Project B"
            description={
              <span>
                description은 <code>string | ReactNode</code> 입니다.
              </span>
            }
            logoSlot={null}
            linkSlot={null}
            tags={[{ label: 'React' }, { label: 'TypeScript' }]}
          />
        </div>
      </PreviewSection>

      <PreviewSection
        title="SpotifyNowPlaying"
        description="isPlaying, song (title, artist, albumImageUrl?, songUrl?). Stories: NotPlaying, Playing, WithCover"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="max-w-sm">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">NotPlaying</p>
            <SpotifyNowPlaying isPlaying={false} />
          </div>
          <div className="max-w-sm">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Playing (with cover)
            </p>
            <SpotifyNowPlaying
              isPlaying
              showCover
              song={{
                title: 'Sample Track',
                artist: 'Sample Artist',
                albumImageUrl: '/static/images/canada/lake.jpg',
                songUrl: 'https://open.spotify.com',
              }}
            />
          </div>
        </div>
      </PreviewSection>

      <PreviewSection
        title="SpotifyLastPlayed"
        description="track (title, artist, albumImageUrl, songUrl, playedAt?), isPlaying, showExternalLink. Stories: CurrentlyPlaying, LastPlayed"
      >
        <div className="max-w-sm">
          <SpotifyLastPlayed
            track={{
              title: 'Last Played Track',
              artist: 'Artist',
              albumImageUrl: '/static/images/canada/toronto.jpg',
              songUrl: 'https://open.spotify.com',
              playedAt: SAMPLE_PLAYED_AT_ISO,
            }}
            isPlaying={false}
            showExternalLink
            externalLinkUrl="https://open.spotify.com"
          />
        </div>
      </PreviewSection>

      <PreviewSection
        title="GithubContributions"
        description="username, year, colorScheme. 별도 경로: @wiid-get/design-system/github-contributions (react-github-calendar 설치 필요)"
      >
        <div className="max-w-2xl">
          <GithubContributions username="dev-seawiid" year="last" colorScheme="auto" />
        </div>
      </PreviewSection>

      <PreviewSection
        title="RotatingSphere"
        description="items prop (content), variant는 컴포넌트 레벨 (circle | rectangle). 별도 경로: @wiid-get/design-system/rotating-sphere"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">circle (숫자)</p>
            <div className="min-h-[400px] w-full max-w-[400px] min-w-[400px]">
              <RotatingSphere
                items={Array.from({ length: 20 }, (_, i) => ({ content: i + 1 }))}
                variant="circle"
                radius={2}
                speed={0.5}
                autoRotate
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">rectangle (태그)</p>
            <div className="min-h-[400px] w-full max-w-[400px] min-w-[400px]">
              <RotatingSphere
                items={[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Tailwind',
                  'Design System',
                  'Storybook',
                ].map((content) => ({ content }))}
                variant="rectangle"
                radius={2.5}
                speed={0.3}
                autoRotate
              />
            </div>
          </div>
        </div>
      </PreviewSection>
    </div>
  )
}
