import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {BenchTagType} from "@/types/bench.type";

class TagService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public create = (title: string): Promise<unknown> => {
    return this.axiosCall<unknown>({
      method: 'post',
      url: '',
      data: {
        title
      }
    })
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