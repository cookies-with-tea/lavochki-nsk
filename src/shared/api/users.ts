import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs'
import { AxiosService } from 'shared/plugins/axios'
import { AuthorizationResponseType, UserType } from 'shared/types'

class UsersApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) { 
    super(config)
  }

  login = async (payload: UserType) => {
    return await this.axiosCall<AuthorizationResponseType>({
      method: 'post',
      url: '/v1/users',
      data: payload,
    })
  }
}

export const usersApi = new UsersApi(API_CONFIG)