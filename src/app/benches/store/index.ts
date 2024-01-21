import { useQuery } from '@tanstack/react-query'
import { benchesApi } from '@/shared/api/benches'

export const useBenches = () => {
  return useQuery({
    queryKey: ['benches-all'],
    queryFn: () => benchesApi.getAll(),
  })
}
