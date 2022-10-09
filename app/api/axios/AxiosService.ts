import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosResponseType } from '@/api/axios/axios.type'

export class AxiosService {
    private axiosInstance!: AxiosInstance

    constructor(config?: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config)

        this.axiosInstance.interceptors.request.use((config) => {
            //
            // config.xsrfCookieName = 'XSRF-TOKEN'
            // config.xsrfHeaderName = 'X-XSRF-TOKEN'

            const token = localStorage.getItem('token') || ''

            config.headers = {
                Authorization: `Bearer ${token}`,
            }

            return config
        })

        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response
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
                return Promise.reject( response)
            }
        )
    }

    protected async axiosCall<T = any>(config: AxiosRequestConfig): Promise<AxiosResponseType<T>> {
        try {
            const { data } = await this.axiosInstance.request<T>(config)
            return [null, data]
        } catch (error: any) {
            return [error]
        }
    }
}
