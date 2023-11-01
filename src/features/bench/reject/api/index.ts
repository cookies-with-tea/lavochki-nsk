import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { DecisionFormModelType } from 'shared/types'

export const rejectBenchFx = createEffect<DecisionFormModelType['message'], any, AxiosError>(async (payload) => {
  console.log(payload)

  return { success: true }
})
