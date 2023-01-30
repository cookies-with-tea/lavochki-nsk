import { AxiosService } from '@/app/services/Axios/AxiosService'
import { AxiosRequestConfig } from 'axios'
import {
  BenchesParamsType,
  BenchesResponseType,
  BenchType
} from '@/app/types/bench.type'

class BenchService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll = async (
    params?: Partial<BenchesParamsType>
  ): Promise<BenchesResponseType> => {
    return this.axiosCall<BenchesResponseType>({
      method: 'get',
      url: '',
      params: {
        sort_by: params?.sortBy,
        sort_order: params?.sortOrder,
        per_page: params?.perPage,
        page: params?.page,
      }
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