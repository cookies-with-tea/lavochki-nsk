import { CheckboxGroup } from '@/components/shared/checkbox/checkbox-group'
import { ReactNode } from 'react'
import { useCheckboxGroupContext } from '@/components/shared/checkbox/context'
import { generateClassNames } from '@/shared/lib/utils'
import styles from './style.module.scss'

interface ICheckboxProps {
  label?: ReactNode
  name?: string
  value?: string
  children?: ReactNode
}

// TODO: Заменить галочку на компонент икноки
// TODO: Сейчас иконка с острыми углами. Надо исправить

export const Checkbox = ({ value, label, name, children }: ICheckboxProps) => {
  const { state, onChange } = useCheckboxGroupContext()

  const checked = state.includes(value)

  const random = Math.random() * 1000 // 1000 - Максимальный порог рандомного числа

  const generateId = () => `${random}--${Date.now()}--${name}`

  return (
    <div>
      <input
        value={value}
        checked={checked}
        type="checkbox"
        id={generateId()}
        className={generateClassNames([styles['checkbox'], 'checkbox'])}
        onChange={onChange}
      />

      <label htmlFor={generateId()}>
        { children || label }
      </label>
    </div>
  )
}

Checkbox.Group = CheckboxGroup
