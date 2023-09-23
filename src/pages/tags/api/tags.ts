import { tagsApi } from 'shared/api'

export const createApiTag = async (title: string) => {
  return await tagsApi.create(title)
}

export const getApiTags = async () => {
  return await tagsApi.get()
}