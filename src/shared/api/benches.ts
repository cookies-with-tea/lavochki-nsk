import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs/api'
import { AxiosService } from 'shared/plugins'
import { BenchType, SetDecisionPayloadType } from 'shared/types'
import { BenchesResponseType } from 'shared/types/bench'

class BenchesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  getBenches = async (payload: any) => {
    return await this.axiosCall<BenchesResponseType>({
      method: '',
      url: '/v1/benches',
      params: payload,
    })
  }

  getDetail = async (id: BenchType['id']) => {
    return await this.axiosCall<BenchType>({
      method: 'get',
      url: `/v1/benches/${id}`,
    })
  }

  // TODO: Добавить тип
  getModerationBenches = async (payload: any) => {
    return await this.axiosCall<BenchesResponseType>({
      method: 'get',
      url: '/v1/benches/moderation',
      params: payload,
    })
  }

  setDecision = async (payload: SetDecisionPayloadType) => {
    return await this.axiosCall<BenchesResponseType>({
      method: 'post',
      url: '/v1/benches/moderation',
      params: payload,
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