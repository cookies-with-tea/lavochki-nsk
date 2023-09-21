import { createEffect, createEvent, createStore } from 'effector'

import { getApiBenches } from 'pages/benches/api'
import { INITIAL_BENCH_PAGE_PARAMS } from 'pages/benches/constants'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'


// --- Инициализация данных страницы --- //
export const $perPage = createStore(INITIAL_PAGE_PARAMS.perPage)

export const $totalPages = createStore(INITIAL_PAGE_PARAMS.totalPages)

export const $activeTab = createStore(INITIAL_BENCH_PAGE_PARAMS.initialTab) // Изначальная таблица - Лавочки, прошедшие модерацию.
// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent()

export const tabChanged = createEvent()
// ------ //

// --- Инициализация основных эффектов страницы --- //
export const getBenchesFx = createEffect(() => getApiBenches())
// ----- //

export const $benches = createStore<Array<BenchType>>([])
  .on(getBenchesFx.doneData, (oldData, response) => {
    //@ts-ignore
    return response[1]?.data.items // TODO: Починить типы.
  }) 

export const $isBenchesPending = getBenchesFx.pending
