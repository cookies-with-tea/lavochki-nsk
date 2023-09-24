import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import styles from 'app/layouts/guest/ui/styles.module.scss'

export const GuestLayout = () => {
	return (
		<div className={styles['guest-layout']}>
			<Suspense
				fallback={
					<p>Loading</p>
				}
				>
					<Outlet />
			</Suspense>
		</div>
	)
}