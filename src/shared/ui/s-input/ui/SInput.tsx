import { Input } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { ChangeEvent } from 'react'

import styles from 'shared/ui/s-input/ui/styles.module.scss'

interface IProps {
  className?: string
  placeholder?: string
  type?: 'text' | 'password' | 'textarea' | 'number'
  name?: string
  size?: 'sm' | 'md'
  value?: string | number

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const cx = cnBind.bind(styles)

// TODO: Изменить выводимый тип инпута.
// TODO: Добавить иконку глазика для пароля.
export const SInput = ({ placeholder = '', type = 'text', name, value, size = 'md', onChange }: IProps) => {
  switch (type) { 
    case 'password': {
      return (
        <Input.Password
          className={cn(cx('s-input', `s-input--${size}`))}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      )
    }

    default: { 
      return (
        <Input
          className={cn(cx('s-input', `s-input--${size}`))}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )
    }
  }
}