
import { combine, createEvent, createStore, forward, split } from 'effector'
import { createGate } from 'effector-react'

import { BenchesTabsType } from 'pages/benches/types'

import { benchesEffects } from 'entities/bench/api'

import { moderationBenchesSelectors } from './moderation-benches'
import { simpleBenchesSelectors } from './simple-benches'

// TODO: Странная типизация. Надо поправить.
type StoreType = {
  tab: {
    tab: BenchesTabsType
  }
}

const BenchesPageGate = createGate()

const tabChanged = createEvent<StoreType['tab']>()

const $activeTab = createStore<StoreType['tab']>({
  tab: 'benches'
})

$activeTab.on(tabChanged, (_, tab) => tab)

// TODO: После добавления atomic router делать проверку на activeTab в кверях
// condition from 'patronum'
forward({
	from: BenchesPageGate.open,
  to: benchesEffects.getBenchesFx
})

split({
	clock: tabChanged,
  source: combine(
    $activeTab,
    simpleBenchesSelectors.pagination,
    moderationBenchesSelectors.pagination,
    (
      activeTab,
      simpleBenchesPagination,
      moderationBenchesPagination
    ) => {
      return {
        activeTab,
        simpleBenchesPagination,
        moderationBenchesPagination
      }
  }),
	match: {
    benches: (tab) => tab.activeTab.tab === 'benches',
    'moderation-benches': (tab) => tab.activeTab.tab === 'moderation-benches',
  },
  cases: {
    'moderation-benches': benchesEffects.getBenchesFx,
    benches: benchesEffects.getModerationBenchesFx,
  }
})

export const benchesPageGates = {
  BenchesPageGate,
}

export const benchesEvents = {
  tabChanged,
}

export const benchesSelectors = {
  activeTab: $activeTab,
}
