import { createEffect, createEvent, createStore, sample } from 'effector'

import { INITIAL_BENCH_PAGE_PARAMS } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { getBenchesFx, getModerationBenchesFx } from '../api'
export const $activeTab = createStore<string>(INITIAL_BENCH_PAGE_PARAMS.initialTab)

export const tabChanged = createEvent<string>('benches')

export const tabChangeFx = createEffect((activeTab: string) => {
  if (activeTab === 'benches') {
    return getBenchesFx({
      per_page: 100,
    })
  }

  return getModerationBenchesFx({
    per_page: 100,
    sort_by: 'id',
    sort_order: 'DESC'
  })
})

$activeTab.on(tabChanged, (_, tab) => tab)
selectors.benches.on((tabChangeFx.doneData), (_, { data }) => data.items)

sample({
  clock: tabChanged,
  source: { ...$activeTab },
  target: tabChangeFx,
})

export const changeTableEvents = {
  tabChanged,
}