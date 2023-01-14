import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, { FC, ReactElement } from 'react'
import {UserMeType} from "@/types/user.type";

interface IProps {
    users: UserMeType[]
}

const UsersTable: FC<IProps> = ({ users }): ReactElement => {
    return (
        <>
            <Table sx={{ minWidth: 650 }} aria-label='posts table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Телеграм ID</TableCell>
                        <TableCell align='left'>Роль</TableCell>
                        <TableCell align='left'>Логин</TableCell>
                    </TableRow>
                </TableHead>
                {
                    users ? (
                            <TableBody>
                                {
                                    users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component='th' scope='row'>
                                                {user.id}
                                            </TableCell>
                                            <TableCell>
                                                {user.telegram_id}
                                            </TableCell>
                                            <TableCell>
                                                {user.role}
                                            </TableCell>
                                            <TableCell>
                                                {user.username}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        )
                        : <div>Нет данных</div>
                }
            </Table>
        </>
    )
}

export default UsersTable
