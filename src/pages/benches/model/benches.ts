import { createEffect, createEvent, createStore } from 'effector'

import { getApiBenches } from 'pages/benches/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

// --- Инициализация данных страницы --- //
export const $perPage = createStore(INITIAL_PAGE_PARAMS.perPage)

export const $totalPages = createStore(INITIAL_PAGE_PARAMS.totalPages)
// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent()
// ------ //

// --- Инициализация основных эффектов страницы --- //
export const getBenchesFx = createEffect(() => getApiBenches())
// ----- //

// TODO: Починить типы.

const $benches = createStore<Array<BenchType>>([])

$benches.on(getBenchesFx.doneData, (oldData, { data }) => {
  return data.items 
})

export const $isBenchesPending = getBenchesFx.pending

export const selectors = {
  benches: $benches,
}