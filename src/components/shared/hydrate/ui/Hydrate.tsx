'use client'

import { HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const Hydrate = ({ children, ...props }: { state: any, children: ReactNode }) => {
  return (
    <HydrationBoundary {...props}>
      { children }
    </HydrationBoundary>
  )
}
