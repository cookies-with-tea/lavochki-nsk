import {CommentType} from "@/app/types/comment.type";

export interface IComment {
    author_id: string
    bench_id: string
    content: string
    id: string
    nested_comments?: Omit<CommentType, 'nested_comments'>[]
    parent_id?: string
}

