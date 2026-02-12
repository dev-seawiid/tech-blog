'use client'

import { SpotifyLastPlayed } from '@wiid-get/design-system'
import { useEffect, useState } from 'react'
import { useSyncExternalStore } from 'react'

const THIRTY_MINUTES_MS = 30 * 60 * 1000

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

/**
 * Wrapper for SpotifyLastPlayed to handle dynamic rendering and hydration.
 */
export function SpotifyLastPlayedWrapper() {
  const isMounted = useMounted()
  const [playedAt, setPlayedAt] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!isMounted) return
    const id = setTimeout(
      () => setPlayedAt(new Date(Date.now() - THIRTY_MINUTES_MS).toISOString()),
      0
    )
    return () => clearTimeout(id)
  }, [isMounted])

  const track = {
    albumImageUrl:
      'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a20c45c816b0670f30c01ae5',
    artist: 'seawiid',
    playedAt: playedAt ?? '2026-02-12T06:53:45.867Z',
    songUrl: 'https://open.spotify.com/track/40KI0wagmeuyHxBALolhDL',
    title: 'Letter To Teo',
  }

  return (
    <div className="w-full">
      {isMounted ? (
        <SpotifyLastPlayed isPlaying track={track} />
      ) : (
        // Simple skeleton or placeholder to prevent layout shift
        <div className="h-24 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
      )}
    </div>
  )
}
