import { notification } from 'antd'
import { createEvent, createStore, sample } from 'effector'

import { getUserFx } from 'entities/user/api/getUser'

import { UserType } from 'shared/types'
import { errorsDictionary } from 'shared/constants'

const $user = createStore<UserType | null>(null)

const userChanged = createEvent()

// TODO: Разобраться с типами
// @ts-ignore
$user.on(getUserFx.doneData, (_, { data }: { data: UserType }) => {
  if (!data) return null

  if (data.role === 'user') {
    setTimeout(() => {
      notification.open({
        type: 'error',
        message: 'Недостаточно прав'
      })
    }, 1000)

    if (window.location.pathname === '/login') return

    window.location.pathname = '/login'
  }

  return data
})

$user.on(getUserFx.failData, (_, data) => {
  if (window.location.pathname === '/login') return

  window.location.pathname = '/login'

  return null
})

sample({
  clock: userChanged,
  source: { ...$user },
  target: getUserFx,
})

export const events = {
  userChanged,
}

export const selectors = {
  user: $user,
}
