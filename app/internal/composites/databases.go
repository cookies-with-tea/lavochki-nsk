package composites

import (
	"benches/internal/repository/minio"
	"benches/internal/repository/redis"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DatabaseComposite struct {
	PostgreSQL *pgxpool.Pool
	Redis      redis.Storage
	Minio      *minio.Storage
}

func NewDatabaseComposite(
	postgreSQL *pgxpool.Pool,
	redis redis.Storage,
	minio *minio.Storage,
) *DatabaseComposite {
	return &DatabaseComposite{
		PostgreSQL: postgreSQL,
		Redis:      redis,
		Minio:      minio,
	}
}
