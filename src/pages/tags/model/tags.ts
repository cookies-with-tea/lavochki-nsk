import { createEffect, createEvent, createStore } from 'effector'

import { getApiTags } from 'pages/tags/api/tags'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'
import { TagType } from 'shared/types'

// --- Инициализация данных страницы --- //
export const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)

export const $totalPages = createStore<number>(INITIAL_PAGE_PARAMS.totalPages)
// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent<string>()
// ------ //

// --- Инициализация основных эффектов страницы --- //
export const getTagsFx = createEffect(async () => await getApiTags())
// ----- //

export const $tags = createStore<Array<TagType>>([])

// TODO: Разобраться с типами
// @ts-ignore
$tags.on(getTagsFx.doneData, (_, { data }) => data)
