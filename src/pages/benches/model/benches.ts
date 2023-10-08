import { combine, createEvent, createStore, forward, sample } from 'effector'
import { createGate } from 'effector-react'

import { setDecisionBenchFx } from 'pages/benches/api'

import { effects } from 'entities/bench/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType, SetDecisionPayloadType } from 'shared/types'

// TODO: Реализовать пагинацию
export const BenchesPageGate = createGate()

// --- Инициализация данных страницы --- //
export const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)
export const $totalPages = createStore<number>(INITIAL_PAGE_PARAMS.total)

const $pagination = combine($perPage, $totalPages, (perPage, total) => {
  return {
    perPage,
    total,
  }
})

// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent<number>()

export const decisionMade = createEvent<SetDecisionPayloadType>()

const $benches = createStore<Array<BenchType>>([])
const $moderationBenches = createStore<Array<BenchType>>([])

// TODO: Починить типы
$benches.on(effects.getBenchesFx.doneData, (_, { data }) => data.items)
$moderationBenches.on(effects.getModerationBenchesFx.doneData, (_, { data }) => data.items)

const $isBenchesPending = effects.getBenchesFx.pending
const $isModerationBenchesPending = effects.getModerationBenchesFx.pending

forward({
  from: BenchesPageGate.open,
  to: effects.getBenchesFx,
})

sample({
  clock: decisionMade,
  target: setDecisionBenchFx,
})

sample({
  clock: setDecisionBenchFx.done,
  target: effects.getModerationBenchesFx,
})

sample({
  clock: pageChanged,
})

// TODO: Добавить экспорт эвентов

export const selectors = {
  benches: $benches,
  moderationBenches: $moderationBenches,
  isBenchesPending: $isBenchesPending,
  isModerationBenchesPending: $isModerationBenchesPending,
  pagination: $pagination,
}
