import { combine, createEvent, createStore, sample } from 'effector'

import { deleteBenchFx } from 'features/bench/delete/api'

import { benchesEffects } from 'entities/bench/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchTypes } from 'shared/types'

const pageChanged = createEvent<number>()

const $perPage = createStore<CommonTypes.Pagination['perPage']>(INITIAL_PAGE_PARAMS.perPage)
const $page = createStore<CommonTypes.Pagination['page']>(INITIAL_PAGE_PARAMS.page)
const $total = createStore<CommonTypes.Pagination['total']>(INITIAL_PAGE_PARAMS.total)
const $benches = createStore<BenchTypes.All>([])

$benches.on(benchesEffects.getBenchesFx.doneData, (_, { data }) => {
  return data.items
})
$page
  .on(pageChanged, (_, page) => page)
  .on(benchesEffects.getBenchesFx.doneData, (_, { data }) => data.pagination.current_page)
$total.on(benchesEffects.getBenchesFx.doneData, (_, { data }) => data.pagination.count)

// TODO: Добавить $pagination.on
const $pagination = combine($perPage, $page, $total, (perPage, page, total) => ({ perPage, page, total }))

const $isBenchesPending = benchesEffects.getBenchesFx.pending

sample({
  clock: [pageChanged, deleteBenchFx.done],
  source: { simpleBenchesPagination: $pagination },
  target: benchesEffects.getBenchesFx,
})

export const simpleBenchesEvents = {
  pageChanged,
}

export const simpleBenchesSelectors = {
  benches: $benches,
  isBenchesPending: $isBenchesPending,
  pagination: $pagination,
}
