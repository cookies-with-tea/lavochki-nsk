import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi } from 'shared/api'
import { BenchType } from 'shared/types'

export const deleteBenchFx = createEffect<BenchType['id'], any, AxiosError>(async (id) => await benchesApi.delete(id))

