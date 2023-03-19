package migrations

import (
	"database/sql"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

const defaultFolderMigrations = "migrations"

type Manager struct {
	dsn string
}

func NewManager(dsn string) *Manager {
	return &Manager{dsn: dsn}
}

func (m *Manager) Migrate() error {
	db, err := sql.Open("postgres", m.dsn)
	if err != nil {
		return err
	}
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}
	mg, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", defaultFolderMigrations),
		"postgres", driver)
	if err != nil {
		return err
	}
	mg.Up()
	return nil
}
