import { AxiosRequestConfig } from 'axios'
import {AxiosService} from "@/services/Axios/AxiosService";
import {CommentType, CreateCommentType} from "@/types/comment.type";

class CommentService extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getById = async (benchId: string): Promise<CommentType[]> => {
    return this.axiosCall({
      method: 'get',
      url: `/${benchId}`,
    })
  }
  public create = async (data: CreateCommentType): Promise<unknown> => {
    return this.axiosCall({
      method: 'post',
      url: '',
      data,
    })
  }
}

export default new CommentService({
  baseURL: '/api/v1/comments',
  withCredentials: false
})