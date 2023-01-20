import { AxiosRequestConfig } from 'axios'
import {BenchesResponseType, BenchType} from "@/types/bench.type";
import {AxiosService} from "@/services/Axios/AxiosService";

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

  public getModerationAll = async (): Promise<BenchesResponseType> => {
    return this.axiosCall<BenchesResponseType>({
      method: 'get',
      url: '/moderation'
    })
  }

  public update = async (data: Partial<BenchType>): Promise<unknown> => {
    return this.axiosCall<unknown>({
      method: 'patch',
      url: `/${data.id}`,
      data
    })
  }
}

export default new BenchService({
  baseURL: '/api/v1/benches',
  withCredentials: false
})