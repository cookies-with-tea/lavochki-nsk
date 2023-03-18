import { createContext } from 'react'
import { MapStateOptionsType } from '@/app/types/map.type'

interface IMapContext {
  mapState: MapStateOptionsType
  dispatch?: (mapData: MapStateOptionsType) => void
}

export const MapContext = createContext<IMapContext>({
  mapState: {

  } as MapStateOptionsType
})