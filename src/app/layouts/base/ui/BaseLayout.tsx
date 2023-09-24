// import { Space } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import styles from 'app/layouts/base/ui/styles.module.scss'

import { WHeader } from 'widgets/w-header'
import { WSidebar } from 'widgets/w-sidebar'

export const BaseLayout = () => {
	return (
		<div className={`${styles['base-layout']} d-flex container`}>
			<div className={styles['base-layout__content']}>
				<WSidebar />

				<div className={'w-100 container'}>
					<WHeader />

					<main>
						<Suspense
							fallback={
								<p>Loading</p>
							}
							>
							<Outlet />
						</Suspense>
					</main>
				</div>
			</div>
		</div>
	)
}