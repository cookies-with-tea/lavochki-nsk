package image

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/application/image"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi"
)

const (
	urlUploadImage = "/"
)

type Handler struct {
	httpv1.BaseHandler
	service *image.Service
	logger  *slog.Logger
}

func NewHandler(service *image.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (handler *Handler) Register(router chi.Router) {
	router.HandleFunc(urlUploadImage, handler.UploadImage)
}

func (handler *Handler) UploadImage(writer http.ResponseWriter, request *http.Request) {}
