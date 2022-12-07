package comments

import (
	"benches/internal/apperror"
	commentsService "benches/internal/service/comments"
	"database/sql"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	comments commentsService.Service
}

func NewCommentsHandler(comments commentsService.Service) *Handler {
	return &Handler{
		comments: comments,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc("/{id}", apperror.Middleware(handler.listCommentsByBench))
}

func (handler *Handler) listCommentsByBench(writer http.ResponseWriter, request *http.Request) error {
	id := mux.Vars(request)["id"]

	comments, err := handler.comments.GetAllCommentByBench(request.Context(), id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return apperror.ErrNotFound
		}
		return err
	}

	handler.ResponseJson(writer, comments, http.StatusOK)
	return nil
}
