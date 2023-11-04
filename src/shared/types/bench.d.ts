declare namespace BenchTypes {
  type One = {
    id: string
    lat: number
    lng: number
    images: Array<string>
    owner: string
    is_active: boolean
    tags: Array<BenchTagType>
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

  type Variants = 'benches' | 'moderation-benches'
}



export type BenchType = {
	id: string
	lat: number
	lng: number
	images: Array<string>
	owner: string
	is_active: boolean
	tags: Array<BenchTagType>
	street: string
}

export type UpdateBenchType = Pick<BenchType, 'id' | 'lat' | 'lng'> & { tags: Array<string> } & { images: any }

export type BenchesResponseType = {
	count: number
	count_all_pages: number
	count_in_page: number
	items: Array<BenchType>
}

export type BenchTagType = {
	id: string
	title: string
	active: boolean
}

export type SetDecisionPayloadType = {
  decision: boolean
  id: string
  message: string
}

export type DecisionFormModelType = {
  message: string
  decision: boolean
}

