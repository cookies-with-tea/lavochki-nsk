import { attach, createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'

import { benchApiFx } from '#entities/bench'

import { searchParams } from '#shared/lib/utils'

const { get, set } = searchParams()

export const BenchesPageGate = createGate()

const attachedFx = attach({ effect: benchApiFx.getAllFx })

const tabChanged = createEvent<BenchTypes.Variants>()

const $activeTab = createStore<BenchTypes.Variants>('benches')

$activeTab.on(tabChanged, (_, tab) => {
  set('table', tab)

  return tab
})

BenchesPageGate.status.watch(async (opened) => {
  const currentParam = get('table')

  if (!currentParam) {
    set('table', 'benches')
  }

  if (opened) {
    attachedFx()
  }
})

export const benchesSelectors = {
  activeTab: $activeTab,
}

export const benchesEvents = {
  tabChanged,
}
