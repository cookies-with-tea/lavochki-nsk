import { combine, createEvent, createStore, sample } from 'effector'

import { benchesEffects } from 'entities/bench/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

const pageChanged = createEvent<number>()

const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)
const $page = createStore<number>(INITIAL_PAGE_PARAMS.page)
const $total = createStore<number>(INITIAL_PAGE_PARAMS.total)
const $benches = createStore<Array<BenchType>>([])

$benches.on(benchesEffects.getModerationBenchesFx.doneData, (_, { data }) => {
  return data.items
})
$page
  .on(pageChanged, (_, page) => page)
  .on(benchesEffects.getModerationBenchesFx.doneData, (_, { data }) => data.pagination.current_page)
$total.on(benchesEffects.getModerationBenchesFx.doneData, (_, { data }) => data.pagination.count)

// TODO: Добавить $pagination.on
const $pagination = combine($perPage, $page, $total, (perPage, page, total) => ({ perPage, page, total }))

const $isBenchesPending = benchesEffects.getModerationBenchesFx.pending

sample({
  clock: pageChanged,
  source: { moderationBenchesPagination: $pagination },
  target: benchesEffects.getModerationBenchesFx,
})

export const moderationBenchesEvents = {
  pageChanged,
}

export const moderationBenchesSelectors = {
  benches: $benches,
  isBenchesPending: $isBenchesPending,
  pagination: $pagination,
}
