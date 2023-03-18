import React, {ReactElement, useState} from 'react';
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import UsersTable from "@/components/pages/Users/UsersTable";
import UserService from "@/services/User/UserService";
import {UserMeType} from "@/types/user.type";
import {CommonNoData} from "@/components/Common/CommonNoData/CommonNoData";

const getAll = async () => await UserService.getAll()

const TheUsers = (): ReactElement => {
    const [users, setUsers] = useState<UserMeType[]>([])

    const usersQuery = useQuery<UserMeType[], ErrorType>('get users', getAll,  {
        onSuccess: (response) => {
            setUsers(response)
        }
    })

    return (
        <div className={'w-100'}>
            <h1>Пользователи</h1>
            {
                users && Boolean(users.length)
                    ? (
                        <UsersTable users={users} />
                    ) : <CommonNoData title={'Нет списка пользователей'} />
            }
        </div>
    );
};

export default TheUsers;