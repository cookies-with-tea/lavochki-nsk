import styles from './styles.module.scss'
import cb from 'classnames/bind'
import { Icon } from '@/components/shared'
import { MouseEvent } from 'react'

const cx = cb.bind(styles)

interface IDialogHeaderProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const DialogHeader = ({ onClick }: IDialogHeaderProps) => {
  return (
    <div className={cx('dialog__header')}>
      <button type={'button'} onClick={onClick}>
        <Icon name={'close'}/>
      </button>
    </div>
  )
}
