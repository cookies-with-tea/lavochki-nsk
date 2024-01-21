import { string } from 'prop-types'

export const ENDPOINTS = {
  benches: 'benches',
  bench: `benches/${string}`,
  users: 'users',
} as const
