package maps

import (
	"fmt"

	"github.com/codingsince1985/geo-golang/yandex"
)

func NewYandexGeoCoder(token string) GeoCoder {
	return yandex.Geocoder(
		token,
		fmt.Sprintf("https://geocode-maps.yandex.ru/1.x/?results=1&lang=ru_RU&format=json&apikey=%s&", token),
	)
}
