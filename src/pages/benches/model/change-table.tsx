import { createEffect, createEvent, createStore, sample } from 'effector'

import { INITIAL_BENCH_PAGE_PARAMS } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { benchesApi } from 'shared/api'

export const $activeTab = createStore<string>(INITIAL_BENCH_PAGE_PARAMS.initialTab)

export const tabChanged = createEvent<string>()

export const getBenchesFx = createEffect(() => {
  return benchesApi.getBenches()
})

export const getModerationBenchesFx = createEffect(() => {
  return benchesApi.getModerationBenches()
})

export const tabChangeFx = createEffect((state) => {
  if (state.activeTab === '1') {
    return benchesApi.getBenches()
  }

  return benchesApi.getModerationBenches()
})

$activeTab.on(tabChanged, (_, tab) => tab)
selectors.benches.on((tabChangeFx.doneData), (_, { data }) => data.items)

sample({
  clock: tabChanged,
  source: { activeTab: $activeTab },
  target: tabChangeFx,
})

export const changeTableEvents = {
  tabChanged,
}