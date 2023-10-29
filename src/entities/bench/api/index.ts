import { AxiosError } from 'axios'
import { createEffect } from 'effector'

import { benchesApi, tagsApi } from 'shared/api'

const getTagsOptionsFx = createEffect<void, any, AxiosError>(async () => await tagsApi.get())
const getBenchesFx = createEffect<any, any, Error>(async (payload) => {
  console.log(payload)
  return await benchesApi.getBenches(payload?.pagination ?? payload.simpleBenchesPagination)
})
export const getModerationBenchesFx = createEffect<
  any,
  any,
  Error
>(async ({ moderationBenchesPagination }) => await benchesApi.getModerationBenches(moderationBenchesPagination))
export const benchesEffects = {
  getTagsOptionsFx,
  getBenchesFx,
  getModerationBenchesFx,
}
