package tags

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	"benches/internal/service/tags"
	"encoding/json"
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
	router.HandleFunc("", apperror.Middleware(h.listTags)).Methods("GET")
	router.HandleFunc("", apperror.Middleware(h.createTag)).Methods("POST")
}

// @Summary List tags
// @Description Get list tags
// @Tags Tags
// @Success 200 {object} []domain.Tag
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/tags [get]
func (h *Handler) listTags(w http.ResponseWriter, r *http.Request) error {
	listTags, err := h.service.GetAllTags(r.Context())
	if err != nil {
		return err
	}
	h.ResponseJson(w, listTags, http.StatusOK)
	return nil
}

// @Summary Create tag
// @Description Create tag
// @Tags Tags
// @Param CreateTag body dto.CreateTag true "tag data"
// @Failure 400 {object} apperror.AppError
// @Failure 403 {object} apperror.AppError
// @Router /api/v1/tags [post]
func (h *Handler) createTag(w http.ResponseWriter, r *http.Request) error {
	var tag dto.CreateTag
	if err := json.NewDecoder(r.Body).Decode(&tag); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := tag.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := h.service.CreateTag(r.Context(), tag)
	if err != nil {
		return err
	}

	h.ResponseJson(w, nil, http.StatusCreated)
	return nil
}
