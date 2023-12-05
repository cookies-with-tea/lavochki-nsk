import { CheckboxGroup } from '@/components/shared/checkbox/checkbox-group'
import { ReactNode } from 'react'
import { useCheckboxGroupContext } from '@/components/shared/checkbox/context'

interface ICheckboxProps {
  label?: ReactNode
  name?: string
  value?: string
  children?: ReactNode
}

export const Checkbox = ({ value, label, name, children }: ICheckboxProps) => {
  const { state, onChange } = useCheckboxGroupContext()

  const checked = state.includes(value)

  return (
    <label>
      <input
        value={value}
        checked={checked}
        type="checkbox"
        onChange={onChange}
      />

      { children && children }

      { label && !children && label }
    </label>
  )
}

Checkbox.Group = CheckboxGroup
