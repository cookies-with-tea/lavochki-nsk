package middleware

import (
	"log/slog"
	"net/http"
)

func Logging(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			logger.Info("new request", slog.String("method", request.Method), slog.String("uri", request.RequestURI))
			next.ServeHTTP(writer, request)
		})
	}
}
