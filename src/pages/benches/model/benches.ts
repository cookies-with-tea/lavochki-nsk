import {  createEvent, createStore, forward } from 'effector'
import { createGate } from 'effector-react'


import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { BenchType } from 'shared/types'

import { getBenchesFx } from '../api'

// TODO: Реализовать пагинацию
export const BenchesPageGate = createGate()

// --- Инициализация данных страницы --- //
// export const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)
export const $perPage = createStore<number>(100)

export const $totalPages = createStore<number>(INITIAL_PAGE_PARAMS.totalPages)

// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent<string>()


const $benches = createStore<Array<BenchType>>([])

// TODO: Починить типы
$benches.on(getBenchesFx.doneData, (_, { data }) => data.items)

export const $isBenchesPending = getBenchesFx.pending

forward({
  from: BenchesPageGate.open,
  to: getBenchesFx,
})

export const selectors = {
  benches: $benches,
}
