'use client'

import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { RadioGroupProvider } from '@/components/shared/radio/context'
import { generateClassNames } from '@/shared/lib/utils'
import styles from './styles.module.scss'

interface IRadioGroupProps {
  children: ReactNode
  value?: string
  size?: 'sm' | 'md'
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
}

export const RadioGroup = (props: IRadioGroupProps) => {
  const {
    children,
    value,
    defaultValue = '',
    onChange,
    name,
    size = 'md'
  } = props

  const [_value, setValue] = useState('')

  const _name = name

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)

    onChange(event.currentTarget.value)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <RadioGroupProvider value={{ state: _value, onChange: handleChange, size, name: _name }}>
      <div role="radiogroup" className={generateClassNames([styles['radio-group'], 'radio-group'])}>{children}</div>
    </RadioGroupProvider>
  )
}
