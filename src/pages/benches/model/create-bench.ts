import { createEffect, createEvent, createStore, sample } from 'effector'
import { not } from 'patronum'

import { CreateBenchPayloadType } from 'pages/benches/types/bench'

import { benchesApi } from 'shared/api'

export const $tags = createStore<Array<string>>([])
export const $lat = createStore('')
export const $lng = createStore('')
export const $isFormDisabled = createStore(false) // TODO: Добавить логику для блокировки формы

export const latChanged = createEvent<string>()
export const lngChanged = createEvent<string>()
export const tagsChanged = createEvent<Array<string>>()
export const formSubmitted = createEvent()

// TODO: Добавить тип возвращаемого значения
export const createBenchFx = createEffect<CreateBenchPayloadType, any, Error>((payload) => {
  const formData = new FormData()

  formData.append('lat', String(payload.lat))
  formData.append('lng', String(payload.lng))

  if (payload.tags.length) {
    payload.tags.forEach((tag) => {
      formData.append('tag', String(tag))
    })
  }

  return benchesApi.createBench(formData)
})

$lat.on(latChanged, (_, lat) => lat)
$lng.on(lngChanged, (_, lng) => lng)
$tags.on(tagsChanged, (_, tags) => tags)

sample({
  clock: formSubmitted,
  source: { lat: $lat, lng: $lng, tags: $tags },
  filter: not(createBenchFx.pending), // TODO: Изменить на $isFormDisabled
  target: createBenchFx, 
})
