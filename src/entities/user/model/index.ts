import { createStore } from 'effector'

const $user = createStore<UserTypes.One | null>(null)
