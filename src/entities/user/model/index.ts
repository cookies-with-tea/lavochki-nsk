import { createEvent, createStore, attach, sample } from 'effector'

import { userApiFx } from '#entities/user'

const getMeAttachedFx = attach({ effect: userApiFx.getMeFx })

const $user = createStore<UserTypes.One | null>(null)

const userChanged = createEvent()

$user.on(getMeAttachedFx.doneData, (_, data) => data)

sample({
  clock: userChanged,
  target: getMeAttachedFx,
})

export const userEvents = {
  userChanged,
}

export const userSelectors = {
  user: $user,
}
