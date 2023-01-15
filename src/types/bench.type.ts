import {SlideType} from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages/BenchesDialogImages.type";

export type BenchType = {
    id: string
    lat: number
    lng: number
    images: string[] | SlideType[]
    owner: string
    is_active: boolean
    tags: BenchTagType[]
    address?: string
}

export type BenchTagType = {
    id: string
    title: string
    active?: boolean
}

