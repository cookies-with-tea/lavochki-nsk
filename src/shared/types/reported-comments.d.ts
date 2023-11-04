declare namespace ReportedCommentsTypes {
  type One = {
    ID: string
    cause: string
    comment_id: string
    is_active: boolean
    user_id: string
  }

  type All = Array<One>
}
