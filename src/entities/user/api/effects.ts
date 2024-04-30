import { createEffect } from 'effector'

import { userApi } from '#entities/user/api/repositories'

const getMeFx = createEffect<void, UserTypes.One>(async () => await userApi.getMe())
const getAllFx = createEffect<void, UserTypes.ResponseType>(async () => await userApi.getAll())

export const userApiFx = {
  getMeFx,
  getAllFx,
}
