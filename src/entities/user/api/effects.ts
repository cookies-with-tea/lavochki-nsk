import { createEffect } from 'effector/effector.umd'

import { userApi } from '#entities/user/api/repositories'

const getMeFx = createEffect<void, UserTypes.One>(async () => await userApi.getMe())
const getAll = createEffect<void, UserTypes.ResponseType>(async () => await userApi.getAll())

export const userApiFx = {
  getMeFx,
  getAll,
}
