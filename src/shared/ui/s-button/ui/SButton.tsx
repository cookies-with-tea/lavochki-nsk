import { Button } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { ReactNode, ReactElement } from 'react'

import styles from 'shared/ui/s-button/ui/styles.module.scss'

interface IProps {
  className?: string
  appearance?: 'primary' | 'link' | 'text' | 'default' | 'dashed'
  size?: 'sm' | 'md'
  children: ReactNode
  prefixIcon?: ReactElement
  postfixIcon?: ReactElement
  disabled?: boolean
  loading?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'

  onClick?: () => void
}

const cx = cnBind.bind(styles)

export const SButton = ({
  appearance = 'default',
  children,
  className = '',
  htmlType = 'button',
  size = 'md',
  prefixIcon,
  postfixIcon,
  disabled = false,
  loading = false,
  block = false,

  onClick,
}: IProps
) => {
  const classNames = cn(
    's-button',
    cx(
      's-button',
      { disabled },
      { loading },
      { prefixIcon: !!prefixIcon },
      { postfixIcon: !!postfixIcon },
      `s-button--${appearance}`,
      `s-button--${size}`
    ),
    className
  )

  return (
    <Button
      disabled={disabled}
      type={appearance}
      className={classNames}
      icon={postfixIcon}
      loading={loading}
      block={block}
      htmlType={htmlType}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}