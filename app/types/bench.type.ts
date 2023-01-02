export type BenchType = {
    id: string
    lat: number
    lng: number
    images: string[]
    owner_id: string
    is_active: boolean
    tags: BenchTagType[]
}

export type BenchTagType = {
    id: string
    title: string
    active?: boolean
}

