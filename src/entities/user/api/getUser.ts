import { createEffect } from 'effector'

import { usersApi } from 'shared/api'

export const getUserFx = createEffect(async () => {
  return await usersApi.getMe()
})