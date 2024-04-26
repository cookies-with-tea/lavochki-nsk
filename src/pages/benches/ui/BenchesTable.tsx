import { Table, Checkbox, PaginationProps } from '@mantine/core'
import { useUnit } from 'effector-react'
import { useState } from 'react'

import { benchesSelectors } from '#pages/benches/model/benches'

import { BENCHES_MOCK_DATA } from '#entities/bench/mock'

import { UiButton, UiTable } from '#shared/ui'

const pagination: PaginationProps = {
  total: 110,
}

export const BenchesTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [benches] = useUnit([benchesSelectors.benches])

  const rows = BENCHES_MOCK_DATA.items.map((element) => (
    <Table.Tr key={element.id} className={selectedRows.includes(element.id) ? 'active' : undefined}>
      <Table.Td>
        <div className={'td-cell'}>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.id)}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, element.id]
                  : selectedRows.filter((position) => position !== element.id)
              )
            }
          />
        </div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.id}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.owner}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.lat}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.lng}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.street}</div>
      </Table.Td>
      <Table.Td>
        <div className={'td-cell'}>{element.lng}</div>
      </Table.Td>
      <Table.Td style={{ width: '180px' }}>
        <div className={'td-cell'}>
          <UiButton as={'text'}>Редактировать</UiButton>
        </div>
      </Table.Td>
      <Table.Td style={{ width: '160px' }}>
        <div className={'td-cell'}>
          <UiButton as={'text'} appearance={'danger'}>
            Удалить
          </UiButton>
        </div>
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
          <Table.Th>
            <div className={'td-cell'}>
              <Checkbox />
            </div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>ID</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>ID владельца</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>Широта</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>Долгота</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>Адрес</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'}>Дата создания</div>
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'} />
          </Table.Th>
          <Table.Th>
            <div className={'td-cell'} />
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>{rows}</Table.Tbody>
    </UiTable>
  )
}
