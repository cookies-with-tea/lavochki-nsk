import { attach, createEvent, createStore, sample } from 'effector'

import { benchApiFx } from '#entities/bench'

const attachedFx = attach({ effect: benchApiFx.getOneFx })

const $detailBench = createStore<BenchTypes.One | null>(null)
const $isDrawerOpen = createStore(false)

const drawerOpened = createEvent<BenchTypes.One['id']>()
const drawerClosed = createEvent()

$isDrawerOpen.on(drawerOpened, () => true).on(drawerClosed, () => false)
$detailBench.on(attachedFx.doneData, (_, data) => data).on(drawerClosed, () => null)

sample({
  clock: drawerOpened,
  target: attachedFx,
})

export const detailBenchEvents = {
  drawerOpened,
  drawerClosed,
}

export const detailBenchSelectors = {
  detailBench: $detailBench,
  isDrawerOpen: $isDrawerOpen,
  isLoading: attachedFx.pending,
}
