'use client'

import { useEffect, useRef } from 'react'

// TODO: Добавить типизацию.
export const useClickOutside = (callback: () => void) => {
  const ref = useRef<any>()

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  return ref
}
