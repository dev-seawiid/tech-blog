'use client'

import { ProfileCard } from '@wiid-get/design-system'
import { memo } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import { SpotifyLastPlayedWrapper } from '@/components/SpotifyLastPlayedWrapper'

/**
 * Hero 구역(Now Playing, Profile)을 한 덩어리로 감싸서,
 * 상위(SearchProvider/KBar 등) 리렌더 시 불필요한 리렌더를 막습니다.
 * props 없이 사용하므로 memo로 상위만 리렌더될 때는 스킵됩니다.
 */
const HeroContentInner = () => (
  <>
    <div className="flex w-full flex-col gap-6 lg:w-1/2">
      <div>
        <h3 className="mb-4 text-2xl font-bold">Now Playing</h3>
        <SpotifyLastPlayedWrapper />
      </div>
    </div>
    <div className="w-full lg:w-1/3">
      <ProfileCard
        info={{
          name: 'Seawiid',
          title: 'Frontend Developer',
          bio: siteMetadata.description,
          socialLinks: [{ label: 'GitHub', href: siteMetadata.github ?? '' }],
        }}
        imageSlot={
          <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800">
            <Image
              src="https://github.com/dev-seawiid.png"
              alt="Seawiid"
              fill
              className="object-cover"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
            />
          </div>
        }
      />
    </div>
  </>
)

export const HeroContent = memo(HeroContentInner)
