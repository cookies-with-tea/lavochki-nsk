import React, {ReactElement, useState} from 'react';
import {useQuery} from "react-query";
import {ErrorType} from "@/types/common.type";
import UsersTable from "@/components/pages/Users/UsersTable";
import UserService from "@/services/User/UserService";
import {UserMeType} from "@/types/user.type";

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
            <UsersTable users={users} />
        </div>
    );
};

export default TheUsers;