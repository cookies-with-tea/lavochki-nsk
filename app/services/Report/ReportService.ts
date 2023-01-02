import { AxiosService } from '@/app/services/Axios/AxiosService'
import { AxiosRequestConfig } from 'axios'
import { CreateReportCommentType } from '@/app/types/report.type'

class ReportService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public create = (data: CreateReportCommentType): Promise<unknown> => {
    return this.axiosCall({
      method: 'post',
      url: '',
      data,
    })
  }
}

export default new ReportService({
  baseURL: '/api/v1/reports/comments',
  withCredentials: false
})