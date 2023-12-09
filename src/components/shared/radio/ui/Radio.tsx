import { RadioGroup } from '@/components/shared/radio/radio-group'
import { ReactNode } from 'react'
import { useRadioGroupContext } from '@/components/shared/radio/context'
import styles from './style.module.scss'
import cn from 'classnames'

interface IRadioProps {
  label?: ReactNode
  name?: string
  value?: string
  children?: ReactNode
}

// TODO: Переделать на input + label
export const Radio = ({ value, label, name, children }: IRadioProps) => {
  const { state, onChange } = useRadioGroupContext()

  const checked = value === state

  return (
    <label className={cn(styles['radio'], 'radio')}>
      <input
        value={value}
        checked={checked}
        type="radio"
        onChange={onChange}
      />

      <span>
        { children || label }
      </span>
    </label>
  )
}

Radio.Group = RadioGroup
