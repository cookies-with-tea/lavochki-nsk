package comments

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	commentsService "benches/internal/service/comments"
	usersService "benches/internal/service/users"
	"database/sql"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	comments     commentsService.Service
	usersService usersService.Service
}

func NewCommentsHandler(comments commentsService.Service, usersService usersService.Service) *Handler {
	return &Handler{
		comments:     comments,
		usersService: usersService,
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

func (handler *Handler) createComment(writer http.ResponseWriter, request *http.Request) error {
	var comment dto.CreateComment

	// Получение пользователя, который хочет создать комментарий
	userID := request.Context().Value("userID")
	user, errGetUser := handler.usersService.GetUserByID(request.Context(), userID.(string))
	if errGetUser != nil {
		return errGetUser
	}

	if err := json.NewDecoder(request.Body).Decode(&comment); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if errValidate := comment.Validate(); errValidate != nil {
		details, _ := json.Marshal(errValidate)
		return apperror.NewAppError(errValidate, "validation error", details)
	}

	// Создание нового комментария
	commentDomain := comment.ToDomain()
	commentDomain.AuthorID = user.ID

	errCreateComment := handler.comments.CreateComment(request.Context(), commentDomain)
	if errCreateComment != nil {
		return errCreateComment
	}

	writer.WriteHeader(http.StatusCreated)
	return nil
}
