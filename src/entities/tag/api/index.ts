import { createEffect } from 'effector'

import { tagsApi } from 'shared/api'

export const getTagsFx = createEffect<void, TagTypes.All>(() => tagsApi.get())
