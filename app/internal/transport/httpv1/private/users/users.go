package users

import (
	"net/http"

	"benches/internal/apperror"
	"benches/internal/constants/roles"
	_ "benches/internal/domain"
	"benches/internal/policy/users"
	"benches/internal/transport/httpv1"
	"benches/pkg/auth"

	"github.com/gorilla/mux"
)

type Handler struct {
	httpv1.BaseHandler
	policy *users.Policy
}

const (
	urlMe        = "/me"
	urlListUsers = "/users"
)

func NewHandler(policy *users.Policy) *Handler {
	return &Handler{policy: policy}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	meUsersRouter := router.NewRoute().Subrouter()
	meUsersRouter.Use(authManager.JWTMiddleware)
	meUsersRouter.HandleFunc(urlMe, apperror.Middleware(handler.me))

	adminPanelRouter := router.NewRoute().Subrouter()
	adminPanelRouter.Use(authManager.JWTRoleMiddleware(roles.Admin))
	adminPanelRouter.HandleFunc(urlListUsers, apperror.Middleware(handler.listAllUsers)).Methods("GET")
}

// @Summary Get Me
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Success 200 {object} domain.User
// @Success 200
// @Failure 418
// @Router /api/v1/users/me [get]
func (handler *Handler) me(writer http.ResponseWriter, request *http.Request) error {
	userID := request.Context().Value("userID").(string)

	user, errGetUser := handler.policy.GetUserByID(request.Context(), userID)
	if errGetUser != nil {
		return errGetUser
	}

	handler.ResponseJson(writer, user, http.StatusOK)
	return nil
}

// @Summary Get all users
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Success 200 {object} []domain.User
// @Failure 418
// @Router /api/v1/users [get]
func (handler *Handler) listAllUsers(writer http.ResponseWriter, request *http.Request) error {
	all, errGetAllUsers := handler.policy.GetAllUsers(request.Context())
	if errGetAllUsers != nil {
		return errGetAllUsers
	}

	handler.ResponseJson(writer, all, http.StatusOK)
	return nil
}
