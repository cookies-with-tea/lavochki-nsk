import styles from '@/components/shared/badge/ui/style.module.scss'
import { cl } from '@/shared/lib/utils'

export const BaseInput = () => {
  const classNames = cl({
    path: styles,
    classNames: ['base-input'],
  })

  return (
    <input className={classNames} />
  )
}
