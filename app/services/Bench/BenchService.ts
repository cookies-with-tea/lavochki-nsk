import { AxiosService } from '@/app/services/Axios/AxiosService'
import { AxiosRequestConfig } from 'axios'
import { IBench } from '@/app/interfaces/bench.interface'

class BenchService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll = async (): Promise<IBench[]> => {
    return this.axiosCall<IBench[]>({
      method: 'get',
      url: ''
    })
  }

  public getById = async (id: string): Promise<IBench> => {
    return this.axiosCall<IBench>({
      method: 'get',
      url: `/${id}`
    })
  }
}

export default new BenchService({
  baseURL: '/api/v1/benches',
  withCredentials: false
})