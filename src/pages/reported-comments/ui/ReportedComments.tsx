import { useGate } from 'effector-react'

import { reportedCommentsGates } from 'pages/reported-comments/model'
import { ReportedCommentsTable } from 'pages/reported-comments/ui/ReportedCommentsTable'

export const ReportedComments = () => {
  useGate(reportedCommentsGates.ReportedCommentsGate)
  // TODO: Each child in a list should have a unique "key" prop.
  // Посмотреть на поведение, ибо key присутствует
  return (
    <div className={'reported-comments-page'}>
      <h1>Жалобы на комментарии</h1>

      <ReportedCommentsTable />
    </div>
  )
}
