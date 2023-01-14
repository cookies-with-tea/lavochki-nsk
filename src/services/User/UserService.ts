import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {LoginResponseType, UserMeType, UserType} from "@/types/user.type";
import {BenchTagType} from "@/types/bench.type";

class UserService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public create(data: UserType): Promise<LoginResponseType> {
    return this.axiosCall<LoginResponseType>({
      method: 'post',
      url: '',
      data,
    })
  }

  public getAll = (): Promise<UserMeType[]> => {
    return this.axiosCall<UserMeType[]>({
      method: 'get',
      url: '',
    })
  }

  public getMe(): Promise<UserMeType> {
    return this.axiosCall<UserMeType>({
      method: 'get',
      url: '/me'
    })
  }
}

export default new UserService({
  baseURL: '/api/v1/users',
  withCredentials: false
})
