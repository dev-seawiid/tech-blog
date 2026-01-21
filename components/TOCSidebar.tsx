'use client'

import TOCInline from 'pliny/ui/TOCInline'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type TocItem = {
  value: string
  url: string
  depth: number
}

export type Toc = TocItem[]

interface TOCSidebarProps {
  toc: Toc
}

export default function TOCSidebar({ toc }: TOCSidebarProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const linksRef = useRef<NodeListOf<Element> | null>(null)

  // 헤딩 ID 목록 메모이제이션
  const headingIds = useMemo(
    () => toc.map((item) => item.url.replace('#', '')).filter(Boolean),
    [toc]
  )

  // 초기 활성 ID 계산 (클라이언트에서만)
  const getInitialActiveId = useCallback(() => {
    if (typeof window === 'undefined') return ''
    const hash = window.location.hash.replace('#', '')
    return hash && headingIds.includes(hash) ? hash : headingIds[0] || ''
  }, [headingIds])

  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === 'undefined') return ''
    return getInitialActiveId()
  })

  // 활성 링크 업데이트 최적화
  const updateActiveLink = useCallback((id: string) => {
    if (!linksRef.current) {
      linksRef.current = document.querySelectorAll('.toc-sidebar a')
    }

    linksRef.current.forEach((link) => {
      const href = link.getAttribute('href')
      if (!href?.startsWith('#')) return

      const linkId = href.replace('#', '')
      const isActive = linkId === id

      if (isActive) {
        link.classList.add('active')
        link.setAttribute('aria-current', 'page')
      } else {
        link.classList.remove('active')
        link.removeAttribute('aria-current')
      }
    })
  }, [])

  // IntersectionObserver 설정
  useEffect(() => {
    if (typeof window === 'undefined' || headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // 가장 위에 보이는 요소 찾기
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    )

    observerRef.current = observer

    // 모든 헤딩 요소 관찰
    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // 초기 활성 상태는 useState 초기값으로 설정되므로 여기서는 설정하지 않음

    // 해시 변경 감지
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '')
      if (newHash && headingIds.includes(newHash)) {
        setActiveId(newHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
      linksRef.current = null
    }
  }, [headingIds])

  // activeId 변경 시 링크 업데이트
  useEffect(() => {
    if (activeId) {
      updateActiveLink(activeId)
    }
  }, [activeId, updateActiveLink])

  return (
    <nav className="toc-sidebar">
      <TOCInline toc={toc} toHeading={6} ulClassName="toc-sidebar" />
    </nav>
  )
}
