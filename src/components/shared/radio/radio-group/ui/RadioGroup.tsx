'use client'

import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { RadioGroupProvider } from '@/components/shared/radio/context'
import styles from './styles.module.scss'
import cn from 'classnames'

interface IRadioGroupProps {
  children: ReactNode
  value?: string
  size?: 'sm' | 'md'
  className?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
}

export const RadioGroup = (props: IRadioGroupProps) => {
  const {
    children,
    value,
    defaultValue = '',
    name,
    size = 'md',
    className = '',
    onChange,
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
      <div role="radiogroup" className={cn(styles['radio-group'], 'radio-group', className)}>{children}</div>
    </RadioGroupProvider>
  )
}
