import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs/api'
import { AxiosService } from 'shared/plugins'
import { BenchesResponseType } from 'shared/types/bench'

class BenchesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  getBenches = async () => {
    return await this.axiosCall<BenchesResponseType>({
      method: '',
      url: '/v1/benches',
    })
  }

  getModerationBenches = async () => {
    return await this.axiosCall<BenchesResponseType>({
      method: '',
      url: '/v1/benches/moderation',
    })
  }

  createBench = async (payload: FormData) => {
    return await this.axiosCall<void>({
      method: 'post',
      url: '/v1/benches',
      data: payload,
    })
  }
}

export const benchesApi = new BenchesApi(API_CONFIG)