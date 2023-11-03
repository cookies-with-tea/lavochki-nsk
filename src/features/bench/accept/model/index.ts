import { attach, createEvent, createStore, sample } from 'effector'

import { acceptBenchFx } from 'features/bench/accept/api'

import { BenchTypes, DecisionFormModelType } from 'shared/types'

const localAcceptBenchFx = attach({ effect: acceptBenchFx })

const messageChanged = createEvent<DecisionFormModelType['message']>()
const dialogOpened = createEvent<string>('')
const dialogClosed = createEvent()
const formSubmitted = createEvent()

const $benchId = createStore<BenchTypes.One['id']>('')
const $message = createStore<BenchTypes.DecisionFormModel['message']>('')
const $decision = createStore<BenchTypes.DecisionFormModel['decision']>(true)
const $isDialogVisible = createStore(false)

$benchId.on(dialogOpened, (_, id) => id)
$message.on(messageChanged, (_, message) => message)
$isDialogVisible
  .on(dialogOpened, () => true)
  .on(dialogClosed, () => false)

sample({
  clock: formSubmitted,
  source: { message: $message, decision: $decision, id: $benchId },
  target: localAcceptBenchFx,
})

sample({
  clock: localAcceptBenchFx.done,
  target: dialogClosed,
})

export const acceptDecisionEffects = {
  localAcceptBenchFx,
}

export const acceptDecisionEvents = {
  dialogOpened,
  dialogClosed,
  messageChanged,
  formSubmitted,
}

export const acceptDecisionSelectors = {
  isDialogVisible: $isDialogVisible,
  message: $message,
}
