import React, {FC, ReactElement, ReactNode, useState} from 'react';
import {UserMeType} from "@/types/user.type";
import {useQuery} from "react-query";
import UserService from "@/services/User/UserService";
import DefaultLayoutHeader from "@/components/layouts/DefaultLayout/DefaultLayoutHeader";
import DefaultLayoutSidebar from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar";
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
        <div className={'d-f w-100'}>
            <DefaultLayoutSidebar />
            <div className={'w-100'}>
                <DefaultLayoutHeader />
                { children }
            </div>
        </div>
    );
};

export default DefaultLayout;