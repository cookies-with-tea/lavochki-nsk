const MAP_QUERY = {
  lang: 'ru_RU',
  load: 'package.full', // TODO: Проверить нужны ли все пакеты,
} as const

const MAP_PARAMS = {
  version: '2.1.79',
  defaultState: {
    center: [
      55.0110, 82.9610
    ],
    zoom: 9,
  },
  modules: [
    'domEvent.manager',
    'geolocation',
    'geoObject.addon.balloon',
    'geoObject.addon.hint'
  ]
}

export const mapConfig = {
  MAP_QUERY,
  MAP_PARAMS,
}
