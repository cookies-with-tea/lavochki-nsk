import { ButtonHTMLAttributes } from 'react'


export const BaseButton = (props: ButtonHTMLAttributes<any>) => {
  return (
	<button type={'button'} {...props}>
		{props.children}
	</button>
  )
}
