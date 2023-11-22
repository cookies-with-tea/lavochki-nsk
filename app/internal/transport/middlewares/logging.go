package middlewares

import (
	"net/http"

	"go.uber.org/zap"
)

func Logging(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			logger.Info("new request", zap.String("method", request.Method), zap.String("uri", request.RequestURI))
			next.ServeHTTP(writer, request)
		})
	}
}
