import { createEvent, createStore, sample } from 'effector'
import { attach } from 'effector'
import { createForm } from 'effector-forms'

import { benchApiFx } from '#entities/bench'

import { notificationFx } from '#shared/ui'
import { cancelModalEvents } from '#shared/ui/UiCancelModal/model'

const attachedCreateBenchFx = attach({ effect: benchApiFx.createFx })
const attachedGetTagsFx = attach({ effect: benchApiFx.getTagsFx })

export const createBenchForm = createForm<Omit<BenchTypes.Create, 'owner'>>({
  fields: {
    lat: {
      init: 0,
      rules: [
        {
          name: 'lat',
          validator: (value) => Boolean(value),
          errorText: 'Поле обязательно для заполнения',
        },
      ],
      validateOn: ['change'],
    },
    lng: {
      init: 0,
      rules: [
        {
          name: 'lat',
          validator: (value) => Boolean(value),
          errorText: 'Поле обязательно для заполнения',
        },
      ],
      validateOn: ['change'],
    },
    tags: {
      init: [],
    },
  },
  validateOn: ['submit'],
})

const modalOpened = createEvent()
const modalClosed = createEvent()

const $tagsOptions = createStore<Array<CommonTypes.Option>>([])
const $images = createStore<Array<any>>([])
const $isModalOpen = createStore(false)

$tagsOptions.on(attachedGetTagsFx.doneData, (_, tags) => {
  return tags.map((tag) => ({ label: tag.title, value: tag.id }))
})

$isModalOpen
  .on(modalOpened, () => true)
  .on(cancelModalEvents.submitted, () => false)
  .on(attachedCreateBenchFx.doneData, () => false)

sample({
  clock: modalClosed,
  target: cancelModalEvents.modalOpened,
})

sample({
  clock: cancelModalEvents.submitted,
  target: createBenchForm.reset,
})

sample({
  clock: createBenchForm.formValidated,
  target: attachedCreateBenchFx,
})

sample({
  clock: modalOpened,
  target: attachedGetTagsFx,
})

sample({
  clock: attachedCreateBenchFx.doneData,
  fn: () => ({ message: 'Успешно', title: 'Создание лавочки' }),
  target: notificationFx,
})

sample({
  clock: attachedCreateBenchFx.doneData,
  target: createBenchForm.reset,
})

export const createBenchSelectors = {
  tagsOptions: $tagsOptions,
  images: $images,
  isModalOpen: $isModalOpen,
}

export const createBenchEvents = {
  modalOpened,
  modalClosed,
}
