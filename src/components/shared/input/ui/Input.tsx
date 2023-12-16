'use client'

import styles from './style.module.scss'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'
import cb from 'classnames/bind'

const cx = cb.bind(styles)
// TODO: Исправить типы для textarea и исправить поведение ресайза.

interface IInputProps  extends InputHTMLAttributes<HTMLInputElement>  {
  footer?: ReactNode
  action?: ReactNode
  type?: HTMLInputElement['type'] & 'textarea'
}

const InputInner = (props: IInputProps) => {
  const {
    footer,
    action,
    type = 'text',
    className,
    placeholder,
    ...restProps
  } = props

  const classes = cn('input', cx(
    'input',
    {
      'with-footer': footer,
      'input-textarea': type === 'textarea'
    },
    className,
  ))

  return (
    <div className={classes}>
      <div className={styles['input__wrapper']}>
        {
          type !== 'textarea'
            ? (
              <input className={styles['input__inner']} placeholder={placeholder} {...restProps} />
          ) : (
            <textarea className={styles['input__inner']} placeholder={placeholder}  />
            )
        }

        { action && (
          <div className={styles['input__action']}>
            { action }
          </div>
          )
        }
      </div>

      { footer }
    </div>
  )
}

// TODO: Типизировать.
export const Input = forwardRef<any, any>(InputInner)
