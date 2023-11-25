import { BaseImage } from '@/components/shared/image/ui/BaseImage'
import cb from 'classnames/bind'
import styles from './styles.module.scss'
import { Tooltip } from '@/components/shared'
import { HeaderProfileMenu } from '@/components/widgets/header/ui/HeaderProfileMenu/HeaderProfileMenu'

const cx = cb.bind(styles)

export const HeaderProfile = () => {
	return (
  <div className={cx('header-profile')}>
    <span className={'mr-12'}>Никита</span>

    <Tooltip content={<HeaderProfileMenu />}>
      <BaseImage rounded width={64} height={64} src={'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'} alt={''} />
    </Tooltip>
  </div>
	)
}
