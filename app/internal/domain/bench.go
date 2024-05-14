package domain

import "log/slog"

type Bench struct {
	ID       string
	Lat      float64
	Lng      float64
	Street   *string
	District *District
	Images   []string
	IsActive bool
	OwnerID  string
}

func (bench Bench) LogValue() slog.Value {
	return slog.GroupValue(
		slog.String("id", bench.ID),
		slog.Float64("lat", bench.Lat),
		slog.Float64("lng", bench.Lng),
		slog.Any("street", bench.Street),
		slog.Any("district", bench.District),
		slog.Any("images", bench.Images),
		slog.Bool("is_active", bench.IsActive),
		slog.String("owner_id", bench.OwnerID),
	)
}
