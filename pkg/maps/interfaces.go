package maps

import "github.com/codingsince1985/geo-golang"

type GeoCoder interface {
	ReverseGeocode(lat, lng float64) (*geo.Address, error)
}
