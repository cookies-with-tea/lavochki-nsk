import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, { FC, ReactElement } from 'react'
import {ReportCommentType, CommentType} from "@/types/comment.type";

interface IProps {
    comments: ReportCommentType[]
}

const ReportCommentsTable: FC<IProps> = ({ comments }): ReactElement => {
    return (
        <>
            <Table sx={{ minWidth: 650 }} aria-label='posts table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Причина</TableCell>
                        <TableCell align='left'>ID комментария</TableCell>
                        <TableCell align='left'>ID пользователя</TableCell>
                    </TableRow>
                </TableHead>
                {
                    comments
                    ? (
                            <TableBody>
                                {
                                    comments.map((comment) => (
                                        <TableRow
                                            key={comment.ID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component='th' scope='row'>
                                                {comment.ID}
                                            </TableCell>
                                            <TableCell>
                                                {comment.cause}
                                            </TableCell>
                                            <TableCell>
                                                {comment.comment_id}
                                            </TableCell>
                                            <TableCell>
                                                {comment.user_id}
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

export default ReportCommentsTable
