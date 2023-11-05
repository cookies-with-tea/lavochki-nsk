import styles from '@/components/shared/badge/ui/style.module.scss'
import { cl } from '@/shared/lib/utils'

export const BaseBadge = () => {
  const classNames = cl({
    path: styles,
    classNames: ['base-badge'],
  })

  return (
    <div className={classNames}>
      badge
    </div>
  )
}
