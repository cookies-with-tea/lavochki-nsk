import { AxiosRequestConfig } from 'axios'
import { LoginUserResponseType } from './index.type'
import {AxiosService} from "@/services/Axios/AxiosService";

class UsersApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public loginViaTelegram(payload: any) {
    return this.axiosCall<LoginUserResponseType>({
      method: 'post',
      url: '',
      data: payload,
    })
  }
}

export default new UsersApi({
  baseURL: '/api/v1/users',
  withCredentials: false,
})
