import { Outlet } from 'react-router-dom'

import styles from 'app/layouts/guest/ui/styles.module.scss'

export const GuestLayout = () => {
	return (
		<div className={styles['guest-layout']}>
			<Outlet />
		</div>
	)
}