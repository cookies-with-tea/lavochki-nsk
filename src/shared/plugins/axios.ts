import { notification } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { usersApi } from 'shared/api'
import { useLocalStorage } from 'shared/lib/hooks'
import { AuthorizationResponseType } from 'shared/types'

export type ApiResponseType<T = unknown> = {
  data: T
}

export type ApiErrorResponseType = {
  details: Record<string, string>
  message: string
}

export type ServiceResponseType<T = unknown> = Promise<
  [undefined, AxiosResponse<ApiResponseType<T>>] | [AxiosError<ApiResponseType>]
>


export type ServiceResponseTypeTwo<T = unknown> = Promise<
  AxiosResponse<ApiResponseType<T> | AxiosError<ApiResponseType>>
>

export type ServiceResponseTypeThree<T = unknown> = Promise<ApiResponseType<T> | AxiosError<ApiErrorResponseType>>

export class AxiosService {
  private axiosInstance!: AxiosInstance
  private stack: Array<any> = []

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({ ...config, timeout: 15000 })

    /** Request handler */
    this.axiosInstance.interceptors.request.use((config: any) => {
      // Какая-то дополнительная логика по настройке заголовков

      const { get } = useLocalStorage()

      const accessToken = get('accessToken')

      config.headers = {
        ...(accessToken ? { Authorization: 'Bearer ' + accessToken } : {}),
      }

      this.stack.push(config)

      if (this.stack.length >= 4) {
        this.stack.splice(0, 1)

        this.stack.push(config)
      }

      return config
    })

    /** Response handler */
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },
      async (error) => {
        switch (error?.response?.status) {
          // Ошибка авторизации
          case 401: {
            const { get, set } = useLocalStorage()

            try {
              const refreshToken = get('refreshToken')

              if (!refreshToken) {
                if (window.location.pathname === '/login') return

                notification.open({
                  type: 'error',
                  message: 'Не авторизован'
                })

                // window.location.pathname = '/login'

                return
              }

              const response = await usersApi
                .getNewToken(refreshToken) as ApiResponseType<AuthorizationResponseType>

              set('accessToken', response.data.access)
              set('refreshToken', response.data.refresh)

              if (!this.stack.length) return

              await this.axiosCall(this.stack.at(-1))
            } catch (error) {
              if (window.location.pathname === '/login') return

              // window.location.pathname = '/login'

              notification.open({
                type: 'error',
                message: 'Не авторизован'
              })
            }

            break
          }

          // Ошибки прав доступа
          case 403: {
            break
          }

          // Ошибки наличия апи методов
          case 404: {
            // TODO: Костыль, ибо backend не отдает нормальный статус
            if (error?.response?.data?.message === 'incorrect token') {
              if (window.location.pathname === '/login') return

              // window.location.pathname = '/login'

              notification.open({
                type: 'error',
                message: 'Не авторизован'
              })
            }

            break
          }

          // Ошибки валидации
          case 422: {
            break
          }

          // Ошибки сервера
          case 500: {
            if (location.href.includes('?')) {
              window.history.pushState({}, document.title, window.location.pathname)
            }

            if (window.location.pathname === '/error-500') return

            // window.location.pathname = '/error-500'

            break
          }

          default: {
            break
          }
        }

        return Promise.reject(error)
      }
    )
  }

  // TODO: Переписать так, чтобы работало вместе с effector'ом
  protected async axiosCall<T = unknown>(config: AxiosRequestConfig): ServiceResponseTypeThree {
    const { data } = await this.axiosInstance.request<ApiResponseType<T>>(config)

    return { data }
  }
}
