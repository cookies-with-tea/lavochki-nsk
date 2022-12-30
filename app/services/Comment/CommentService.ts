import {AxiosService} from "@/app/services/Axios/AxiosService";
import {AxiosRequestConfig} from "axios";
import {CreateCommentType} from "@/app/types/comment";

class CommentService extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    public getById = async (benchId: string) => {
        return this.axiosCall({
            method: 'get',
            url: `/${benchId}`,
        })
}
    public create = async (data: CreateCommentType) => {
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