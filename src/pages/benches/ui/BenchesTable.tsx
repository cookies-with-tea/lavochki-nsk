import { Table, Checkbox, PaginationProps } from '@mantine/core'
import { useUnit } from 'effector-react'
import { useState } from 'react'

import { benchesColumns } from '#pages/benches/config'
import { benchesSelectors } from '#pages/benches/model/benches'

import { UiTable } from '#shared/ui'

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
]

const pagination: PaginationProps = {
  total: 110,
}

export const BenchesTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [benches] = useUnit([benchesSelectors.benches])

  const rows = elements.map((element) => (
    <Table.Tr key={element.name} className={selectedRows.includes(element.position) ? 'active' : undefined}>
      <Table.Td>
        <div className={'td-cell'}>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.position)}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, element.position]
                  : selectedRows.filter((position) => position !== element.position)
              )
            }
          />
        </div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.position}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.name}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.symbol}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.mass}</div>
      </Table.Td>
    </Table.Tr>
  ))
  const onPaginationChange = (page: number) => {
    console.log(page)
  }

  return (
    <UiTable pagination={{ ...pagination, onChange: onPaginationChange }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </UiTable>
  )
}
