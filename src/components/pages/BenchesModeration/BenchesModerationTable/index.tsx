import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, { FC, ReactElement } from 'react'
import {BenchType} from "@/types/bench.type";

interface IProps {
    benches: BenchType[]
    acceptDialogOpen: (decision: boolean, benchId: string) => void
    denyDialogOpen: (decision: boolean, benchId: string) => void
}

const BenchesModerationTable: FC<IProps> = ({ benches, acceptDialogOpen, denyDialogOpen }): ReactElement => {
    return (
        <>
            <Table sx={{ minWidth: 650 }} aria-label='benches moderation table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>ID владельца</TableCell>
                        <TableCell align='left'>Расположение</TableCell>
                        <TableCell align='left'>Действия</TableCell>
                    </TableRow>
                </TableHead>
                {
                    benches
                    ? (
                        <TableBody>
                            {
                                benches.map((bench) => (
                                    <TableRow
                                        key={bench.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            {bench.id}
                                        </TableCell>
                                        <TableCell>
                                            {bench.owner}
                                        </TableCell>
                                        <TableCell>
                                            {bench.lat},
                                            {bench.lng}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => acceptDialogOpen(true, bench.id)}>
                                                Accept
                                            </Button>
                                            <Button onClick={() => denyDialogOpen(false, bench.id)}>
                                                Deny
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        )
                    :  <div>Нет данных</div>
                }
            </Table>
        </>
    )
}

export default BenchesModerationTable
