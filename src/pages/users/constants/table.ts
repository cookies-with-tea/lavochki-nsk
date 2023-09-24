import { ColumnsType } from 'antd/es/table'

import { UserType } from '../model/users'

export const usersColumns: ColumnsType<UserType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Telegram ID',
    dataIndex: 'telegram_id',
    key: 'telegram_id',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Имя пользователя',
    dataIndex: 'username',
    key: 'username',
  }
]