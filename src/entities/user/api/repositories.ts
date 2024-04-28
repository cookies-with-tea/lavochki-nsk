import { AbstractUserApi } from '#entities/user/api/repositories.abstract'

class UserApi extends AbstractUserApi {
  getMe = async () => {
    return await this.baseFetch<UserTypes.One>('', {
      method: 'get',
    })
  }

  getAll = async () => {
    return await this.baseFetch<UserTypes.ResponseType>('', {
      method: 'get',
    })
  }
}

export const userApi = new UserApi({
  prefixUrl: '/api/users',
})
