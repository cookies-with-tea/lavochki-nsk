import { MouseEvent, ReactNode } from 'react'
import styles from './styles.module.scss'
import cb from 'classnames/bind'
import cn from 'classnames'

const cx = cb.bind(styles)
interface IDialogContentProps {
  children: ReactNode

  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

export const DialogContent = ({ children, onClick }: IDialogContentProps) => {
  return (
    <div className={cn('modalContent', cx('dialog__content'))} onClick={onClick}>
      { children }
    </div>
  )
}
