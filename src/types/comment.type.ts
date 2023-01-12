export type CommentType = {
    author_id: string
    bench_id: string
    content: string
    id: string
    nested_comments: CommentType[] | null
    parent_id?: string

}

export type UpdateCommentType = Pick<CommentType, 'content' | 'id'>

export type CreateCommentType = Pick<CommentType,
  | 'bench_id'
  | 'content'
  | Partial<'parent_id'>
>

export type CommentReportType = {
    ID: string
    cause: string
    commentID: string
    is_active: boolean
    userID: string
}