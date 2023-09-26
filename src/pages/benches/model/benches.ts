import { createEffect, createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'

import { getApiBenches } from 'pages/benches/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

export const SampleCompGate = createGate()

// --- Инициализация данных страницы --- //
export const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)

export const $totalPages = createStore<number>(INITIAL_PAGE_PARAMS.totalPages)
// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent<string>()
// ------ //

// --- Инициализация основных эффектов страницы --- //
export const getBenchesFx = createEffect(async () => await getApiBenches())
// ----- //

const $benches = createStore<Array<BenchType>>([])

// TODO: Починить типы
$benches.on(getBenchesFx.doneData, (_, { data }) => data.items)

export const $isBenchesPending = getBenchesFx.pending

forward({
  from: SampleCompGate.open,
  to: getBenchesFx,
})

export const selectors = {
  benches: $benches,
}
