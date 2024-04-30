import { createEvent, createStore } from 'effector'

const $isModalOpen = createStore<boolean>(false)

const modalOpened = createEvent()
const modalClosed = createEvent()
const submitted = createEvent()
const canceled = createEvent()

$isModalOpen
  .on(modalOpened, () => true)
  .on(modalClosed, () => false)
  .on(submitted, () => false)
  .on(canceled, () => false)

export const cancelModalEvents = {
  modalOpened,
  modalClosed,
  submitted,
  canceled,
}

export const cancelModalSelectors = {
  isModalOpen: $isModalOpen,
}
