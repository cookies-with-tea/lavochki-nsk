import { ColumnsType } from 'antd/es/table'

export const reportedCommentsColumns: ColumnsType<ReportedCommentsTypes.One> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Причина',
    dataIndex: 'cause',
  },
  {
    title: 'ID комментария',
    dataIndex: 'comment_id',
  },
  {
    title: 'ID пользователя',
    dataIndex: 'user_id',
  },
]
