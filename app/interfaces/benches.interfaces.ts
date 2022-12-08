export interface IBench {
   bench: {
      id: string
      lat: number
      lng: number
      images: string[]
      owner_id: string
      is_active: boolean
   }
}

export interface IBenches {
   benches: {
      id: string
      lat: number
      lng: number
      images: string[]
      owner_id: string
      is_active: boolean
   }[]
}
