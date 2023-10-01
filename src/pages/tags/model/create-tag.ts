import { AxiosError } from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'

import { createApiTag } from '../api/tags'

import { getTagsFx } from './tags'

export const tagNameChanged = createEvent<string>()
export const formSubmitted = createEvent()
export const openModal = createEvent()
export const closeModal = createEvent()

export const $tagName = createStore<string>('')
export const $isOpenModal = createStore(false)

export const createTagFx = createEffect<any, any, AxiosError>((title) => {
  return createApiTag(title)
})

$tagName.on(tagNameChanged, (_, tagName) => tagName)
$isOpenModal.on(openModal, () => true)
$isOpenModal.on(closeModal, () => false)

sample({
  clock: formSubmitted,
  source: { ...$tagName },
  target: createTagFx,
})

sample({
  clock: createTagFx.done,
  fn: () => closeModal() // TODO: unit call from pure function is deprecated, use operators like sample instead
})

sample({
  clock: closeModal,
  fn: () => getTagsFx(),
})
