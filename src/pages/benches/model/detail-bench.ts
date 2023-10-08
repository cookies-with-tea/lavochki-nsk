import { notification } from 'antd'
import { createEvent, createStore, sample } from 'effector'

import { getDetailBenchFx } from 'pages/benches/api/benches'

import { BenchType } from 'shared/types'

export const $detailBench = createStore<BenchType | null>(null)
export const $isDrawerOpen = createStore(false)

export const drawerOpened = createEvent<BenchType['id']>()
export const drawerClosed = createEvent()

// TODO: Сделать так, если приходит ошибка с backend'а,
// то диалог не открывать
$isDrawerOpen.on(drawerOpened, () => true)
$isDrawerOpen.on(drawerClosed, () => false)
$detailBench.on(getDetailBenchFx.doneData, (_, { data }) => data)

sample({
  clock: drawerOpened,
  target: getDetailBenchFx,
})

sample({
  clock: getDetailBenchFx.fail,
  fn: () => {
    // TODO: detail-bench.ts:28 Warning: [antd: notification]
    // Static function can not consume context like dynamic theme. Please use 'App' component instead.
    notification.open({
      type: 'error',
      message: 'Ошибка получения данных'
    })

    drawerClosed()
  }
})

export const events = {
  drawerOpened,
  drawerClosed,
}

export const selectors = {
  detailBench: $detailBench,
  isDrawerOpen: $isDrawerOpen,
}
