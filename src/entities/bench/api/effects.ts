import { createEffect } from 'effector'

import { benchApi } from '#entities/bench/api/repositories'

const createFx = createEffect<any, BenchTypes.All>(async (payload) => await benchApi.create(payload))
const getAllFx = createEffect<void, BenchTypes.All>(async () => await benchApi.getAll())
const getOneFx = createEffect<BenchTypes.One['id'], BenchTypes.One>(async (uuid) => await benchApi.getOne(uuid))
const updateOneFx = createEffect<BenchTypes.Update, any>(async (payload) => await benchApi.updateOne(payload))
const deleteOneFx = createEffect<BenchTypes.One['id'], any>(async (uuid) => await benchApi.deleteOne(uuid))

export const benchApiFx = {
  createFx,
  getAllFx,
  getOneFx,
  updateOneFx,
  deleteOneFx,
}
