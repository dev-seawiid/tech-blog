'use client'

import { GithubContributions } from '@wiid-get/design-system/github-contributions'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export function GithubContributionsWrapper(
  props: React.ComponentProps<typeof GithubContributions>
) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  )

  if (isServer) {
    return null
  }

  return <GithubContributions {...props} />
}
