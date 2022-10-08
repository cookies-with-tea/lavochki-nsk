package auth

import (
	"context"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"net/http"
	"strings"
)

type usersRepository interface {
	GetUserByID(ctx context.Context, id interface{}) (interface{}, error)
}

type RoleManager struct {
	repository usersRepository
	signingKey string
}

func NewRoleManager(signingKey string, repository usersRepository) (*RoleManager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &RoleManager{
		signingKey: signingKey,
		repository: repository,
	}, nil
}

// JWTAndRoleMiddleware TODO: refactoring
func (m *RoleManager) JWTAndRoleMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(authHeader) != 2 {
			fmt.Println("Malformed token")
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("Malformed Token"))
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
			}
		} else {
			jwtToken := authHeader[1]
			token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(m.signingKey), nil
			})

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				ctx := context.WithValue(r.Context(), "userID", claims["sub"])
				userRole, err := m.repository.GetUserByID(context.Background(), claims["sub"])
				if err != nil {
					w.WriteHeader(http.StatusUnauthorized)
					_, err2 := w.Write([]byte("Unauthorized"))
					if err2 != nil {
						return
					}
				}
				context.WithValue(ctx, "userRole", userRole)
				next.ServeHTTP(w, r.WithContext(ctx))
			} else {
				fmt.Println(err)
				w.WriteHeader(http.StatusUnauthorized)
				_, err2 := w.Write([]byte("Unauthorized"))
				if err2 != nil {
					return
				}
			}
		}
	})
}
