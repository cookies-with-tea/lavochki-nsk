import { createEvent, createStore, sample } from 'effector'
import { attach } from 'effector'
import { createForm } from 'effector-forms'
import { not } from 'patronum'

import { benchApiFx } from '#entities/bench'

export const createBenchForm = createForm<BenchTypes.Create>({
  fields: {
    lat: {
      init: 0,
      rules: [
        {
          name: 'lat',
          validator: (value) => Boolean(value),
        },
      ],
    },
    lng: {
      init: 0,
      rules: undefined,
      filter: undefined,
      validateOn: undefined,
      units: undefined,
    },
    owner: {
      init: '',
      rules: undefined,
      filter: undefined,
      validateOn: undefined,
      units: undefined,
    },
    tags: {
      init: [],
      rules: undefined,
      filter: undefined,
      validateOn: undefined,
      units: undefined,
    },
  },
  validateOn: ['submit'],
})

const attachedCreateBenchFx = attach({ effect: benchApiFx.createFx })

// const localGetTagsFx = attach({ effect: getTagsFx })

const latChanged = createEvent<string>()
const lngChanged = createEvent<string>()
const tagsChanged = createEvent<Array<string>>()
const imagesChanged = createEvent<Array<any>>()
const formSubmitted = createEvent()
const dialogOpened = createEvent()
const dialogClosed = createEvent()

const $tags = createStore<Array<string>>([])
const $tagsOptions = createStore<Array<CommonTypes.Option>>([])
const $lat = createStore('')
const $lng = createStore('')
const $images = createStore<Array<any>>([])
const $isDialogOpen = createStore(false)

$lat.on(latChanged, (_, lat) => lat)
$lng.on(lngChanged, (_, lng) => lng)
$images.on(imagesChanged, (_, images) => images)
$tags.on(tagsChanged, (_, tags) => tags)
// $tagsOptions.on(localGetTagsFx.doneData, (_, tags) => {
//   return tags.map((tag) => ({ label: tag.title, value: tag.id }))
// })
$isDialogOpen.on(dialogOpened, () => true)
$isDialogOpen.on(dialogClosed, () => false)

sample({
  clock: createBenchForm.formValidated,
  target: attachedCreateBenchFx,
})

export const createBenchSelectors = {
  tags: $tags,
  tagsOptions: $tagsOptions,
  lat: $lat,
  lng: $lng,
  images: $images,
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
