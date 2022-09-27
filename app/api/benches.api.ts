import {AxiosService} from "@/api/AxiosService";
import {AxiosRequestConfig} from "axios";

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
}

export default new BenchesApi({
    baseURL: '/benches',
    withCredentials: false
})
