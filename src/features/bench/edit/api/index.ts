import { createEffect } from 'effector/effector.umd'

import { benchesApi } from 'shared/api'
import { UpdateBenchType } from 'shared/types'
import { urlToObject } from 'shared/lib/utils'

export const editBenchFx = createEffect<UpdateBenchType, any, any>(async (payload) => {
  const formData = new FormData()

  formData.append('lat', String(payload.lat))
  formData.append('lng', String(payload.lng))

  if (payload?.tags?.length) {
    payload.tags.forEach((tag) => {
      formData.append('tags', String(tag))
    })
  }

  // TODO: Добавить редактирование изображений
  for (const image of payload.images) {
    if (!image?.originFileObj) {
      const newImage = await urlToObject(image.url)
      console.log(newImage)
      formData.append('images', newImage as File)
    } else {
      console.log('file 2', image.originFileObj)
      formData.append('images', image.originFileObj as File)
    }
  }

  return await benchesApi.update(payload.id, formData)
})
