import { Button, ButtonProps } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { ReactElement } from 'react'

import styles from 'shared/ui/s-button/ui/styles.module.scss'

interface IProps extends ButtonProps {
  appearance?: 'primary' | 'link' | 'text' | 'default' | 'dashed'
  prefixIcon?: ReactElement
  postfixIcon?: ReactElement
}

const cx = cnBind.bind(styles)

export const SButton = <T = unknown>({
  appearance = 'default',
  children,
  className = '',
  htmlType = 'button',
  size = 'middle',
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