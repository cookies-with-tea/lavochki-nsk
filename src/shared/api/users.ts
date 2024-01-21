import { TelegramUserType } from '@/shared/types/telegram'
import { useFetch } from '@/shared/lib/hooks'
import { UserTypes } from '@/shared/types/users'

export const create = async (user: TelegramUserType) => {
  return await useFetch<UserTypes.CreateResponseType>('users', {
    method: 'post',
    json: user,
  })
}

export const usersApi = {
  create,
} as const
