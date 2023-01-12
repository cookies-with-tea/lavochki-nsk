import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, { FC, ReactElement } from 'react'
import {BenchTagType} from "@/types/bench.type";

interface IProps {
    tags: BenchTagType[]
}

const setActiveStatus = (status: boolean): string => status ? 'Активна' : 'Не активна'

const CommentsModerationTable: FC<IProps> = ({ tags }): ReactElement => {
    return (
        <>
            <Table sx={{ minWidth: 650 }} aria-label='posts table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Название</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tags && tags.map((tag) => (
                            <TableRow
                                key={tag.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {tag.id}
                                </TableCell>
                                <TableCell>
                                    {tag.title}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default CommentsModerationTable
