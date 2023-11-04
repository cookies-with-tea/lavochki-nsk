import { createEffect } from 'effector'

import { tagsApi } from 'shared/api'

export const createTagFx = createEffect<any, any, any>(async (title) => await tagsApi.create(title))
