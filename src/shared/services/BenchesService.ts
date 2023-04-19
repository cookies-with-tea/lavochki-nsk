import { API_CONFIG, AxiosService } from '@/shared/configs'
import { AxiosRequestConfig } from 'axios'

export class BenchesService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  create = async (data: FormData) => {
    return this.axiosCall({
      method: 'post',
      url: '',
      data,
    })
  }

  getAll = async () => {
    return this.axiosCall({
      method: 'get',
      url: '/benches',
    })
  }

  getBydId = async (id: string) => {
    return this.axiosCall({
      method: 'get',
      url: `/benches/${id}`,
    })
  }

  delete = async (id: string) => {
    return this.axiosCall({
      method: 'delete',
      url: `/benches/${id}`,
    })
  }
}

export default new BenchesService(API_CONFIG)