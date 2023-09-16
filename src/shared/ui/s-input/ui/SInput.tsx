import { Input } from 'antd'
import { ChangeEvent } from 'react'

import styles from 'shared/ui/s-input/ui/styles.module.scss'

interface IProps {
  className?: string
  placeholder?: string
  type?: 'text' | 'password' | 'textarea' | 'number'
  name?: string
  value?: string | number

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

// TODO: Изменить выводимый тип инпута.
// TODO: Добавить иконку глазика для пароля.
export const SInput = ({ placeholder = '', type = 'text', name, value, onChange }: IProps) => {
  switch (type) { 
    case 'password': {
      return <Input.Password className={styles['s-input']} name={name} value={value} placeholder={placeholder} />
    }

    default: { 
      return <Input
       className={styles['s-input']} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    }
  }
}