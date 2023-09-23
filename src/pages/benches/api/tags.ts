import { tagsApi } from 'shared/api'

export const getApiTags = async () => {
  return await tagsApi.get()
}
