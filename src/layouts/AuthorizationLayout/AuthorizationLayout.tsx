import { Outlet } from 'react-router-dom'
import styles from './AuthorizationLayout.module.scss'

export const AuthorizationLayout = () => {
  return (
    <div className={styles['authorization-layout']}>
      <Outlet />
    </div>
  )
}
