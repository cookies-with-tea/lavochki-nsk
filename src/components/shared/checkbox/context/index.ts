'use client'

import { createOptionalContext } from '@/shared/lib/hooks'
import { ChangeEvent } from 'react'

interface ICheckboxGroupContextValue {
  size?: 'sm' | 'md'
  state: Array<string>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createOptionalContext<ICheckboxGroupContextValue>()
