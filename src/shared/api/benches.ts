import { ENDPOINTS } from '@/shared/api/constants'
import { BenchTypes } from '@/shared/types/bench'
import { useFetch } from '@/shared/lib/hooks'

const getAll = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return await useFetch<BenchTypes.Response>(ENDPOINTS.benches)
}

const getOne = async (benchId: BenchTypes.One['id']) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return await useFetch<BenchTypes.One>(`${ENDPOINTS.benches}/${benchId}`)
}

export const benchesApi = {
  getAll,
  getOne,
} as const
