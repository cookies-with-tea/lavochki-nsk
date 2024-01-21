import { useQuery } from '@tanstack/react-query'
import { benchesApi } from '@/shared/api/benches'

export const useAllBenches = () => {
  return useQuery({
    queryKey: ['benches-all'],
    queryFn: () => benchesApi.getAll(),
  })
}
