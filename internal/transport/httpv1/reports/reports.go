package reports

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	reportsPolicy "benches/internal/policy/reports"
	"benches/pkg/auth"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	policy *reportsPolicy.Policy
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	usersReportsRouter := router.NewRoute().Subrouter()
	usersReportsRouter.Use(authManager.JWTMiddleware)
	usersReportsRouter.HandleFunc("/comments", apperror.Middleware(handler.createReportComment)).Methods("POST")

	moderationReportsRouter := router.NewRoute().Subrouter()
	moderationReportsRouter.HandleFunc("/comments/moderation", apperror.Middleware(handler.listReportsComments)).
		Methods("GET")
}

func NewHandler(policy *reportsPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

// @Summary Create report comment
// @Tags Reports
// @Produce json
// @Param CreateComment body dto.CreateReportComment true "report comment data"
// @Param Authorization header string true "Bearer"
// @Success 201
// @Failure 400
// @Failure 409
// @Router /api/v1/reports/comments [post]
func (handler *Handler) createReportComment(writer http.ResponseWriter, request *http.Request) error {
	var report dto.CreateReportComment

	if errDecode := json.NewDecoder(request.Body).Decode(&report); errDecode != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if errValidate := report.Validate(); errValidate != nil {
		details, _ := json.Marshal(errValidate)
		return apperror.NewAppError(errValidate, "validation error", details)
	}

	// Создание жалобы на комментарий
	userID := request.Context().Value("userID").(string)

	// Проверка на то, существует ли уже жалоба от такого пользователя на этот комментарий
	isExists, errIsExists := handler.policy.IsExistsReportComment(request.Context(), report.CommentID, userID)
	if errIsExists != nil {
		return errIsExists
	}

	if isExists {
		return apperror.ErrObjectExists
	}

	reportDomain := report.ToDomain()
	reportDomain.UserID = userID

	errCreateReport := handler.policy.CreateReportComment(request.Context(), reportDomain)
	if errCreateReport != nil {
		return errCreateReport
	}

	writer.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary List moderation report comments
// @Tags Reports
// @Produce json
// @Success 200
// @Failure 418
// @Router /api/v1/reports/comments/moderation [get]
func (handler *Handler) listReportsComments(writer http.ResponseWriter, request *http.Request) error {
	commentsReports, errGetComments := handler.policy.GetCommentsReports(request.Context(), true)
	if errGetComments != nil {
		return errGetComments
	}

	handler.ResponseJson(writer, commentsReports, http.StatusOK)

	return nil
}
