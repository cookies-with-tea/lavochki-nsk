import { Space, Tabs, TabsProps } from 'antd'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { columns } from 'pages/benches/constants'
import { $benches, getBenchesFx } from 'pages/benches/model/benches'
import { BenchFormCreate } from 'pages/benches/ui/bench-form-create/BenchFormCreate'
import styles from 'pages/benches/ui/styles.module.scss'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'
import { SButton, SIcon, SDialog } from 'shared/ui'

export const BenchesPage = () => {
  const [isCreateBenchVisible, setIsCreateBenchVisible] = useState(false)

  const benches = useUnit($benches)

  // const [items, setItems]  = useState<TabsProps['items']>([
  //   {
  //     key: '1',
  //     label: 'Прошедшие модерацию',
  //     children: <WTable<DataType>
  //       dataSource={benches}
  //       columns={columns}
  //     />
  //   },
  //   {
  //     key: '2',
  //     label: 'На модерации',
  //     children: <WTable<DataType>
  //       dataSource={benches}
  //       columns={columns}
  //     />
  //   },
  // ])

  const onTabChange = (tab: string) => {
    console.log(tab)

    if (tab === '1') {
      // benchesQuery.refresh()
    } else if (tab === '2') {
      // moderationBenchesQuery.refresh()
    }
  }

  const showModal = () => {
    setIsCreateBenchVisible(true)
  }

  const handleOk = () => {
    setIsCreateBenchVisible(false)
  }

  const handleCancel = () => {
    setIsCreateBenchVisible(false)
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

      {/* TODO: Добавить табы */}
      {/* <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} /> */}

      <WTable<BenchType>
        dataSource={benches}
        columns={columns}
      />

      <SDialog title={'Создание лавочки'} open={isCreateBenchVisible} onSuccess={handleOk} onCancel={handleCancel}>
        <BenchFormCreate />
      </SDialog>
    </div>
  )
}