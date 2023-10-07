import { createPortal } from 'react-dom'

import styles from 'shared/ui/s-loader/ui/styles.module.scss'

interface IProps {
  target: any
  loading?: boolean
}

// TODO: Добавить несколько анимаций на выбор
// TODO: Добавить возможность добавлять блюр на фон
// @ts-ignore
export const SLoader = ({ target, loading = false }: IProps) => {
  if (!loading) return null

  return (
    createPortal(
      <div className={styles['s-loader']}>
      <div className={styles['s-loader__inner']} />
    </div>
    , target ?? document.body)
   
  )
}