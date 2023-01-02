import { BenchTagType } from '@/app/types/bench.type'

export interface IBench {
    id: string
    lat: number
    lng: number
    images: string[]
    owner_id: string
    is_active: boolean
    tags: BenchTagType[]
}
