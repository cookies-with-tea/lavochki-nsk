import { createEffect, createEvent, createStore } from 'effector'

// TODO: Вынести тип
export type UserType = {
  id: string
  role: string
  telegram_id: number
  username: string
}

import { getApiUsers } from 'pages/users/api'

import { INITIAL_PAGE_PARAMS } from 'shared/constants'

// --- Инициализация данных страницы --- //
export const $perPage = createStore<number>(INITIAL_PAGE_PARAMS.perPage)

export const $totalPages = createStore<number>(INITIAL_PAGE_PARAMS.total)
// ------ //

// --- Инициализация основных эвентов страницы --- //
export const pageChanged = createEvent<string>()
// ------ //

// --- Инициализация основных эффектов страницы --- //
// TODO: Вынести все эффекты в attach
export const getUsersFx = createEffect(async () => await getApiUsers())
// ----- //

const $users = createStore<Array<UserType>>([])

// TODO: Починить типы
// @ts-ignore
$users.on(getUsersFx.doneData, (_, { data }) => data)

export const $isBenchesPending = getUsersFx.pending

export const selectors = {
  users: $users,
}
