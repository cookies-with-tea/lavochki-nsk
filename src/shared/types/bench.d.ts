import { CommonTypes } from '@/shared/types/common'

export namespace BenchTypes {
  type One = {
    id: string
    lat: number
    lng: number
    images: Array<string>
    owner: string
    is_active: boolean
    tags: BenchTypes.Tags
    street: string
  }

  type All = Array<One>

  type Response = {
    items: BenchTypes.All
    pagination: CommonTypes.ResponsePagination
  }

  type Tag = {
    id: string
    title: string
    selected?: boolean
  }

  type Tags = Array<Tag>

  type Comment = {
    author_id: string
    bench_id: string
    content: string
    id: string
    nested_comments: Array<BenchTypes.Comment> | null
    parent_id?: string
  }
}
