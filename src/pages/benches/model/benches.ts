import { createEffect, createEvent, createStore } from 'effector'

import { getApiBenches } from 'pages/benches/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

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

export const selectors = {
  benches: $benches,
}
