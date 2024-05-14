package domain

import "time"

type TokenCredentials struct {
	AccessToken  string
	RefreshToken string
}

type TokenInformation struct {
	AccessTime  time.Duration
	RefreshTime time.Duration
}
