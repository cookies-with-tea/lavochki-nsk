import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type ServiceResponseType<T> = Promise<[null, T] | [Error]>;

export class AxiosService {
  private axiosInstance!: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        const response = error?.response?.data

        switch (error?.response?.status) {
        case 401:
          break
        case 403:
          break
        case 404:
          break
        case 422:
          break

        default:
          break
        }

        return Promise.reject(response.code ? response.code : response)
      }
    )
  }

  protected async axiosCall<T = unknown>(
    config: AxiosRequestConfig
  ): ServiceResponseType<T> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)

      return [null, data]
    } catch (error: unknown) {
      return [error as Error]
    }
  }
}
const getBaseUrl = (): string => {
  return import.meta.env.DEV
    ? '/api/v1'
    : [import.meta.env.VITE_BASE_URL, '/api/v1'].join('')
}
export const API_CONFIG: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: 15000,
}
