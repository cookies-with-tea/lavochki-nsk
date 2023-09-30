import { createEvent, createStore, sample } from 'effector'

import { getUserFx } from 'entities/user/api/getUser'

import { UserType } from 'shared/types'

const $user = createStore<UserType | null>(null)

const userChanged = createEvent()

// TODO: Разобраться с типами
// @ts-ignore
$user.on(getUserFx.doneData, (_, { data }) => data)
$user.on(getUserFx.fail, () => null)

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
