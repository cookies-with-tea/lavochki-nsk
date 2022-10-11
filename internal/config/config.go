package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"log"
)

type Config struct {
	IsDebug       bool   `env:"IS_DEBUG" env-default:"false"`
	IsDevelopment bool   `env:"IS_DEV" env-default:"false"`
	SigningKey    string `env:"SIGNING_KEY"`
	Listen        struct {
		BindIP string `env:"BIND_IP" env-default:"0.0.0.0"`
		Port   string `env:"PORT" env-default:"8000"`
	}
	AppConfig struct {
		LogLevel  string `env:"LOG_LEVEL" env-default:"trace"`
		AdminUser struct {
			Email    string `env:"ADMIN_EMAIL" env-default:"admin"`
			Password string `env:"ADMIN_PWD" env-default:"admin"`
		}
	}
	PostgreSQL struct {
		Username string `env:"POSTGRES_USER" env-required:"true"`
		Password string `env:"POSTGRES_PASSWORD" env-required:"true"`
		Host     string `env:"POSTGRES_HOST" env-required:"true"`
		Port     string `env:"POSTGRES_PORT" env-required:"true"`
		Database string `env:"POSTGRES_DB" env-required:"true"`
	}
	Minio struct {
		Endpoint  string `env:"MINIO_ENDPOINT" env-default:"minio:9000"`
		AccessKey string `env:"MINIO_ACCESS_KEY"`
		SecretKey string `env:"MINIO_SECRET_KEY"`
		Bucket    string `env:"MINIO_BUCKET" env-default:"benches"`
		UseSSL    bool   `env:"MINIO_USE_SSL" env-default:"true"`
	}
	Redis struct {
		Host     string `env:"REDIS_HOST" env-default:"redis:6379"`
		Password string `env:"REDIS_PASSWORD"`
		DB       int    `env:"REDIS_DB" env-default:"0"`
	}
	Images struct {
		PublicEndpoint string `env:"IMAGES_PUBLIC_ENDPOINT" env-default:"http://localhost:9000"`
	}
	Telegram struct {
		Token string `env:"TELEGRAM_TOKEN"`
	}
}

var instance *Config

func GetConfig() *Config {
	log.Print("Get config")

	instance = &Config{}

	if err := cleanenv.ReadConfig(".env", instance); err != nil {
		helpText := "Error read env"
		help, _ := cleanenv.GetDescription(instance, &helpText)
		log.Print(help)
		log.Fatal(err)
	}
	return instance
}
