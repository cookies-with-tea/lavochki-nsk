import { createEffect } from 'effector'

import { CreateBenchPayloadType } from 'src/features/bench/create/types'

import { benchesApi } from 'shared/api'

export const createBenchFx = createEffect<CreateBenchPayloadType, any, Error>(async (payload) => {
  const formData = new FormData()

  formData.append('lat', String(payload.lat))
  formData.append('lng', String(payload.lng))

  if (payload?.tags?.length) {
    payload.tags.forEach((tag) => {
      formData.append('tags', String(tag))
    })
  }

  payload.images.forEach((image) => {
    formData.append('images', image.originFileObj as File)
  })

  return await benchesApi.createBench(formData)
})
