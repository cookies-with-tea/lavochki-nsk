import { AxiosRequestConfig } from 'axios'

export const getBaseUrl = (): string => {
  return import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_BASE_URL}/api`
}

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  withCredentials: true,
}
