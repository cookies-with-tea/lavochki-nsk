import { Tabs } from '@mantine/core'
import { useGate } from 'effector-react'

import { benchesEvents, BenchesPageGate } from '#pages/benches/model'
import { BenchesModerationTable } from '#pages/benches/ui/BenchesModerationTable'
import { BenchesTable } from '#pages/benches/ui/BenchesTable'

export const BenchesPage = () => {
  useGate(BenchesPageGate)

  return (
    <div className={'benches-page'}>
      <h1>Benches</h1>

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
        </Tabs.List>

        <Tabs.Panel value={'benches'} pt={'xs'}>
          <BenchesTable />
        </Tabs.Panel>

        <Tabs.Panel value={'moderation'} pt={'xs'}>
          <BenchesModerationTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
