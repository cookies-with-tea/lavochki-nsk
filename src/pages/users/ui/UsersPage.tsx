import { Space, Tabs, TabsProps } from 'antd'
import { useState } from 'react'

import { columns } from 'pages/benches/constants'
import { AFTER_MODERATION_TABLE_DATA, MODERATION_TABLE_DATA } from 'pages/benches/mock'
import styles from 'pages/benches/ui/styles.module.scss'

import { WTable } from 'widgets/w-table'

import { SButton, SIcon, SDialog } from 'shared/ui'

import { BenchFormCreate } from '@/pages/benches/ui/bench-form-create/BenchFormCreate'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Пользователи',
    children: <WTable<any>
      dataSource={AFTER_MODERATION_TABLE_DATA}
      columns={columns}
    />
  },
  {
    key: '2',
    label: 'На модерации',
    children: <WTable<any>
      dataSource={MODERATION_TABLE_DATA}
      columns={columns}
    />
  },
]

export const UsersPage = () => {
  const [isCreateBenchVisible, setIsCreateBenchVisible] = useState(false)

  const onTabChange = (tab: string) => {
    console.log(tab)
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

  return (
    <div className={styles['benches-page']}>
      <Space className={styles['benches-page__header']}>
        <h1>Пользователи</h1>

        {/* <SButton
          appearance={'primary'}
          postfixIcon={
            <SIcon name={'plus'} />
          }
          onClick={showModal}
          >
          Создать пользователя
        </SButton> */}
      </Space>

      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />

      <SDialog title={'Создание лавочки'} open={isCreateBenchVisible} onSuccess={handleOk} onCancel={handleCancel}>
        Создание пользователя
      </SDialog>
    </div>
  )
}