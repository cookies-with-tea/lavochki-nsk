import { Space, Tabs } from 'antd'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { columns } from 'pages/benches/constants'
import { selectors, getBenchesFx } from 'pages/benches/model/benches'
import { changeTableEvents } from 'pages/benches/model/change-table'
import { $isOpenModal, closeModal, openModal } from 'pages/benches/model/create-bench'
import { BenchFormCreate } from 'pages/benches/ui/bench-form-create/BenchFormCreate'
import styles from 'pages/benches/ui/styles.module.scss'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'
import { SButton, SIcon, SDialog } from 'shared/ui'

export const BenchesPage = () => {
  const [benches] = useUnit([selectors.benches])
  const [isModalOpen] = useUnit([$isOpenModal])

  const showModal = () => {
    openModal()
  }

  const handleOk = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    // TODO: Это плохо. Вынести запрос из useEffect
    getBenchesFx()
  }, [])

  return (
    <div className={styles['benches-page']}>
      <Space className={styles['benches-page__header']}>
        <h1>Лавочки</h1>

        <SButton
          appearance={'primary'}
          postfixIcon={
            <SIcon name={'plus'} />
          }
          onClick={showModal}
          >
          Создать лавочку
        </SButton>
      </Space>

      {/* TODO: Вынести items */}
      {/* TODO: Создать две отдельных таблицы */}
      <Tabs
       defaultActiveKey="1" 
       items={
        [
          {
            key: '1',
            label: 'Прошедшие модерацию',
            children: <WTable<BenchType>
              dataSource={benches}
              columns={columns}
            />
          },
          {
            key: '2',
            label: 'На модерации',
            children: <WTable<BenchType>
              dataSource={benches}
              columns={columns}
            />
          },
        ]
      } 
      onChange={(tab) => changeTableEvents.tabChanged(tab)}
      />

      <SDialog title={'Создание лавочки'} open={isModalOpen} onSuccess={handleOk} onCancel={handleCancel}>
        <BenchFormCreate />
      </SDialog>
    </div>
  )
}