import { createEvent, createStore } from 'effector'

export const openModal = createEvent()
export const closeModal = createEvent()

export const $isOpenModal = createStore(false)

$isOpenModal.on(openModal, () => true)
$isOpenModal.on(closeModal, () => false)
