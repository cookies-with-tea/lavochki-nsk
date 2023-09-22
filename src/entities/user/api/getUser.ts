import { usersApi } from 'shared/api/users'

export const getMe = async () => {
  return await usersApi.getMe()
}