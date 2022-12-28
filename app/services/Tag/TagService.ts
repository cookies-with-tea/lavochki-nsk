import {AxiosService} from "@/app/services/Axios/AxiosService";
import {AxiosRequestConfig} from "axios";
import {ITag} from "@/app/interfaces/tag.interface";

class TagService extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    public getAll() {
        return this.axiosCall<ITag[]>({
            method: 'get',
            url: ''
        })
    }
}

export default new TagService({
    baseURL: '/api/v1/tags',
    withCredentials: false
})