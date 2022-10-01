import {AxiosService} from "@/api/AxiosService";
import {AxiosRequestConfig} from "axios";

class UsersApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config)
    }

    public loginViaTelegram(payload: any) {
        return this.axiosCall<string>({
            method: 'post',
            url: '/',
            data: payload
        })
    }
}

export default new UsersApi({
    baseURL: '/users',
    withCredentials: false
})
