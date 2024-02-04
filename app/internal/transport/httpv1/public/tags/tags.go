package tags

import (
	"net/http"

	"benches/internal/apperror"
	tagsPolicy "benches/internal/policy/tags"
	"benches/internal/transport/httpv1"

	"github.com/gorilla/mux"

	_ "benches/internal/domain"
)

type Handler struct {
	httpv1.BaseHandler
	policy *tagsPolicy.Policy
}

const (
	urlListTags = ""
)

func NewHandler(policy *tagsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc(urlListTags, apperror.Middleware(handler.listTags)).Methods("GET")
}

// @Summary List tags
// @Description Get list tags
// @Tags Tags
// @Success 200 {object} []domain.Tag
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/public/tags [get]
func (handler *Handler) listTags(w http.ResponseWriter, r *http.Request) error {
	listTags, err := handler.policy.GetAllTags(r.Context())
	if err != nil {
		return err
	}
	handler.ResponseJson(w, listTags, http.StatusOK)
	return nil
}
