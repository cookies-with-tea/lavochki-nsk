package tags

import (
	"benches/internal/apperror"
	"benches/internal/service/tags"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	service tags.Service
}

func NewTagsHandler(service tags.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) Register(router *mux.Router) {
	router.HandleFunc("/", apperror.Middleware(h.listTags)).Methods("GET")
}

// @Summary List tags
// @Description Get list tags
// @Tags Tags
// @Success 200 {object} []domain.Tag
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/tags/ [get]
func (h *Handler) listTags(w http.ResponseWriter, r *http.Request) error {
	listTags, err := h.service.GetAllTags(r.Context())
	if err != nil {
		return err
	}
	h.ResponseJson(w, listTags, http.StatusOK)
	return nil
}
