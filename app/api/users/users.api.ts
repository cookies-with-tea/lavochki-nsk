import {AxiosService} from "@/app/api/AxiosSerivce/axios-service";
import {AxiosRequestConfig} from "axios";
import {LoginUserResponseType} from "@/app/api/users/users.types";

class UsersApi extends AxiosService {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    public loginViaTelegram(payload: any) {
        return this.axiosCall<LoginUserResponseType>({
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