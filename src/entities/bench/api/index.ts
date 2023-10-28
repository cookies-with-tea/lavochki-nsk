import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi, tagsApi } from 'shared/api'

const getTagsOptionsFx = createEffect<void, any, AxiosError>(async () => await tagsApi.get())
const getBenchesFx = createEffect<any, any, Error>(async (payload) => await benchesApi.getBenches({}))
export const getModerationBenchesFx = createEffect<
  any,
  any,
  Error
>(async () => await benchesApi.getModerationBenches({}))
export const benchesEffects = {
  getTagsOptionsFx,
  getBenchesFx,
  getModerationBenchesFx,
}
