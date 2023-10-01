import { notification } from 'antd'
import { AxiosError } from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'

import { authUser } from 'features/f-telegram-auth/api'

import { useDictionary, useLocalStorage } from 'shared/lib/hooks'
import { ApiErrorResponseType } from 'shared/plugins/axios'
import { UserTelegramType } from 'shared/types'

// TODO: Добавить reset
// TODO: Вынести user в entities/user/model
export const $user = createStore<UserTelegramType | null>(null)
export const $isAuthorized = createStore(false)
export const $accessToken = createStore('')
export const $refreshToken = createStore('')

export const onAuthorized = createEvent()
export const getMe = createEvent()

// TODO: Разобраться с типизацией
export const loginUserFx = createEffect<
  any,
  any,
  AxiosError<ApiErrorResponseType>
>
(async (user) => await authUser(user))

export const logoutFx = createEffect<void, void, void>(() => {
  const { remove } = useLocalStorage()

  remove('accessToken')
  remove('refreshToken')

 location.assign('/login')
})

loginUserFx.failData.watch((error) => {
  const errorResponse = error.response?.data

  const { errorsDictionary } = useDictionary()

  if (errorResponse?.details && Object.values(errorResponse.details)) {
    Object.entries(errorResponse?.details).forEach(([key, errorMessage]) => {
      notification.open({
        message: 'Ошибка авторизации',
        type: 'error',
        description: `Поле: ${key} ${errorsDictionary[errorMessage]}`,
      })
    })
  }
})

$accessToken.on(loginUserFx.doneData, (_, { data }) => {
  const { set } = useLocalStorage()

  const accessToken = data.access

  set('accessToken', accessToken)

  return accessToken
})

$refreshToken.on(loginUserFx.doneData, (_, { data }) => {
  const { set } = useLocalStorage()

  const refreshToken = data.refresh

  set('refreshToken', refreshToken)

  return refreshToken
})

loginUserFx.doneData.watch(() => {
  location.assign('/  ')
})

$user.reset(logoutFx)

// TODO: Сделать { ...$user }
sample({
  clock: onAuthorized,
  source: { user: $user },
  target: loginUserFx
})


export const effects = {
  loginUserFx,
  logoutFx,
}
