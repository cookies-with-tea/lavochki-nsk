export type BenchType = {
    id: string
    lat: number
    lng: number
    images: string[]
    owner_id: string
    is_active: boolean
    tags: BenchTagType[]
    address?: string
}

export type BenchTagType = {
    id: string
    title: string
    active?: boolean
}

