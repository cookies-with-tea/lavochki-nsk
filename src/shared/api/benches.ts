import { ENDPOINTS } from '@/shared/api/constants'
import { BenchTypes } from '@/shared/types/bench'
import { useFetch } from '@/shared/lib/hooks'

const getAll = async () => {
  return await useFetch<BenchTypes.Response>(ENDPOINTS.benches)
}

const getOne = async (benchId: BenchTypes.One['id']) => {
  return await useFetch<BenchTypes.One>(`${ENDPOINTS.benches}/${benchId}`)
}

export const benchesApi = {
  getAll,
  getOne,
} as const
