import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi } from 'shared/api'
import { BenchTypes } from 'shared/types'

export const acceptBenchFx = createEffect<BenchTypes.DecisionFormModel, any, AxiosError>(async (payload) => {
  return benchesApi.setDecision(payload)
})
