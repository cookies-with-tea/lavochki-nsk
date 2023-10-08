import { UploadFile } from 'antd'
import { createEvent, createStore, sample } from 'effector'

import { getDetailBenchFx } from 'pages/benches/api'

import { editBenchFx } from 'features/bench/edit/api'

import { effects } from 'entities/bench/api'

import { BenchType, OptionType } from 'shared/types'
import { not } from 'patronum'
import { createBenchFx } from 'pages/benches/model/create-bench'
import { useUnit } from 'effector-react'
// TODO: Перенести
// TODO: Часть полей create / edit повторяется

const latChanged = createEvent<string>()
const lngChanged = createEvent<string>()
const tagsChanged = createEvent<Array<string>>()
const imagesChanged = createEvent<Array<UploadFile>>()
const formSubmitted = createEvent()
const dialogOpened = createEvent<BenchType['id']>()
const dialogClosed = createEvent()

const $detailBench = createStore<BenchType | null>(null)
const $detailBenchId = createStore<BenchType['id'] | null>(null)
const $tags = createStore<Array<string>>([])
const $tagsOptions = createStore<Array<OptionType>>([])
const $lat = createStore('')
const $lng = createStore('')
const $images = createStore<Array<UploadFile>>([])
const $isFormDisabled = createStore(false) // TODO: Добавить логику для блокировки формы
const $isDialogOpen = createStore(false)

// TODO: Переделать на combine
// const data = combine()

$detailBench.on(getDetailBenchFx.doneData, (_, { data }) => data)
$lat.on(latChanged, (_, lat) => {
  console.log(lat)
  return lat
})
$lng.on(lngChanged, (_, lng) => lng)
$images.on(imagesChanged, (_, images) => images)
$tags.on(tagsChanged, (_, tags) => tags)
$detailBenchId.on(getDetailBenchFx.doneData, (_, { data }) => data.id)
// TODO: Разобраться с типами
// @ts-ignore
$tagsOptions.on(effects.getTagsOptionsFx.doneData, (_, { data }) => data.map((tag) =>
  ({ label: tag.title, value: tag.id })))
$isDialogOpen.on(dialogOpened, () => true)
$isDialogOpen.on(dialogClosed, () => false)

sample({
  clock: dialogOpened,
  target: [effects.getTagsOptionsFx, getDetailBenchFx],
})

sample({
  clock: formSubmitted,
  source: { id: $detailBenchId, lat: $lat, lng: $lng, tags: $tags, },
  target: editBenchFx,
})

getDetailBenchFx.doneData.watch(({ data }) => {
  latChanged(data.lat)
  lngChanged(data.lng)
})

sample({
  clock: editBenchFx.done,
  target: dialogClosed
})

sample({
  clock: editBenchFx.done,
  fn: () => effects.getBenchesFx({
    per_page: 100,
  })
})

export const events = {
  latChanged,
  lngChanged,
  tagsChanged,
  imagesChanged,
  formSubmitted,
  dialogOpened,
  dialogClosed,
}

export const selectors = {
  tags: $tags,
  tagsOptions: $tagsOptions,
  lat: $lat,
  lng: $lng,
  images: $images,
  isFormDisabled: $isFormDisabled,
  isDialogOpen: $isDialogOpen,
}
