import { Space } from 'antd'
import { useEffect, useState } from 'react'

import styles from 'pages/benches/ui/styles.module.scss'
import { getUsersFx } from 'pages/users/model/users'
import { UsersTable } from 'pages/users/ui/table/UsersTable'

import { SDialog } from 'shared/ui'

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

  // TODO: Убить за такое!
  useEffect(() => {
    getUsersFx()
  })

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

      <UsersTable />

      <SDialog title={'Создание лавочки'} open={isCreateBenchVisible}
onSuccess={handleOk} onCancel={handleCancel}>
        Создание пользователя
      </SDialog>
    </div>
  )
}