
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

