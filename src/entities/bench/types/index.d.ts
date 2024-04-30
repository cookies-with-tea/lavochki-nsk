declare namespace BenchTypes {
  type DecisionFormModel = {
    message: string
    id: string
    decision: boolean
  }

  type Tag = {
    id: string
    title: string
    active: boolean
  }

  type AllTags = Array<BenchTypes.Tag>

  type One = {
    id: string
    lat: number
    lng: number
    images: Array<string>
    owner: string
    is_active: boolean
    tags: BenchTypes.AllTags
    street: string
  }

  type All = Array<BenchTypes.One>

  type Response = {
    items: BenchTypes.All
    pagination: CommonTypes.ResponsePagination
  }

  type Update = Pick<BenchTypes.One, 'id' | 'lat' | 'lng'> & { tags: Array<string> } & { images: any }

  type Create = Pick<BenchTypes.One, 'lat' | 'lng' | 'owner'> & { tags: Array<string> }

  type Variants = 'benches' | 'moderation' | 'tags'
}
