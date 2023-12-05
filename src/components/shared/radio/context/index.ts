'use client'

import { createOptionalContext } from '@/shared/lib/hooks'
import { ChangeEvent } from 'react'

interface IRadioGroupContextValue {
  size?: 'sm' | 'md'
  state: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const [RadioGroupProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>()
