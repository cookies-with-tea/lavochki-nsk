import { AxiosRequestConfig } from 'axios'

import { API_CONFIG } from 'shared/configs'
import { AxiosService } from 'shared/plugins'

class ReportsApi extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  getReportedComments = () => {
    return this.requestFx({
      method: 'get',
      url: '/v1/reports/comments',
    })
  }
}

export const reportsApi = new ReportsApi(API_CONFIG)
