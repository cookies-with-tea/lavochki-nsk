import { attach, createEvent, createStore, sample } from 'effector'

import { createTagFx } from 'features/tag/api'

const localCreateTagFx = attach({ effect: createTagFx })

const titleChanged = createEvent<string>()
const dialogOpened = createEvent()
const dialogClosed = createEvent()
const formSubmitted = createEvent()

const $title = createStore<string>('')
const $isDialogVisible = createStore(false)

$title.on(titleChanged, (_, title) => title)
$isDialogVisible
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)

sample({
  clock: formSubmitted,
  source: { ...$title },
  target: localCreateTagFx,
})

sample({
  clock: localCreateTagFx.done,
  target: dialogClosed,
})

export const createBenchTagEffects = {
  localCreateTagFx,
}

export const createBenchTagEvents = {
  dialogOpened,
  dialogClosed,
  titleChanged,
  formSubmitted,
}

export const createBenchTagSelectors = {
  isDialogVisible: $isDialogVisible,
  title: $title,
}
