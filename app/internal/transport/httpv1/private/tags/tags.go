package tags

import (
	"encoding/json"
	"net/http"

	"benches/internal/apperror"
	"benches/internal/constants/roles"
	"benches/internal/dto"
	tagsPolicy "benches/internal/policy/tags"
	"benches/internal/transport/httpv1"
	"benches/pkg/auth"

	"github.com/gorilla/mux"

	_ "benches/internal/domain"
)

type Handler struct {
	httpv1.BaseHandler
	policy *tagsPolicy.Policy
}

const (
	urlCreateTag = ""
)

func NewHandler(policy *tagsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.Use(authManager.JWTRoleMiddleware(roles.Admin))

	router.HandleFunc(urlCreateTag, apperror.Middleware(handler.createTag)).Methods("POST")
}

// @Summary Create tag
// @Description Create tag
// @Tags Tags
// @Param CreateTag body dto.CreateTag true "tag data"
// @Failure 400 {object} apperror.AppError
// @Failure 403 {object} apperror.AppError
// @Router /api/v1/private/tags [post]
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
