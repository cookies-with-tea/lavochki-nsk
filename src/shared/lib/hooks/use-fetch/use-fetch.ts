import { kyInstance } from '@/shared/api/instance'
import { ENDPOINTS } from '@/shared/api/constants'
import type { Options } from 'ky'

// DEBT: Добавить тип ошибки

export const useFetch = async <T = unknown>(
  url: (typeof ENDPOINTS)[keyof typeof ENDPOINTS],
  options?: Options
): Promise<T> => {
  return await kyInstance(url, {
    method: 'get',
    ...options
  }).json<T>()
}
