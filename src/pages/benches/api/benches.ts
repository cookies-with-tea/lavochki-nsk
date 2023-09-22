import { benchesApi } from 'shared/api'

export const getApiBenches = async () => {
  return await benchesApi.getBenches()
}

export const getApiModerationBenches = async () => {
  return await benchesApi.getModerationBenches()
}
