import { Tabs } from '@mantine/core'
import { useGate } from 'effector-react'

import { benchesEvents, BenchesPageGate } from '#pages/benches/model'
import { BenchesModerationTable } from '#pages/benches/ui/BenchesModerationTable'
import { BenchesTable } from '#pages/benches/ui/BenchesTable'
import { BenchesTagsTable } from '#pages/benches/ui/BenchesTagsTable'

import { UiButton, UiIcon } from '#shared/ui'

export const BenchesPage = () => {
  useGate(BenchesPageGate)

  return (
    <div className={'benches-page'}>
      <div className={'header-container'}>
        <h1>Лавочки</h1>

        <UiButton rightSection={<UiIcon name={'plus'} />}>Создать</UiButton>
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
    </div>
  )
}
