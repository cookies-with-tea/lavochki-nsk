import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi } from 'shared/api'
import { BenchType, SetDecisionPayloadType } from 'shared/types'

export const getBenchesFx = createEffect<any, any, Error>(async (payload) => await benchesApi.getBenches(payload))
export const getModerationBenchesFx = createEffect<
  any,
  any,
  Error
>(async (payload) => await benchesApi.getModerationBenches(payload))
export const getDetailBenchFx = createEffect<BenchType['id'], any, Error>(async (id) =>  await benchesApi.getDetail(id))

// TODO: Продумать расположение функций, когда запрос относится к одной таблице, но таблица находится в ui компонента
export const setDecisionBenchFx = createEffect<
  SetDecisionPayloadType,
  any,
  AxiosError
>(async (payload) => await benchesApi.setDecision(payload))
