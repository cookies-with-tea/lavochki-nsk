'use client'

import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { CheckboxGroupProvider } from '@/components/shared/checkbox/context'
import { generateClassNames } from '@/shared/lib/utils'
import styles from './styles.module.scss'

interface ICheckboxGroupProps {
  children: ReactNode
  value?: Array<string>
  size?: 'sm' | 'md'
  defaultValue?: Array<string>
  onChange?: (value: Array<string>) => void
  name?: string
}

export const CheckboxGroup = (props: ICheckboxGroupProps) => {
  const {
    children,
    value,
    defaultValue,
    onChange,
    name,
    size = 'md'
  } = props

  const [_value, setValue] = useState<Array<string>>([])

  const _name = name

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <div role="checkboxgroup" className={generateClassNames([styles['checkbox-group'], 'checkbox-group'])}>{children}</div>
    </CheckboxGroupProvider>
  )
}
