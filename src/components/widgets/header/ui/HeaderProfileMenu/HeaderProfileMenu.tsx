import { HEADER_MENU_ITEMS } from '@/components/widgets/header/constants/header-menu'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import styles from './styles.module.scss'

export const HeaderProfileMenu = () => {
  return (
    <ul className={styles['header-profile-menu']}>
      { HEADER_MENU_ITEMS.map((item) => (
        <li key={item.title} className={styles['header-profile-menu__item']}>
          <Button as={Link} href={item.path} appearance={'link'}>
            <span>
              { item.title }
            </span>

            <Icon name={item.iconName} />
          </Button>
        </li>
      )) }

      <li className={styles['header-profile-menu__item']}>
        <Button appearance={'link'}>
          <span>Выйти</span>
          <Icon name={'logout'} />
        </Button>
      </li>
    </ul>
  )
}
