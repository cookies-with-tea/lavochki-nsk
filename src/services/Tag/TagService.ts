import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {BenchTagType} from "@/types/bench.type";

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