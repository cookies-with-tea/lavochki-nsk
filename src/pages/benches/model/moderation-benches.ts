import { combine, createStore } from 'effector'

import { benchesEffects } from 'entities/bench/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)
const $page = createStore<number>(INITIAL_PAGE_PARAMS.page)
const $total = createStore<number>(INITIAL_PAGE_PARAMS.total)
const $benches = createStore<Array<BenchType>>([])

// TODO: Добавить $pagination.on
const $pagination = combine($perPage, $page, $total, (perPage, page, total) => ({ perPage, page, total }))

const $isBenchesPending = benchesEffects.getBenchesFx.pending

export const moderationBenchesSelectors = {
  benches: $benches,
  isBenchesPending: $isBenchesPending,
  pagination: $pagination,
}
