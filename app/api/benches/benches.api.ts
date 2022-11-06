import {AxiosRequestConfig} from "axios";
import {AxiosService} from "@/app/api/AxiosSerivce/axios-service";

class BenchesApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public getBenches() {
        return this.axiosCall<any>({
            method: 'get',
            url: '/'
        })
    }

    public getModerationBenches() {
        return this.axiosCall<any>({
            method: 'get',
            url: 'moderation'
        })
    }

    public setDecision(payload: any) {
        return this.axiosCall<any>({
            method: 'post',
            url: 'moderation',
            data: {...payload},
        })
    }
}

export default new BenchesApi({
    baseURL: '/api/benches',
    withCredentials: false
})