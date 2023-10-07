import { Space, Tabs } from 'antd'
import { useGate, useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { BENCHES_TABS } from 'pages/benches/constants'
import { BenchesPageGate } from 'pages/benches/model/benches'
import { $activeTab, changeTableEvents } from 'pages/benches/model/change-table'
import { $isOpenModal, closeModal, openModal } from 'pages/benches/model/create-bench'
import { events, selectors } from 'pages/benches/model/detail-bench'
import { BenchFormCreate } from 'pages/benches/ui/create/BenchFormCreate'
import styles from 'pages/benches/ui/styles.module.scss'

import { SButton, SIcon, SDialog, SDrawer, SLoader } from 'shared/ui'

import { DetailBench } from './detail/DetailBench'

export const BenchesPage = () => {
  const [
    isModalOpen,
    activeTab,
    isDrawerOpen,
    drawerClosed
    ] = useUnit([$isOpenModal, $activeTab, selectors.isDrawerOpen, events.drawerClosed])
  const [, setSearchParams] = useSearchParams()

  // TODO: Вынести модалки в фабрику (возможно)
  const showModal = () => {
    openModal()
  }

  const handleOk = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  useGate(BenchesPageGate)

  // TODO: Мне не нравится данный подход. Надо переработать.
  // TODO: Добавить способ, который позвонит инициализировать стейт исходя из кверей
  useEffect(() => {
    setSearchParams({
      activeTab,
    })
  }, [activeTab, setSearchParams])

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

      <Tabs
        defaultActiveKey={'benches'}
        items={BENCHES_TABS}
        onChange={(tab) => changeTableEvents.tabChanged(tab)}
      />

      <SDialog title={'Создание лавочки'} open={isModalOpen}
onSuccess={handleOk} onCancel={handleCancel}>
        <BenchFormCreate />
      </SDialog>

      <SDrawer title={'Детальная лавочка'} open={isDrawerOpen}
onClose={drawerClosed}>
        <DetailBench />
      </SDrawer>
    </div>
  )
}