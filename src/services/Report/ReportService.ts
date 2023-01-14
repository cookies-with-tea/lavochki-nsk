import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {CreateReportCommentType} from "@/types/report.type";
import {ReportCommentType, CommentType} from "@/types/comment.type";

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

  public getModerationAll = (): Promise<ReportCommentType[]> => {
    return this.axiosCall({
      method: 'get',
      url: '/moderation'
    })
  }
}

export default new ReportService({
  baseURL: '/api/v1/reports/comments',
  withCredentials: false
})