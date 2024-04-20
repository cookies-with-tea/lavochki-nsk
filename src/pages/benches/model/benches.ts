import { createStore } from 'effector'

import { benchApiFx } from '#entities/bench'

const $benches = createStore<BenchTypes.All>([])

$benches.on(benchApiFx.getAllFx.doneData, (_, data) => data)

export const benchesSelectors = {
  benches: $benches,
}
