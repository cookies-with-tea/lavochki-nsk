import { Table, TableCell, TableHead, TableRow } from '@mui/material'

export const BenchesTable = () => {
  return (
    <div className={'w-100'}>
      <Table sx={{ minWidth: 650 }} aria-label={'benches table'}>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Расположение</TableCell>
            <TableCell align='left'>ID владельца</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  )
}