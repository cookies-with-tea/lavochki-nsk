import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs'
import { AxiosService } from 'shared/plugins/axios'
import { AuthorizationResponseType, UserTelegramType } from 'shared/types'

class UsersApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) { 
    super(config)
  }

  login = async (payload: UserTelegramType) => {
    return await this.axiosCall<AuthorizationResponseType>({
      method: 'post',
      url: '/v1/users',
      data: payload,
    })
  }

  getMe = async () => {
    return await this.axiosCall<AuthorizationResponseType>({
      method: 'get',
      url: '/v1/users/me',
    })
  }

  getAll = async () => {
    return await this.axiosCall({
      method: 'get',
      url: '/v1/users',
    })
  }

  getNewToken = async (token: AuthorizationResponseType['access']) => {
    return await this.axiosCall<AuthorizationResponseType>({
      method: 'post',
      url: '/v1/users/refresh',
      data: {
        token,
      }
    })
  }
}

export const usersApi = new UsersApi(API_CONFIG)