import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {CreateReportCommentType} from "@/types/report.type";

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