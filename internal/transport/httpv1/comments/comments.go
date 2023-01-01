package comments

import (
	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/dto"
	commentsService "benches/internal/service/comments"
	usersService "benches/internal/service/users"
	"benches/pkg/auth"
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

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc("/{id}", apperror.Middleware(handler.listCommentsByBench))

	interactionCommentRouter := router.NewRoute().Subrouter()
	interactionCommentRouter.Use(authManager.JWTMiddleware)
	interactionCommentRouter.HandleFunc("", apperror.Middleware(handler.createComment)).Methods("POST")
	interactionCommentRouter.HandleFunc("", apperror.Middleware(handler.updateComment)).Methods("PATCH")
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

// @Summary Create comment
// @Tags Comments
// @Produce json
// @Param CreateComment body dto.CreateComment true "comment data"
// @Param Authorization header string true "Bearer"
// @Success 201
// @Failure 400
// @Router /api/v1/comments [post]
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

// @Summary Update comment
// @Tags Comments
// @Produce json
// @Param UpdateComment body dto.UpdateComment true "comment data"
// @Success 200
// @Failure 400
// @Router /api/v1/comments [patch]
func (handler *Handler) updateComment(writer http.ResponseWriter, request *http.Request) error {
	var comment dto.UpdateComment
	if err := json.NewDecoder(request.Body).Decode(&comment); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if errValidate := comment.Validate(); errValidate != nil {
		details, _ := json.Marshal(errValidate)
		return apperror.NewAppError(errValidate, "validation error", details)
	}

	// Проверка на владельца комментария
	isOwner, errIsOwner := handler.comments.IsOwner(
		request.Context(), comment.ID, request.Context().Value("userID").(string))
	if errIsOwner != nil {
		return errIsOwner
	}

	if !isOwner {
		return apperror.ErrNotEnoughRights
	}

	// Обновление комментария
	errUpdate := handler.comments.UpdateComment(request.Context(), comment.ToDomain())
	if errUpdate != nil {
		return errUpdate
	}

	writer.WriteHeader(http.StatusOK)
	return nil
}
