import { attach, createEvent, sample } from 'effector'

import { benchApiFx } from '#entities/bench'

const attachedFx = attach({ effect: benchApiFx.deleteOneFx })

const benchDeleted = createEvent<BenchTypes.One['id']>()

sample({
  clock: benchDeleted,
  target: attachedFx,
})

export const deleteBenchEvents = {
  benchDeleted,
}
