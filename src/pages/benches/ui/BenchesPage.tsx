import { Space, Tabs } from 'antd'
import { useGate, useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { BENCHES_TABS } from 'pages/benches/constants'
// import { BenchesPageGate } from 'pages/benches/model/benches'
import { benchesEvents, benchesPageGates, benchesSelectors } from 'pages/benches/model/benches'
import { $activeTab, changeTableEvents } from 'pages/benches/model/change-table'
import { events as detailBenchEvents, selectors as detailBenchSelectors } from 'pages/benches/model/detail-bench'
import { BenchesTabsType } from 'pages/benches/types'
import styles from 'pages/benches/ui/styles.module.scss'

import { FBenchCreate, createBenchSelectors, createBenchEvents } from 'features/bench/create'
import { FBenchEdit } from 'features/bench/edit'

import { events as editBenchEvents, selectors as editBenchSelectors } from 'entities/bench'

import { SButton, SIcon, SDialog, SDrawer } from 'shared/ui'

import { simpleBenchesSelectors } from '../model/simple-benches'

import { DetailBench } from './detail/DetailBench'

export const BenchesPage = () => {
  const [
    isCreateDialogOpen,
    activeTab,
    ] = useUnit([createBenchSelectors.isDialogOpen,benchesSelectors.activeTab])
  const [isEditDialogOpen] = useUnit([editBenchSelectors.isDialogOpen])
  const [isDrawerOpen, drawerClosed] = useUnit([detailBenchSelectors.isDrawerOpen, detailBenchEvents.drawerClosed])


  const [, setSearchParams] = useSearchParams()

  // TODO: Вынести модалки в фабрику (возможно)
  const showModal = () => {
    createBenchEvents.dialogOpened()
  }

  const handleOk = () => {
    createBenchEvents.dialogClosed()
  }

  const handleCancel = () => {
    createBenchEvents.dialogClosed()
  }

  useGate(benchesPageGates.BenchesPageGate, {
    pagination: useUnit(simpleBenchesSelectors.pagination)
  })

  // TODO: Мне не нравится данный подход. Надо переработать.
  // TODO: Добавить способ, который позвонит инициализировать стейт исходя из кверей
  useEffect(() => {
    setSearchParams({
      activeTab: activeTab.tab,
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
        onChange={(tab) => benchesEvents.tabChanged({ tab: tab as BenchesTabsType })}
      />

      <SDialog
        title={'Создание лавочки'}
        open={isCreateDialogOpen}
        onSuccess={handleOk}
        onCancel={handleCancel}
      >
        <FBenchCreate />
      </SDialog>

      {/*<SDialog*/}
      {/*  title={'Редактирование лавочки'}*/}
      {/*  open={isEditDialogOpen}*/}
      {/*  onSuccess={editBenchEvents.dialogClosed}*/}
      {/*  onCancel={editBenchEvents.dialogClosed}*/}
      {/*>*/}
      {/*  <FBenchEdit />*/}
      {/*</SDialog>*/}

      {/*<SDrawer*/}
      {/*  title={'Детальная лавочка'}*/}
      {/*  open={isDrawerOpen}*/}
      {/*  onClose={drawerClosed}*/}
      {/*>*/}
      {/*  <DetailBench />*/}
      {/*</SDrawer>*/}
    </div>
  )
}
