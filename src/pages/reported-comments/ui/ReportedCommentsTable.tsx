import { useUnit } from 'effector-react'

import { reportedCommentsColumns } from 'pages/reported-comments/constants'
import { reportedCommentsSelectors } from 'pages/reported-comments/model'

import { WTable } from 'widgets/w-table'

export const ReportedCommentsTable = () => {
  const [comments, pending] = useUnit([reportedCommentsSelectors.comments, reportedCommentsSelectors.isPending])

  return (
    <WTable<ReportedCommentsTypes.One>
      loading={pending}
      className={'reported-comments-table mt-30'}
      dataSource={comments}
      columns={reportedCommentsColumns}
      rowKey={'ID'}
    >
    </WTable>
  )
}
