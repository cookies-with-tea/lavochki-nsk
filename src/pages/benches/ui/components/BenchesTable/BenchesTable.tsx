import { Table, Checkbox, PaginationProps } from '@mantine/core'
import { useUnit } from 'effector-react'
import { useState } from 'react'

import { benchesSelectors } from '#pages/benches/model/benches'
import { deleteBenchEvents } from '#pages/benches/ui/components/BenchesTable/model/delete-bench'
import { detailBenchEvents } from '#pages/benches/ui/components/DetailBenchDrawer/model/detail-bench'
import { editBenchEvents } from '#pages/benches/ui/components/EditBenchModal/model/edit-bench'

import { BENCHES_MOCK_DATA } from '#entities/bench/mock'

import { UiButton, UiTable } from '#shared/ui'

const pagination: PaginationProps = {
  total: 110,
}

export const BenchesTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [handleBenchDelete] = useUnit([deleteBenchEvents.benchDeleted])

  const [benches] = useUnit([benchesSelectors.benches])
  const [handleDrawerOpen] = useUnit([detailBenchEvents.drawerOpened])
  const [handleModalOpen] = useUnit([editBenchEvents.modalOpened])

  const rows = BENCHES_MOCK_DATA.items.map((element) => (
    <Table.Tr
      key={element.id}
      className={selectedRows.includes(element.id) ? 'active' : undefined}
      onClick={(event) => {
        if (!(event.target instanceof HTMLInputElement)) {
          handleDrawerOpen(element.id)
        }
      }}
    >
      <Table.Td>
        <div className={'td-cell'}>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.id)}
            onChange={(event) => {
              event.stopPropagation()

              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, element.id]
                  : selectedRows.filter((position) => position !== element.id)
              )
            }}
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
          <UiButton
            as={'text'}
            onClick={(event) => {
              event.stopPropagation()

              handleModalOpen(element.id)
            }}
          >
            Редактировать
          </UiButton>
        </div>
      </Table.Td>
      <Table.Td style={{ width: '160px' }}>
        <div className={'td-cell'}>
          <UiButton
            as={'text'}
            appearance={'danger'}
            onClick={(event) => {
              event.stopPropagation()

              handleBenchDelete(element.id)
            }}
          >
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
