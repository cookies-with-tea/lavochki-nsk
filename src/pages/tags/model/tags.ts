import { createStore, forward, sample } from 'effector'
import { attach } from 'effector'
import { createGate } from 'effector-react'

import { createBenchTagEffects } from 'features/tag/model'

import { getTagsFx } from 'entities/tag'

const localGetTagsFx = attach({ effect: getTagsFx })

const TagsPageGate = createGate()

export const $tags = createStore<TagTypes.All>([])

$tags.on(localGetTagsFx.doneData, (_, data) => data)

forward({
  from: TagsPageGate.open,
  to: localGetTagsFx,
})

sample({
  clock: createBenchTagEffects.localCreateTagFx.done,
  target: getTagsFx,
})

export const tagsPageGates = {
  TagsPageGate,
}
