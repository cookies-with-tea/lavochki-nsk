import { AxiosService } from '@/app/services/Axios/AxiosService'
import { AxiosRequestConfig } from 'axios'
import { BenchesResponseType, BenchType } from '@/app/types/bench.type'

class BenchService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll = async (): Promise<BenchesResponseType> => {
    return this.axiosCall<BenchesResponseType>({
      method: 'get',
      url: ''
    })
  }

  public getById = async (id: string): Promise<BenchType> => {
    return this.axiosCall<BenchType>({
      method: 'get',
      url: `/${id}`
    })
  }
}

export default new BenchService({
  baseURL: '/api/v1/benches',
  withCredentials: false
})