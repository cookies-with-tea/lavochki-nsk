import { UploadFile } from 'antd'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { not } from 'patronum'

import { CreateBenchPayloadType } from 'pages/benches/types/bench'

import { benchesApi } from 'shared/api'

export const latChanged = createEvent<string>()
export const lngChanged = createEvent<string>()
export const tagsChanged = createEvent<Array<string>>()
export const imagesChanged = createEvent<Array<UploadFile>>()
export const formSubmitted = createEvent()
export const dialogToggled = createEvent<boolean>()
export const openModal = createEvent()
export const closeModal = createEvent()

export const $tags = createStore<Array<string>>([])
export const $lat = createStore('')
export const $lng = createStore('')
export const $images = createStore<Array<UploadFile>>([])
export const $isFormDisabled = createStore(false) // TODO: Добавить логику для блокировки формы
export const $isOpenModal = createStore(false)

// TODO: Добавить тип возвращаемого значения
export const createBenchFx = createEffect<CreateBenchPayloadType, any, Error>(async (payload) => {
  const formData = new FormData()

  formData.append('lat', String(payload.lat))
  formData.append('lng', String(payload.lng))

  if (payload.tags.length) {
    payload.tags.forEach((tag) => {
      formData.append('tags', String(tag))
    })
  }

  if (payload.images?.length) {
    payload.images.forEach((image) => {
      formData.append('images', image.originFileObj as File)
    })
  }

  return benchesApi.createBench(formData)
})

$lat.on(latChanged, (_, lat) => lat)
$lng.on(lngChanged, (_, lng) => lng)
$tags.on(tagsChanged, (_, tags) => tags)
$images.on(imagesChanged, (_, images) => images)
$isOpenModal.on(openModal, () => true)
$isOpenModal.on(closeModal, () => false)

sample({
  clock: formSubmitted,
  source: { lat: $lat, lng: $lng, tags: $tags, images: $images },
  filter: not(createBenchFx.pending), // TODO: Изменить на $isFormDisabled
  target: createBenchFx, 
})

sample({
  clock: createBenchFx.done,
  fn: () => closeModal(),
})
