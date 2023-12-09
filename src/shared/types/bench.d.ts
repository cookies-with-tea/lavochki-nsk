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
}
