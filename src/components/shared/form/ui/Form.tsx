'use client'

import { FormEvent, forwardRef, ReactNode } from 'react'

interface IFormProps {
  children?: ReactNode

  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

const FormInner = (props: IFormProps, ref: any) => {
  const { children, onSubmit  } = props

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSubmit && onSubmit(event)
  }

  return (
    <form ref={ref} onSubmit={onFormSubmit}>
      { children }
    </form>
  )
}

// TODO: Типизировать
export const Form = forwardRef<any, any>(FormInner)
