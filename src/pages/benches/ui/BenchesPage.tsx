import { Space } from 'antd'
import { useState } from 'react'

import { BenchesTable } from 'pages/benches/ui/BenchesTable'
import { BenchFormCreate } from 'pages/benches/ui/BenchFormCreate'
import styles from 'pages/benches/ui/styles.module.scss'

import { SButton, SIcon, SDialog } from 'shared/ui'

export const BenchesPage = () => {
  const [isCreateBenchVisible, setIsCreateBenchVisible] = useState(false)

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

      <BenchesTable />

      <SDialog title={'Создание лавочки'} open={isCreateBenchVisible} onSuccess={handleOk} onCancel={handleCancel}>
        <BenchFormCreate />
      </SDialog>
    </div>
  )
}