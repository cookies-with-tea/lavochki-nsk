import { useQuery } from '@tanstack/react-query'
import { benchesApi } from '@/shared/api/benches'

// TODO: Улучшить функционал хука.
export const useBenches = () => {
  return useQuery({
    queryKey: ['benches'],
    queryFn: () => benchesApi.getAll(),
  })
}
