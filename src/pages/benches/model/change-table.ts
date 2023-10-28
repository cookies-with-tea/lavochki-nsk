import { createEffect, createEvent, createStore, sample } from 'effector'

import { INITIAL_BENCH_PAGE_PARAMS } from 'pages/benches/constants'
// import { selectors } from 'pages/benches/model/benches'

// import { effects } from 'entities/bench/api'
import { deleteBenchEvents } from 'features/bench/delete/model'
import { deleteBenchFx } from 'features/bench/delete/api'
import { useUnit } from 'effector-react'
export const $activeTab = createStore<string>(INITIAL_BENCH_PAGE_PARAMS.initialTab)

export const tabChanged = createEvent<string>('benches')

export const tabChangeFx = createEffect((activeTab: string) => {
  // if (activeTab === 'benches') {
  //   return effects.getBenchesFx({
  //     per_page: 100,
  //     sort_by: 'id',
  //     sort_order: 'DESC'
  //   })
  // }
  //
  // return effects.getModerationBenchesFx({
  //   per_page: 100,
  //   sort_by: 'id',
  //   sort_order: 'DESC'
  // })
})

// TODO: Объединить с функцией выше
const getBenchesByTabFx = createEffect(() => {
  // if ($activeTab.getState() === 'benches') {
  //   return effects.getBenchesFx({
  //     per_page: 100,
  //     sort_by: 'id',
  //     sort_order: 'DESC'
  //   })
  // }
  //
  // return effects.getModerationBenchesFx({
  //   per_page: 100,
  //   sort_by: 'id',
  //   sort_order: 'DESC'
  // })
})

$activeTab.on(tabChanged, (_, tab) => tab)
// @ts-ignore
// selectors.benches.on((tabChangeFx.doneData), (_, { data }) => data.items)

sample({
  clock: tabChanged,
  source: { ...$activeTab },
  target: tabChangeFx,
})

// После удаления лавочки сделать повторный запрос.
sample({
  clock: deleteBenchFx.doneData,
  target: getBenchesByTabFx,
})

export const changeTableEvents = {
  tabChanged,
}
