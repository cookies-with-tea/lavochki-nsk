import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { useLocalStorage } from 'shared/lib/hooks'

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

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({ ...config, timeout: 15000 })

    /** Request handler */
    this.axiosInstance.interceptors.request.use((config: any) => {
      // Какая то дополнительная логика по настройке заголовков

      const { get } = useLocalStorage()

      const accessToken = get('accessToken')

      config.headers = {
        ...(accessToken ? { Authorization: 'Bearer ' + accessToken } : {}),
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
            break
          }

          // Ошибки прав доступа
          case 403: {
            break
          }

          // Ошибки наличия апи методов
          case 404: {
            break
          }

          // Ошибки валидации
          case 422: {
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

  // TODO: Посмотреть поведение новых возвращаемых значений
  protected async axiosCall<T = unknown>(config: AxiosRequestConfig): ServiceResponseTypeThree {
    // try {
    //   const { data } = await this.axiosInstance.request<ApiResponseType<T>>(config)

    //   return data
    // } catch (error) {
    //   const axiosError = error as AxiosError
      

    //   return axiosError.response?.data as ApiResponseType
    // }

    const { data } = await this.axiosInstance.request<ApiResponseType<T>>(config)

    return { data }
  }

  // protected async fakeAxiosCall<T = unknown>(mockData: T): ServiceResponseType<T> {
  //   try {
  //     const response = await apiMethod<T>(mockData, 1)

  //     return [undefined, response]
  //   } catch (error) {
  //     return [error as AxiosError<ApiResponseType>]
  //   }
  // }
}

// const apiMethod = <T = unknown>(
//   mockData: T,
//   errorRandomRate = 4,
//   random = 10
// ): Promise<AxiosResponse<ApiResponseType<T>>> => {
//   return new Promise((res, rej) => {
//     const ResponseStatus = Math.floor(Math.random() * random) + 1

//     setTimeout(() => {
//       console.log(`Запрос ${ResponseStatus}`)

//       if (ResponseStatus > errorRandomRate) {
//         const response = {
//           data: {},
//         } as AxiosResponse<ApiResponseType<T>>

//         if (response) {
//           response.status = 200

//           response.data.data = mockData

//           res(response)
//         }
//       } else {
//         const error = {} as AxiosError<ApiResponseType>

//         if (error) {
//           error.status = 500

//           error.response = {
//             data: {
//               errors: {
//                 message: ['Ошибка раз', 'Ошибка два'],
//               },
//             },
//           } as typeof error.response

//           rej([error])
//         }
//       }
//     }, 1500)
//   })
// }

