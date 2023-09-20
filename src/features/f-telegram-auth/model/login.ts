import { createEffect, createEvent, createStore } from 'effector'

import { UserType } from 'shared/types'
import { AuthorizationResponseType } from 'shared/types/user'

import { usersApi } from './../../../shared/api/users'

const logoutUserFx = createEffect()

export const loginUserFx = createEffect<UserType, AuthorizationResponseType, Error>(async (user) => {
  usersApi.login(user)

  return {
    access: '123',
    refresh: '312',
  } 
})

export const $user = createStore<UserType | null>(null).reset(logoutUserFx)
