import { useUnit } from 'effector-react'

import { usersColumns } from 'pages/users/constants/table'
import { selectors } from 'pages/users/model/users'

import { WTable } from 'widgets/w-table'

export const UsersTable = () => {
  return (
    <WTable dataSource={useUnit(selectors.users)} columns={usersColumns} />
  )
}