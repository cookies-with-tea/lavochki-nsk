// import { Space } from 'antd'
import { Outlet } from 'react-router-dom'

import styles from 'app/layouts/base/ui/styles.module.scss'

import { WHeader } from 'widgets/w-header'
import { WSidebar } from 'widgets/w-sidebar'
import { useUnit } from 'effector-react'
import { $user } from '@/features/f-telegram-auth/model/login'
import { useLocalStorage } from '@/shared/lib/hooks'

export const BaseLayout = () => {
	// const { get } = useLocalStorage()
	

	return (
		<div className={`${styles['base-layout']} d-flex container`}>
			<div className={styles['base-layout__content']}>
				<WSidebar />

				<div className={'w-100 container'}>
					<WHeader />

					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}