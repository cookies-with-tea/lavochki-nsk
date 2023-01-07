import { AxiosRequestConfig } from 'axios'
import {BenchType} from "@/types/bench.type";
import {AxiosService} from "@/services/Axios/AxiosService";

class BenchService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getAll = async (): Promise<BenchType[]> => {
    return this.axiosCall<BenchType[]>({
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