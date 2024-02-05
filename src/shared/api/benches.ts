import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs/api'
import { AxiosService } from 'shared/plugins'
import { BenchTypes } from 'shared/types'

class BenchesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  getDetail = async (id: BenchTypes.One['id']) => {
    return await this.axiosCall<BenchTypes.One>({
      method: 'get',
      url: `/v1/benches/${id}`,
    })
  }

  getBenches = async (payload: CommonTypes.PayloadPagination) => {
    return await this.axiosCall<BenchTypes.Response>({
      method: 'get',
      url: '/v1/public/benches',
      params: payload,
    })
  }
  getModerationBenches = async (payload: CommonTypes.PayloadPagination) => {
    return await this.axiosCall<BenchTypes.Response>({
      method: 'get',
      url: '/v1/private/benches/moderation',
      params: payload,
    })
  }

  setDecision = async (payload: BenchTypes.DecisionFormModel) => {
    return await this.axiosCall<void>({
      method: 'post',
      url: '/v1/benches/moderation',
      data: payload,
    })
  }

  createBench = async (payload: FormData) => {
    return await this.axiosCall<void>({
      method: 'post',
      url: '/v1/benches',
      data: payload,
    })
  }

  update = async (benchId: BenchTypes.One['id'], payload: FormData) => {
    return await this.axiosCall<BenchTypes.One>({
      method: 'patch',
      url: `/v1/benches/${benchId}`,
      data: payload
    })
  }

  delete = async (benchId: BenchTypes.One['id']) => {
    return await this.axiosCall<BenchTypes.One>({
      method: 'delete',
      url: `/v1/benches/${benchId}`,
    })
  }
}

export const benchesApi = new BenchesApi(API_CONFIG)
