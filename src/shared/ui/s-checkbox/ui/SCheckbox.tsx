import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'shared/ui/s-checkbox/ui/styles.module.scss'

interface IProps {
  label?: string
}

const cx = cnBind.bind(styles)

export const SCheckbox = ({ label }: IProps) => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }

  return <Checkbox className={cn(cx('s-checkbox'))} onChange={onChange}>{label}</Checkbox>
}
