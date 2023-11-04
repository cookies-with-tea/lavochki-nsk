import { attach, createStore, forward } from 'effector'
import { createGate } from 'effector-react'

import { getReportedCommentsFx } from 'pages/reported-comments/api'

const localGetReportedCommentsFx = attach({ effect: getReportedCommentsFx })

const ReportedCommentsGate = createGate()

const $comments = createStore<ReportedCommentsTypes.All>([])

$comments.on(localGetReportedCommentsFx.doneData, (_, response) => {
  return response
})

const $isPending = localGetReportedCommentsFx.pending

forward({
  from: ReportedCommentsGate.open,
  to: localGetReportedCommentsFx
})

export const reportedCommentsGates = {
  ReportedCommentsGate,
}

export const reportedCommentsSelectors = {
  comments: $comments,
  isPending: $isPending,
}
