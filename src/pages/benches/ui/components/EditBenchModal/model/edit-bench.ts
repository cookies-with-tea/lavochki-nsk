import { attach, createEvent, createStore, sample } from 'effector'

import { benchApiFx } from '#entities/bench'

const attachedFx = attach({ effect: benchApiFx.getOneFx })
const updateAttachedFx = attach({ effect: benchApiFx.updateOneFx })

const modalOpened = createEvent<BenchTypes.One['id']>()
const modalClosed = createEvent()

const $detailBench = createStore<BenchTypes.One | null>(null)
const $isModalOpen = createStore(false)

$isModalOpen.on(modalOpened, () => true).on(modalClosed, () => false)
$detailBench.on(attachedFx.doneData, (_, data) => data).on(modalClosed, () => null)

sample({
  clock: modalOpened,
  target: attachedFx,
})

sample({
  clock: updateAttachedFx.done,
  target: modalClosed,
})

export const editBenchEvents = {
  modalOpened,
  modalClosed,
}

export const editBenchSelectors = {
  isModalOpen: $isModalOpen,
  detailBench: $detailBench,
}
