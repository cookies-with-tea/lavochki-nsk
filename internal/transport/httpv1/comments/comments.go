package comments

import (
	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/dto"
	commentsPolicy "benches/internal/policy/comments"
	"benches/pkg/auth"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"net/http"
)

type Handler struct {
	baseHandler
	policy *commentsPolicy.Policy
}

func NewHandler(policy *commentsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
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

	if err := json.NewDecoder(request.Body).Decode(&comment); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if errValidate := comment.Validate(); errValidate != nil {
		details, _ := json.Marshal(errValidate)
		return apperror.NewAppError(errValidate, "validation error", details)
	}

	// Получаем ID пользователя из JWT
	userID := request.Context().Value("userID").(string)

	// Создание нового комментария
	errCreateComment := handler.policy.CreateComment(request.Context(), userID, comment.ToDomain())
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
	isOwner, errIsOwner := handler.policy.IsOwner(
		request.Context(), comment.ID, request.Context().Value("userID").(string))
	if errIsOwner != nil {
		return errIsOwner
	}

	if !isOwner {
		return apperror.ErrNotEnoughRights
	}

	// Обновление комментария
	errUpdate := handler.policy.UpdateComment(request.Context(), comment.ToDomain())
	if errUpdate != nil {
		return errUpdate
	}

	writer.WriteHeader(http.StatusOK)
	return nil
}

// @Summary Delete comment
// @Description Delete comment by ID
// @Tags Comments
// @Param Authorization header string true "Bearer"
// @Param id path string true "Comment ID"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/benches/{id} [delete]
func (handler *Handler) deleteComment(writer http.ResponseWriter, request *http.Request) error {
	idComment := mux.Vars(request)["id"]

	errDelete := handler.policy.DeleteComment(request.Context(), idComment)
	if errDelete != nil {
		return errDelete
	}

	writer.WriteHeader(http.StatusOK)

	return nil
}
