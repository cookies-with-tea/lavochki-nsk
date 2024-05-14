package migrations

import (
	"database/sql"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

const defaultMigrationsFolder = "migrations"

type MigrationsManager interface {
	Migrate() error
}

type Manager struct {
	dsn string
}

func NewManager(dsn string) MigrationsManager {
	return &Manager{
		dsn: dsn,
	}
}

func (manager *Manager) Migrate() error {
	db, err := sql.Open("postgres", manager.dsn)
	if err != nil {
		return err
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}

	mg, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", defaultMigrationsFolder),
		"postgres", driver)
	if err != nil {
		return err
	}
	mg.Up()

	return nil
}
