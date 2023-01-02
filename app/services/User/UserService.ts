import { AxiosRequestConfig } from 'axios'
import { LoginResponseType, UserMeType, UserType } from '@/app/types/user.type'
import { AxiosService } from '@/app/services/Axios/AxiosService'

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
