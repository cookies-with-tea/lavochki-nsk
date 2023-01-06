package tags

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	tagsPolicy "benches/internal/policy/tags"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"

	_ "benches/internal/domain"
)

type Handler struct {
	baseHandler
	policy *tagsPolicy.Policy
}

func NewTagsHandler(policy *tagsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc("", apperror.Middleware(handler.listTags)).Methods("GET")
	router.HandleFunc("", apperror.Middleware(handler.createTag)).Methods("POST")
}

// @Summary List tags
// @Description Get list tags
// @Tags Tags
// @Success 200 {object} []domain.Tag
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/tags [get]
func (handler *Handler) listTags(w http.ResponseWriter, r *http.Request) error {
	listTags, err := handler.policy.GetAllTags(r.Context())
	if err != nil {
		return err
	}
	handler.ResponseJson(w, listTags, http.StatusOK)
	return nil
}

// @Summary Create tag
// @Description Create tag
// @Tags Tags
// @Param CreateTag body dto.CreateTag true "tag data"
// @Failure 400 {object} apperror.AppError
// @Failure 403 {object} apperror.AppError
// @Router /api/v1/tags [post]
func (handler *Handler) createTag(w http.ResponseWriter, r *http.Request) error {
	var tag dto.CreateTag
	if err := json.NewDecoder(r.Body).Decode(&tag); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := tag.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := handler.policy.CreateTag(r.Context(), tag.ToDomain())
	if err != nil {
		return err
	}

	handler.ResponseJson(w, nil, http.StatusCreated)
	return nil
}
