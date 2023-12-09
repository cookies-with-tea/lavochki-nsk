'use client'

import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { CheckboxGroupProvider } from '@/components/shared/checkbox/context'
import cn from 'classnames'
import styles from './styles.module.scss'

interface ICheckboxGroupProps {
  children: ReactNode
  value?: Array<string>
  size?: 'sm' | 'md'
  defaultValue?: Array<string>
  className: string
  onChange?: (value: Array<string>) => void
  name?: string
}

export const CheckboxGroup = (props: ICheckboxGroupProps) => {
  const {
    children,
    value,
    defaultValue,
    className = '',
    name,
    size = 'md',
    onChange,
  } = props

  const [_value, setValue] = useState<Array<string>>([])

  const _name = name

  const handleChange = (event: ChangeEvent<HTMLInputElement> | []) => {
    if (Array.isArray(event)) {
      onChange([])

      return
    }

    if (event.target.checked) {
      setValue([
        ..._value,
        event.target.value
      ])
    } else {
      setValue(_value.filter((oldValue) => oldValue !== event.target.value))
    }

    onChange(_value)
  }

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [])

  return (
    <CheckboxGroupProvider value={{ state: _value, onChange: handleChange, size, name: _name }}>
      <div role="checkboxgroup" className={cn(styles['checkbox-group'], 'checkbox-group', className)}>{children}</div>
    </CheckboxGroupProvider>
  )
}
