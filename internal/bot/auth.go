package bot

import (
	"benches-bot/internal/domain"
	"bytes"
	"encoding/json"
	"net/http"
)

type Auth struct {
	AuthURL    string
	RefreshURL string
}

func NewAuth(authURL, refreshURL string) *Auth {
	return &Auth{
		AuthURL:    authURL,
		RefreshURL: refreshURL,
	}
}

func (a *Auth) GetJWT(login, password string) (string, string, error) {
	credentials := struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}{
		Login:    login,
		Password: password,
	}

	jsonBody, _ := json.Marshal(credentials)
	r, err := http.Post(a.AuthURL, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", "", err
	}
	var tokens domain.Tokens
	if err := json.NewDecoder(r.Body).Decode(&tokens); err != nil {
		return "", "", err
	}
	return tokens.Access, tokens.Refresh, nil
}

func (a *Auth) Refresh(token string) (string, string, error) {
	credentials := struct {
		Token string `json:"token"`
	}{Token: token}
	jsonBody, _ := json.Marshal(credentials)
	r, err := http.Post(a.RefreshURL, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", "", err
	}
	var tokens domain.Tokens
	if err := json.NewDecoder(r.Body).Decode(&tokens); err != nil {
		return "", "", err
	}
	return tokens.Access, tokens.Refresh, nil
}
