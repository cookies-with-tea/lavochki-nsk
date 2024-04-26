declare namespace BenchTypes {
  type BenchTag = {
    id: string
    title: string
    active: boolean
  }

  type One = {
    id: string
    lat: number
    lng: number
    images: Array<string>
    owner: string
    is_active: boolean
    tags: Array<BenchTag>
    street: string
  }

  type All = Array<One>

  type Response = {
    items: BenchTypes.All
    pagination: CommonTypes.ResponsePagination
  }

  type Update = Pick<BenchTypes.One, 'id' | 'lat' | 'lng'> & { tags: Array<string> } & { images: any }

  type DecisionFormModel = {
    message: string
    id: string
    decision: boolean
  }

  type Variants = 'benches' | 'moderation' | 'tags'
}
