'use client'

import styles from './styles.module.scss'
import { Button } from '@/components/shared'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export const TagsList = () => {
  const scrollTargetRef = useRef<HTMLDivElement | null>(null)
  const tagsListRef = useRef<HTMLDivElement | null>(null)
  const [scrollAmount, setScrollAmount] = useState(0)
  const [maxScrollValue, setMaxScrollValue] = useState(0)

  useEffect(() => {
    const scrollTarget = scrollTargetRef.current
    const tagsListRefTarget = tagsListRef.current

    if (!scrollTarget && tagsListRefTarget) return

    const updateScrollValues = () => {
      const newScrollAmount = scrollTarget.scrollLeft
      setScrollAmount(newScrollAmount)

      const newMaxScrollValue = scrollTarget.scrollWidth - scrollTarget.clientWidth
      setMaxScrollValue(newMaxScrollValue)

      if (newScrollAmount === 0) {
        tagsListRefTarget.style.setProperty('--visibility', 'visible')
        tagsListRefTarget.style.setProperty('--opacity', '1')
      } else if (newScrollAmount === newMaxScrollValue) {
        tagsListRefTarget.style.setProperty('--visibility', 'hidden')
        tagsListRefTarget.style.setProperty('--opacity', '0')
      }
    }

    scrollTarget.addEventListener('scroll', updateScrollValues)

    return () => {
      scrollTarget.removeEventListener('scroll', updateScrollValues)
    }
  }, [])

  return (
    <div ref={tagsListRef} className={styles['tags-list']}>
      <div ref={scrollTargetRef} className={styles['tags-list__inner']}>
        <Button
          as={Link}
          appearance={'link'}
          size={'sm'}
          href={'/benches?tags=nearShops'}
          className={styles['bench-page__create-tag']}
        >
          #Магазин рядом
        </Button>

        <Button
          as={Link}
          appearance={'link'}
          size={'sm'}
          href={'/benches?tags=nearShops'}
          className={styles['bench-page__create-tag']}
        >
          #Магазин рядом
        </Button>

        <Button
          as={Link}
          appearance={'link'}
          size={'sm'}
          href={'/benches?tags=nearShops'}
          className={styles['bench-page__create-tag']}
        >
          #Магазин рядом
        </Button>
      </div>
    </div>
  )
}
