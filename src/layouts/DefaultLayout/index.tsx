import React, {FC, ReactElement, ReactNode, useState} from 'react';
import CommonHeader from "@/components/layouts/DefaultLayout/DefaultLayoutHeader";
import CommonSidebar from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar";
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
        <>
            <CommonHeader />
            <div className={'d-f'}>
                <CommonSidebar />
                { children }
            </div>
        </>
    );
};

export default DefaultLayout;