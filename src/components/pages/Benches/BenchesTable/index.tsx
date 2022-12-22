import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, { FC, ReactElement } from 'react'

interface IProps {
    benches: any
}

const BenchesTable: FC<IProps> = ({ benches }): ReactElement => {
    return (
        <div className={'w-100'}>
            <Table sx={{ minWidth: 650 }} aria-label='posts table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>ID владельца</TableCell>
                        <TableCell align='left'>Расположение</TableCell>
                        <TableCell align='left'>Опубликован</TableCell>
                        <TableCell align='left'>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {benches &&
                      benches.map((bench: any, index: number) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component='th' scope='row'>
                            {bench.id}
                          </TableCell>
                          <TableCell align='right'>
                            {bench.lat},
                            {bench.lng}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default BenchesTable
