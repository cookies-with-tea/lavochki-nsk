import { createEffect } from 'effector'

import { benchApi } from '#shared/api'

const getAllFx = createEffect<void, BenchTypes.All>(async () => await benchApi.getAll())

export const benchApiFx = {
  getAllFx,
}
