package geo

import "math"

const EarthRadius = 6371210

func GetRange(latitude, longitude float64, distance float64) (float64, float64) {
	//Получаем дельту по широте
	deltaLat := ComputeDelta(latitude)
	// Дельту по долготе
	deltaLon := ComputeDelta(longitude)

	// Вычисляем диапазон координат по широте
	aroundLat := distance / deltaLat

	// Вычисляем диапазон координат по долготе
	aroundLon := distance / deltaLon

	return aroundLat, aroundLon
}

// ComputeDelta https://en.wikipedia.org/wiki/Longitude#Length_of_a_degree_of_longitude
func ComputeDelta(degrees float64) float64 {
	return math.Pi / 180 * EarthRadius * math.Cos(DegTwoRad(degrees))
}

func DegTwoRad(degrees float64) float64 {
	return degrees * math.Pi / 180
}
