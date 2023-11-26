package comments

import (
	"errors"
	"net/http"

	"benches/internal/apperror"
	_ "benches/internal/domain"
	commentsPolicy "benches/internal/policy/comments"
	"benches/internal/transport/httpv1"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
)

type Handler struct {
	httpv1.BaseHandler
	policy *commentsPolicy.Policy
}

const (
	urlListComments = "/{id}"
)

func NewHandler(policy *commentsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc(urlListComments, apperror.Middleware(handler.listCommentsByBench))
}

// @Summary List comments by bench
// @Description Get list comments by bench
// @Tags Comments
// @Param id path string true "Bench ID"
// @Success 200 {object} []domain.Comment
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/comments/{id} [get]
func (handler *Handler) listCommentsByBench(writer http.ResponseWriter, request *http.Request) error {
	id := mux.Vars(request)["id"]

	comments, err := handler.policy.GetAllCommentByBench(request.Context(), id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return apperror.ErrNotFound
		}
		return err
	}

	handler.ResponseJson(writer, comments, http.StatusOK)
	return nil
}
