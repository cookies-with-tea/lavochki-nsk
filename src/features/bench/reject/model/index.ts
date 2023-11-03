import { attach, createEvent, createStore, sample } from 'effector'

import { rejectBenchFx } from 'features/bench/reject/api'

import { BenchTypes, DecisionFormModelType } from 'shared/types'

const localRejectBenchFx = attach({ effect: rejectBenchFx })

const messageChanged = createEvent<DecisionFormModelType['message']>()
const dialogOpened = createEvent<string>('')
const dialogClosed = createEvent()
const formSubmitted = createEvent()

const $benchId = createStore<BenchTypes.One['id']>('')
const $message = createStore<BenchTypes.DecisionFormModel['message']>('')
const $decision = createStore<BenchTypes.DecisionFormModel['decision']>(false)
const $isDialogVisible = createStore(false)

$benchId.on(dialogOpened, (_, id) => id)
$message.on(messageChanged, (_, message) => message)
$isDialogVisible
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)

sample({
  clock: formSubmitted,
  source: { message: $message, decision: $decision, id: $benchId },
  target: localRejectBenchFx,
})

sample({
  clock: localRejectBenchFx.done,
  target: dialogClosed,
})

export const rejectDecisionEffects = {
  localRejectBenchFx,
}

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
