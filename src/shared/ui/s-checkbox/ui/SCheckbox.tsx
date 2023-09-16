import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

interface IProps {
  label: string
}

export const SCheckbox = ({ label }: IProps) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }

  return <Checkbox onChange={onChange}>{label}</Checkbox>
}
