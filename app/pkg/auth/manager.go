package auth

import (
	"errors"
	"fmt"
	"math/rand"
	"time"

	"github.com/golang-jwt/jwt"
)

var (
	ErrUnexpectedSigningMethod = errors.New("unexpected signing method")
	ErrGetUserClaimsFromToken  = errors.New("failed get user claims from token")
)

type TokenManager interface {
	NewJWT(userID string, role string, ttl time.Duration) (string, error)
	Parse(accessToken string) (string, error)
	NewRefreshToken() (string, error)
}

type Manager struct {
	signingKey string
}

func NewManager(signingKey string) (*Manager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &Manager{signingKey: signingKey}, nil
}

type tokenClaims struct {
	jwt.StandardClaims
	UserId string `json:"user_id"`
	Role   string `json:"role"`
}

func (manager *Manager) NewJWT(userID string, role string, ttl time.Duration) (string, error) {
	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		&tokenClaims{
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(ttl).Unix(),
			},
			UserId: userID,
			Role:   role,
		},
	)

	return token.SignedString([]byte(manager.signingKey))
}

func (manager *Manager) NewRefreshToken() (string, error) {
	bytes := make([]byte, 32)

	source := rand.NewSource(time.Now().Unix())
	random := rand.New(source)

	if _, err := random.Read(bytes); err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", bytes), nil
}

func (manager *Manager) Parse(accessToken string) (string, error) {
	token, err := jwt.Parse(accessToken, func(token *jwt.Token) (i any, err error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrUnexpectedSigningMethod
		}

		return []byte(manager.signingKey), nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", ErrGetUserClaimsFromToken
	}

	return claims["sub"].(string), nil
}
