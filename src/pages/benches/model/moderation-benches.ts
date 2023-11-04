import { combine, createEvent, createStore, sample } from 'effector'

import { acceptDecisionEffects } from 'features/bench/accept/model'
import { createBenchFx } from 'features/bench/create/api'
import { rejectDecisionEffects } from 'features/bench/reject/model'

import { benchesEffects } from 'entities/bench/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchTypes } from 'shared/types'

const pageChanged = createEvent<number>()

const $perPage = createStore<CommonTypes.Pagination['perPage']>(INITIAL_PAGE_PARAMS.perPage)
const $page = createStore<CommonTypes.Pagination['page']>(INITIAL_PAGE_PARAMS.page)
const $total = createStore<CommonTypes.Pagination['total']>(INITIAL_PAGE_PARAMS.total)
const $benches = createStore<BenchTypes.All>([])

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
  clock: [
    pageChanged,
    rejectDecisionEffects.localRejectBenchFx.done,
    acceptDecisionEffects.localAcceptBenchFx.done,
    createBenchFx.done
  ],
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
