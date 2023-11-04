import { createEffect, createStore, forward, sample } from 'effector'
import { createGate } from 'effector-react'

import { getApiTags } from 'pages/tags/api/tags'

import { createBenchTagEffects } from 'features/tag/model'

import { TagType } from 'shared/types'

const TagsPageGate = createGate()

export const getTagsFx = createEffect(async () => await getApiTags())

export const $tags = createStore<Array<TagType>>([])

// TODO: Разобраться с типами
// @ts-ignore
$tags.on(getTagsFx.doneData, (_, { data }) => data)

forward({
  from: TagsPageGate.open,
  to: getTagsFx,
})

sample({
  clock: createBenchTagEffects.localCreateTagFx.done,
  target: getTagsFx,
})

export const tagsPageGates = {
  TagsPageGate,
}
