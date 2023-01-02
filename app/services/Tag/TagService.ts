import { AxiosService } from '@/app/services/Axios/AxiosService'
import { AxiosRequestConfig } from 'axios'
import { BenchTagType } from '@/app/types/bench.type'

class TagService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll(): Promise<BenchTagType[]> {
    return this.axiosCall<BenchTagType[]>({
      method: 'get',
      url: ''
    })
  }
}

export default new TagService({
  baseURL: '/api/v1/tags',
  withCredentials: false
})