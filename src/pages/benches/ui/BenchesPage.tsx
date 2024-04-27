import { Tabs } from '@mantine/core'
import { useGate } from 'effector-react'

import { benchesEvents, BenchesPageGate } from '#pages/benches/model'
import { createBenchEvents } from '#pages/benches/model/create-bench'

import { UiButton, UiIcon } from '#shared/ui'

import { BenchesModerationTable } from './BenchesModerationTable'
import { BenchesTable } from './BenchesTable'
import { BenchesTagsTable } from './BenchesTagsTable'
import { CreateBenchModal } from './CreateBenchModal'
import { DetailBenchDrawer } from './DetailBenchDrawer'
import { EditBenchModal } from './EditBenchModal'

export const BenchesPage = () => {
  useGate(BenchesPageGate)

  return (
    <div className={'benches-page'}>
      <div className={'header-container'}>
        <h1>Лавочки</h1>

        <UiButton rightSection={<UiIcon name={'plus'} />} onClick={() => createBenchEvents.dialogOpened()}>
          Создать
        </UiButton>
      </div>

      <Tabs
        color={'teal'}
        defaultValue={'benches'}
        onChange={(tab) => benchesEvents.tabChanged(tab as BenchTypes.Variants)}
      >
        <Tabs.List>
          <Tabs.Tab value={'benches'}>Лавочки</Tabs.Tab>

          <Tabs.Tab value={'moderation'} color="blue">
            Лавочки на модерации
          </Tabs.Tab>

          <Tabs.Tab value={'tags'} color="purple">
            Лавочки на модерации
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={'benches'} pt={'lg'}>
          <BenchesTable />
        </Tabs.Panel>

        <Tabs.Panel value={'moderation'} pt={'lg'}>
          <BenchesModerationTable />
        </Tabs.Panel>

        <Tabs.Panel value={'tags'} pt={'lg'}>
          <BenchesTagsTable />
        </Tabs.Panel>
      </Tabs>

      <DetailBenchDrawer />

      <EditBenchModal />

      <CreateBenchModal />
    </div>
  )
}
