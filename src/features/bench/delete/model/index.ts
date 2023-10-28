import { createEvent, sample } from 'effector'

import { deleteBenchFx } from 'features/bench/delete/api'

const benchDeleted = createEvent<string>()

sample({
  clock: benchDeleted,
  target: deleteBenchFx,
})

export const deleteBenchEvents = {
  benchDeleted,
}
