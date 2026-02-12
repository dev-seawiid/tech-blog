'use client'

import { PostCard } from '@wiid-get/design-system'
import type { ReactNode } from 'react'
import { useSyncExternalStore } from 'react'

const NEW_POST_WITHIN_DAYS = 14
const MS_PER_DAY = 1000 * 60 * 60 * 24

/** 클라이언트 마운트 시점 기준 시각. SSR/초기 렌더에서는 null. */
let clientTimeSnapshot: number | null = null
const listeners = new Set<() => void>()
let timeoutId: ReturnType<typeof setTimeout> | null = null

function subscribeToClientTime(callback: () => void): () => void {
  if (clientTimeSnapshot !== null) {
    callback()
    return () => {}
  }
  listeners.add(callback)
  if (timeoutId === null) {
    timeoutId = setTimeout(() => {
      clientTimeSnapshot = Date.now()
      listeners.forEach((l) => l())
      listeners.clear()
      timeoutId = null
    }, 0)
  }
  return () => {
    listeners.delete(callback)
    if (listeners.size === 0 && timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }
}

function getClientTimeSnapshot(): number | null {
  return clientTimeSnapshot
}

function getServerTimeSnapshot(): null {
  return null
}

interface PostCardClientWrapperProps {
  title: string
  summary: string | undefined
  date: string
  readingTime: number | undefined
  tags: string[] | undefined
  /** 포스트 원본 날짜 (isNew 계산용, ISO 또는 파싱 가능한 문자열) */
  postDate: string
  imageSlot: ReactNode
  titleLinkSlot: ReactNode
}

export default function PostCardClientWrapper({
  title,
  summary,
  date,
  readingTime,
  tags,
  postDate,
  imageSlot,
  titleLinkSlot,
}: PostCardClientWrapperProps) {
  const referenceTime = useSyncExternalStore(
    subscribeToClientTime,
    getClientTimeSnapshot,
    getServerTimeSnapshot
  )

  const isNew =
    referenceTime !== null &&
    (() => {
      const postTime = new Date(postDate).getTime()
      const diffDays = Math.ceil(Math.abs(referenceTime - postTime) / MS_PER_DAY)
      return diffDays <= NEW_POST_WITHIN_DAYS
    })()

  return (
    <PostCard
      title={title}
      summary={summary}
      date={date}
      readingTime={readingTime}
      tags={tags}
      variant="grid"
      isNew={isNew}
      imageSlot={imageSlot}
      titleLinkSlot={titleLinkSlot}
    />
  )
}
