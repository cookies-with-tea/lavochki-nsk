import { attach, createEvent, createStore, sample } from 'effector'

import { benchApiFx } from '@/entities/bench'

const attachedFx = attach({ effect: benchApiFx.getOneFx })
const updateAttachedFx = attach({ effect: benchApiFx.updateOneFx })

export const $detailBench = createStore<BenchTypes.One | null>(null)
export const $isDrawerOpen = createStore(false)
export const $isDialogOpen = createStore(false)

export const drawerOpened = createEvent<BenchTypes.One['id']>()
export const drawerClosed = createEvent()

export const dialogOpened = createEvent<BenchTypes.One['id']>()
export const dialogClosed = createEvent()

$isDrawerOpen.on(drawerOpened, () => true)
$isDrawerOpen.on(drawerClosed, () => false)
$isDialogOpen.on(dialogOpened, () => true)
$isDialogOpen.on(dialogClosed, () => false)

$detailBench
  .on(attachedFx.doneData, (_, data) => data)
  .on(drawerClosed, () => null)
  .on(dialogClosed, () => null)

sample({
  clock: updateAttachedFx.done,
  fn: () => dialogClosed,
})

sample({
  clock: drawerOpened,
  target: attachedFx,
})

sample({
  clock: dialogOpened,
  target: attachedFx,
})

export const detailBenchEvents = {
  drawerOpened,
  drawerClosed,
  dialogOpened,
  dialogClosed,
}

export const detailBenchSelectors = {
  detailBench: $detailBench,
  isDrawerOpen: $isDrawerOpen,
  isDialogOpen: $isDialogOpen,
  isLoading: attachedFx.pending,
}
