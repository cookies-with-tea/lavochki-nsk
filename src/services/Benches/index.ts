import { AxiosRequestConfig } from 'axios'
import { AxiosService } from '../AxiosService'
import {ReasonType} from "@/types/bench.type";

class BenchesApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll() {
    return this.axiosCall<any>({
      method: 'get',
      url: '/',
    })
  }

  public getModerationAll() {
    return this.axiosCall<any>({
      method: 'get',
      url: '/moderation',
    })
  }

  public changeModerationStatus(data: ReasonType) {
    return this.axiosCall<any>({
      method: 'post',
      url: '/moderation',
      data,
    })
  }
}

export default new BenchesApi({
  baseURL: '/api/v1/benches',
  withCredentials: false,
})
