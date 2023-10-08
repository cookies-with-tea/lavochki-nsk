import { usersApi } from 'shared/api'
import { UserTelegramType } from 'shared/types'

export const authUser = async (user: UserTelegramType) => {
  return await usersApi.login(user)
}