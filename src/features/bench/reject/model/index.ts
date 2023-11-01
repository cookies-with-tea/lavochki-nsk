import { attach, createEvent, createStore, sample } from 'effector'

import { rejectBenchFx } from 'features/bench/reject/api'

import { DecisionFormModelType } from 'shared/types'

const localRejectBenchFx = attach({ effect: rejectBenchFx })

const messageChanged = createEvent<DecisionFormModelType['message']>()
const dialogOpened = createEvent()
const dialogClosed = createEvent()
const formSubmitted = createEvent()

const $message = createStore<DecisionFormModelType['message']>('')
const $isDialogVisible = createStore(false)

$message.on(messageChanged, (_, message) => message)
$isDialogVisible
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)

sample({
  clock: formSubmitted,
  source: { ...$message },
  target: localRejectBenchFx,
})

export const rejectDecisionEvents = {
  dialogOpened,
  dialogClosed,
  messageChanged,
  formSubmitted,
}

export const rejectDecisionSelectors = {
  isDialogVisible: $isDialogVisible,
  message: $message,
}
