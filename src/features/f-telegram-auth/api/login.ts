import { usersApi } from 'shared/api'
import { UserType } from 'shared/types'

export const authUser = async (user: UserType) => {
  return await usersApi.login(user)
}