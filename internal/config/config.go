package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"log"
)

type Config struct {
	IsDebug       bool   `env:"IS_DEBUG" env-default:"false"`
	IsDevelopment bool   `env:"IS_DEV" env-default:"false"`
	WebHookURL    string `env:"WEBHOOK_URL"`
	Telegram      struct {
		Token string `env:"BOT_TELEGRAM_TOKEN" env-required:"true"`
	}
	AppConfig struct {
		LogLevel  string `env:"LOG_LEVEL" env-default:"trace"`
		AdminUser struct {
			Email    string `env:"ADMIN_EMAIL" env-default:"admin"`
			Password string `env:"ADMIN_PWD" env-default:"admin"`
		}
	}
	BackendServer struct {
		Url string `env:"BACKEND_URL" env-default:"localhost:8000"`
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
