import { UploadFile } from 'antd'
import { createEvent, createStore, sample } from 'effector'
import { not } from 'patronum'

import { createBenchFx } from 'features/bench/create/api'

// import { effects } from 'entities/bench/api'

import { OptionType } from 'shared/types'

// TOOD: Добавить attach
const latChanged = createEvent<string>()
const lngChanged = createEvent<string>()
const tagsChanged = createEvent<Array<string>>()
const imagesChanged = createEvent<Array<UploadFile>>()
const formSubmitted = createEvent()
const dialogOpened = createEvent()
const dialogClosed = createEvent()

const $tags = createStore<Array<string>>([])
const $tagsOptions = createStore<Array<OptionType>>([])
const $lat = createStore('')
const $lng = createStore('')
const $images = createStore<Array<UploadFile>>([])
const $isFormDisabled = createStore(false) // TODO: Добавить логику для блокировки формы
const $isDialogOpen = createStore(false)

// TODO: Добавить тип возвращаемого значения
// TODO: Добавить валидацию

$lat.on(latChanged, (_, lat) => lat)
$lng.on(lngChanged, (_, lng) => lng)
$images.on(imagesChanged, (_, images) => images)
$tags.on(tagsChanged, (_, tags) => tags)
// TODO: Разобраться с типами
// @ts-ignore
// $tagsOptions.on(effects.getTagsOptionsFx.doneData, (_, { data }) => data.map((tag) =>
//   ({ label: tag.title, value: tag.id })))
$isDialogOpen.on(dialogOpened, () => true)
$isDialogOpen.on(dialogClosed, () => false)

sample({
  clock: dialogOpened,
  // target: effects.getTagsOptionsFx,
})

sample({
  clock: formSubmitted,
  source: { lat: $lat, lng: $lng, tags: $tags, images: $images },
  filter: not(createBenchFx.pending), // TODO: Изменить на $isFormDisabled
  target: createBenchFx,
})

sample({
  clock: createBenchFx.done,
  fn: () => dialogClosed(), // TODO: unit call from pure function is deprecated, use operators like sample instead
})

// TODO: Переделать
// sample({
//   clock: createBenchFx.done,
//   // fn: () => effects.getModerationBenchesFx({
//   //   per_page: 100
//   // })
// })

export const createBenchSelectors = {
  tags: $tags,
  tagsOptions: $tagsOptions,
  lat: $lat,
  lng: $lng,
  images: $images,
  isFormDisabled: $isFormDisabled,
  isDialogOpen: $isDialogOpen,
}

export const createBenchEvents = {
  latChanged,
  lngChanged,
  tagsChanged,
  imagesChanged,
  formSubmitted,
  dialogOpened,
  dialogClosed,
}
