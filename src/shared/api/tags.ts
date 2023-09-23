import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs/api'
import { AxiosService } from 'shared/plugins'
import { TagsResponseType } from 'shared/types'

class TagsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  get = async () => {
    return this.axiosCall<TagsResponseType>({
      url: '/v1/tags',
      method: 'get',
    })
  }

  create = async (title: string) => {
    return this.axiosCall<TagsResponseType>({
      url: '/v1/tags',
      method: 'post',
      data: { title },
    })
  }
}

export const tagsApi = new TagsApi(API_CONFIG)
