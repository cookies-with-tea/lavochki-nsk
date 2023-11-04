import { UploadFile } from 'antd'
import { createEvent, createStore, sample } from 'effector'
import { attach } from 'effector'
import { not } from 'patronum'

import { createBenchFx } from 'features/bench/create/api'

import { getTagsFx } from 'entities/tag'

const localGetTagsFx = attach({ effect: getTagsFx })

const latChanged = createEvent<string>()
const lngChanged = createEvent<string>()
const tagsChanged = createEvent<Array<string>>()
const imagesChanged = createEvent<Array<UploadFile>>()
const formSubmitted = createEvent()
const dialogOpened = createEvent()
const dialogClosed = createEvent()

const $tags = createStore<Array<string>>([])
const $tagsOptions = createStore<Array<CommonTypes.OptionType>>([])
const $lat = createStore('')
const $lng = createStore('')
const $images = createStore<Array<UploadFile>>([])
const $isFormDisabled = createStore(false) // TODO: Добавить логику для блокировки формы
const $isDialogOpen = createStore(false)

// TODO: Добавить валидацию

$lat.on(latChanged, (_, lat) => lat)
$lng.on(lngChanged, (_, lng) => lng)
$images.on(imagesChanged, (_, images) => images)
$tags.on(tagsChanged, (_, tags) => tags)
$tagsOptions.on(localGetTagsFx.doneData, (_, tags) => {
  return tags.map((tag) => ({ label: tag.title, value: tag.id }))
})
$isDialogOpen.on(dialogOpened, () => true)
$isDialogOpen.on(dialogClosed, () => false)

sample({
  clock: dialogOpened,
  target: localGetTagsFx,
})

sample({
  clock: formSubmitted,
  source: { lat: $lat, lng: $lng, tags: $tags, images: $images },
  filter: not(createBenchFx.pending), // TODO: Изменить на $isFormDisabled
  target: createBenchFx,
})

sample({
  clock: createBenchFx.done,
  target: dialogClosed,
})

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
