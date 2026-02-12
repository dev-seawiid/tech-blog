'use client'

import { RotatingSphereWrapper } from '@/components/RotatingSphereWrapper'
import { type MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { memo } from 'react'

/**
 * Scroll-driven parallax은 Framer Motion MotionValue로만 처리되어 React 리렌더를 유발하지 않음.
 * 부모(SearchProvider 등) 리렌더 시 HeroBackground가 같이 리렌더되지 않도록 memo.
 */
function HeroBackgroundInner() {
  const { scrollY } = useScroll()

  const sphereY = useTransform(scrollY, [0, 800], [0, -640])
  const glow1X = useTransform(scrollY, [0, 500], [0, 150])
  const glow1Y = useTransform(scrollY, [0, 500], [0, 100])
  const glow2X = useTransform(scrollY, [0, 500], [0, -100])
  const glow2Y = useTransform(scrollY, [0, 500], [0, -75])
  const glow3X = useTransform(scrollY, [0, 500], [0, 75])
  const glow3Y = useTransform(scrollY, [0, 500], [0, 50])

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      {/* Theme-aware Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950" />

      {/* Parallax Decorative Glows - motion value만 구독, 리렌더 없음 */}
      <motion.div
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-500/20"
        style={{ x: glow1X, y: glow1Y }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl dark:bg-purple-500/20"
        style={{ x: glow2X, y: glow2Y }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl dark:bg-cyan-500/10"
        style={{ x: glow3X, y: glow3Y }}
      />

      {/* Background Sphere - MotionValue로만 y 갱신, 스피어는 메모된 자식으로 분리 */}
      <HeroSphere sphereY={sphereY} />
    </div>
  )
}

const HeroSphere = memo(function HeroSphere({ sphereY }: { sphereY: MotionValue<number> }) {
  return (
    <motion.div
      className="absolute top-1/4 left-0 flex h-full w-full items-center justify-center opacity-60"
      style={{ y: sphereY }}
    >
      <div className="h-[700px] w-[700px] lg:h-[900px] lg:w-[900px]">
        <RotatingSphereWrapper />
      </div>
    </motion.div>
  )
})

export const HeroBackground = memo(HeroBackgroundInner)
