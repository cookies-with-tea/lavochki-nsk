export type MapBalloonType = {
  hintContent: string
  balloonContentBody: string
  clusterCaption: string
}

export type MapPointOptions = {
  preset?: string
  iconLayout?: string
  iconImageHref?: string
  iconImageSize?: number[]
  iconImageOffset?: number[]
  balloonOffset?: number[]
  iconShape?: {
    type?: string
    coordinates?: number[]
    radius?: number
  },
}

export type MapStateOptionsType = {
  center: number[]
  zoom: number
  behaviors: string[]
}