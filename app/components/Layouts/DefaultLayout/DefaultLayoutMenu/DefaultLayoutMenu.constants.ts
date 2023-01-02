import { MenuItemType } from '@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu/DefaultLayoutMenu.types'

export const menuItems: MenuItemType[] = [
  {
    title: 'Профиль',
    url: '/profile#general',
    icon: 'profile',
  },
  {
    title: 'Настройки',
    url: '/profile#settings',
    icon: 'settings'
  },
  {
    title: 'Уведомления',
    url: '/profile#general',
    icon: 'notifications'
  },
]