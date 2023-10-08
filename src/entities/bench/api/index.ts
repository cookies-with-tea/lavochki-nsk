import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi, tagsApi } from 'shared/api'

const getTagsOptionsFx = createEffect<void, any, AxiosError>(async () => await tagsApi.get())
const getBenchesFx = createEffect<any, any, Error>(async (payload) => await benchesApi.getBenches(payload))
export const getModerationBenchesFx = createEffect<
  any,
  any,
  Error
>(async (payload) => await benchesApi.getModerationBenches(payload))
export const effects = {
  getTagsOptionsFx,
  getBenchesFx,
  getModerationBenchesFx,
}
