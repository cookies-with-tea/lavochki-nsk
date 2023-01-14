import React, {FC, ReactElement, ReactNode, useState} from 'react';
import {UserMeType} from "@/types/user.type";
import {useQuery} from "react-query";
import UserService from "@/services/User/UserService";
interface IProps {
    children: ReactNode
}

const getMe = async (): Promise<UserMeType> => await UserService.getMe()

const DefaultLayout: FC<IProps> = ({ children }): ReactElement => {
    const [user, setUser] = useState<UserMeType>({
        id: '',
        role: '',
        telegram_id: 0,
        username: ''
    })

    useQuery<UserMeType>('get user', getMe, {
        onSuccess: (response) => {
            setUser(response)
        }
    })

    return (
        <div className={'d-f fd-c w-100'}>
            { children }
        </div>
    );
};

export default DefaultLayout;