import { createEffect } from 'effector'

import { reportsApi } from 'shared/api/reports'

export const getReportedCommentsFx = createEffect<void, ReportedCommentsTypes.All>(() => {
  return reportsApi.getReportedComments()
})
