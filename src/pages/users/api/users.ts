import { usersApi } from 'shared/api'

export const getApiUsers = async () => {
  return await usersApi.getAll()
}
