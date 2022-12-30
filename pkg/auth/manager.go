package auth

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
)

type TokenManager interface {
	NewJWT(userId string, ttl time.Duration) (string, error)
	Parse(accessToken string) (string, error)
}

type Manager struct {
	signingKey string
}

type tokenClaims struct {
	jwt.StandardClaims
	UserId string `json:"user_id"`
	Role   string `json:"role"`
}

func NewManager(signingKey string) (*Manager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &Manager{signingKey: signingKey}, nil
}

func (m *Manager) NewJWT(userID string, role string, ttl time.Duration) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(ttl).Unix(),
		},
		UserId: userID,
		Role:   role,
	})

	return token.SignedString([]byte(m.signingKey))
}

func (m *Manager) Parse(accessToken string) (string, error) {
	token, err := jwt.Parse(accessToken, func(token *jwt.Token) (i interface{}, err error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(m.signingKey), nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("error get user claims from token")
	}

	return claims["sub"].(string), nil
}

func (m *Manager) NewRefreshToken() (string, error) {
	b := make([]byte, 32)

	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s)

	if _, err := r.Read(b); err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", b), nil
}

func (m *Manager) JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, err := m.checkJWT(w, r)
		if err != nil {
			return
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (m *Manager) JWTRoleMiddleware(role string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx, err := m.checkJWT(w, r)
			if err != nil {
				return
			}

			userRole := ctx.Value("userRole")
			if userRole != role {
				w.WriteHeader(http.StatusForbidden)
			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func (m *Manager) checkJWT(w http.ResponseWriter, r *http.Request) (context.Context, error) {
	authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
	if len(authHeader) != 2 {
		w.WriteHeader(http.StatusUnauthorized)
		errorResponse := ErrorResponse{
			Message: "malformed token",
			Details: nil,
		}
		_, err := w.Write(errorResponse.Marshal()) // nolint: errcheck
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
		}
		return nil, err
	}
	jwtToken := authHeader[1]
	token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(m.signingKey), nil
	})

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		errorResponse := ErrorResponse{
			Message: "unauthorized",
			Details: nil,
		}
		_, _ = w.Write(errorResponse.Marshal())
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		ctx := context.WithValue(r.Context(), "userID", claims["user_id"])
		ctx = context.WithValue(ctx, "userRole", claims["role"])
		return ctx, nil
	} else {
		errorResponse := ErrorResponse{
			Message: "unauthorized",
			Details: nil,
		}
		w.WriteHeader(http.StatusUnauthorized)
		_, err2 := w.Write(errorResponse.Marshal())

		if err2 != nil {
			return nil, err
		}
	}
	return nil, nil
}
