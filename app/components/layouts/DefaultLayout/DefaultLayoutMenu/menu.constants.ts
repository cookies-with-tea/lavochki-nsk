import {MenuItemType} from "@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/menu.types";

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