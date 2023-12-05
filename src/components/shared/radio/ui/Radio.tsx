import { RadioGroup } from '@/components/shared/radio/radio-group'
import { ReactNode } from 'react'
import { useRadioGroupContext } from '@/components/shared/radio/context'

interface IRadioProps {
  label?: ReactNode
  name?: string
  value?: string
  children?: ReactNode
}

export const Radio = ({ value, label, name, children }: IRadioProps) => {
  const { state, onChange } = useRadioGroupContext()

  const checked = value === state

  return (
    <label>
      <input
        value={value}
        checked={checked}
        type="radio"
        onChange={onChange}
      />

      { children && children }

      { label && !children && label }
    </label>
  )
}

Radio.Group = RadioGroup
