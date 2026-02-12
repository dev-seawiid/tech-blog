'use client'

import { ParallaxText } from '@wiid-get/design-system'
import { memo } from 'react'

const PARALLAX_ITEMS = [
  { text: 'Frontend' },
  { text: 'React' },
  { text: 'Next.js' },
  { text: 'TypeScript' },
  { text: 'Design System' },
  { text: 'Creative Coding' },
] as const

/** 스크롤 시 부모 리렌더에 같이 리렌더되지 않도록 메모 (ParallaxText는 ref + rAF로 애니메이션). */
export const ParallaxTextSection = memo(function ParallaxTextSection() {
  return (
    <div className="overflow-hidden py-12">
      <ParallaxText items={[...PARALLAX_ITEMS]} baseVelocity={1} itemsPerRow={3} />
    </div>
  )
})
