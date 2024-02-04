package benches

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	_ "benches/internal/domain"

	"benches/internal/apperror"
	"benches/internal/constants/roles"
	"benches/internal/dto"
	"benches/internal/policy/benches"
	"benches/internal/transport/httpv1"
	"benches/pkg/api/paginate"
	"benches/pkg/api/sort"
	"benches/pkg/auth"

	"github.com/gorilla/mux"
)

type Handler struct {
	httpv1.BaseHandler
	policy *benches.Policy
}

const (
	urlCreateBenchFromTelegram = "telegram"
	urlListModerationBenches   = "/moderation"
	urlDecisionBench           = "/moderation"
	urlCreateBench             = ""
	urlUpdateBench             = "/{id}"
	urlDeleteBench             = "/{id}"
	urlDetailBench             = "/{id}"
)

func NewHandler(benches *benches.Policy) *Handler {
	return &Handler{policy: benches}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	// Создание лавочки через telegram
	routerCreateBenches := router.NewRoute().Subrouter()
	routerCreateBenches.Use(authManager.JWTRoleMiddleware(roles.Bot))
	routerCreateBenches.HandleFunc(urlCreateBenchFromTelegram, apperror.Middleware(handler.addBenchViaTelegram)).Methods("POST")

	// Роутер для функционала модерации
	routerModeration := router.NewRoute().Subrouter()
	routerModeration.Use(authManager.JWTRoleMiddleware(roles.Admin))
	// Получение списка всех лавочек на модерации
	routerModeration.HandleFunc(urlListModerationBenches, paginate.Middleware(
		sort.Middleware(apperror.Middleware(handler.listModerationBench), "id", sort.ASC), 1, 10)).Methods("GET")
	// Одобрение или отказ лавочки
	routerModeration.HandleFunc(urlDecisionBench, apperror.Middleware(handler.decisionBench)).Methods("POST")
	// Создание лавочки
	routerModeration.HandleFunc(urlCreateBench, apperror.Middleware(handler.createBench)).Methods("POST")
	// Обновление лавочки
	routerModeration.HandleFunc(urlUpdateBench, apperror.Middleware(handler.updateBench)).Methods("PATCH")
	// Удаление лавочки
	routerModeration.HandleFunc(urlDeleteBench, apperror.Middleware(handler.deleteBench)).Methods("DELETE")
	// Получение детальной информации о лавочки
	routerModeration.HandleFunc(urlDetailBench, apperror.Middleware(handler.detailBench))
}

// @Summary Create bench via telegram
// @Tags Benches
// @Produce json
// @Param CreateBenchViaTelegram body dto.CreateBenchViaTelegram true "bench data"
// @Success 201
// @Failure 400
// @Router /api/v1/private/benches/telegram [post]
func (handler *Handler) addBenchViaTelegram(w http.ResponseWriter, r *http.Request) error {
	var bench dto.CreateBenchViaTelegram
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := bench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := handler.policy.CreateBenchViaTelegram(r.Context(), bench.UserTelegramID, bench.Images, bench.ToDomain())
	if err != nil {
		return err
	}
	w.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary Moderation list benches
// @Description Get list moderation benches
// @Tags Benches
// @Param Authorization header string true "Bearer"
// @Param sort_by query string false "sort field"
// @Param sort_order query string false "sort order"
// @Param page query int false "page"
// @Param per_page query int false "pre page"
// @Success 200 {object} []domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/private/benches/moderation [get]
func (handler *Handler) listModerationBench(writer http.ResponseWriter, request *http.Request) error {
	// Получаем параметры для сортировки
	var sortOptions *sort.Options
	if options, ok := request.Context().Value(sort.OptionsContextKey).(sort.Options); ok {
		sortOptions = &options
	}

	// Получаем параметры для пагинации
	var paginateOptions *paginate.Options
	if options, ok := request.Context().Value(paginate.OptionsContextKey).(paginate.Options); ok {
		paginateOptions = &options
	}

	all, err := handler.policy.GetListBenches(request.Context(), false, sortOptions, paginateOptions, nil)
	if err != nil {
		return err
	}

	handler.ResponseJson(writer, all, http.StatusOK)
	return nil
}

// @Summary Decision bench
// @Description Accept or reject a bench
// @Tags Benches
// @Param Decision body dto.DecisionBench true "decision bench data"
// @Param Authorization header string true "Bearer"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/private/benches/moderation [post]
func (handler *Handler) decisionBench(writer http.ResponseWriter, request *http.Request) error {
	var decisionBench dto.DecisionBench
	if err := json.NewDecoder(request.Body).Decode(&decisionBench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := decisionBench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := handler.policy.DecisionBench(request.Context(), decisionBench.ID, decisionBench.Decision, decisionBench.Message)
	if err != nil {
		return err
	}
	handler.ResponseJson(writer, map[string]string{"result": "okay"}, http.StatusAccepted)
	return nil
}

// @Summary Create bench
// @Tags Benches
// @Produce mpfd
// @Param Bench body dto.CreateBench true "bench data"
// @Param Authorization header string true "Bearer"
// @Success 201
// @Failure 400
// @Failure 418
// @Router /api/v1/private/benches [post]
func (handler *Handler) createBench(writer http.ResponseWriter, request *http.Request) error {
	errParseMultipartForm := request.ParseMultipartForm(0)
	if errParseMultipartForm != nil {
		return errParseMultipartForm
	}

	var lat, lng float64
	var errParseFloat error
	if lat, errParseFloat = strconv.ParseFloat(request.PostForm.Get("lat"), 64); errParseFloat != nil {
		return apperror.ErrDecodeData
	}

	if lng, errParseFloat = strconv.ParseFloat(request.PostForm.Get("lng"), 64); errParseFloat != nil {
		return apperror.ErrDecodeData
	}

	var images [][]byte
	for _, image := range request.MultipartForm.File["images"] {
		buffer := bytes.NewBuffer(nil)

		// Открываем файл
		openFile, errOpenFile := image.Open()
		if errOpenFile != nil {
			return apperror.ErrDecodeData
		}

		// Делаем список байт из файла
		if _, err := io.Copy(buffer, openFile); err != nil {
			return apperror.ErrDecodeData
		}

		// Закрываем файл
		errCloseFile := openFile.Close()
		if errCloseFile != nil {
			return errCloseFile
		}

		images = append(images, buffer.Bytes())
	}

	bench := dto.CreateBench{
		Lat:    lat,
		Lng:    lng,
		Images: images,
	}

	// Валидация
	if err := bench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	// Создаём лавочку
	_, errCreate := handler.policy.CreateBench(
		request.Context(),
		request.Context().Value("userID").(string),
		bench.Images,
		request.Form["tags"],
		bench.ToDomain(),
	)
	if errCreate != nil {
		return apperror.ErrFailedToCreate
	}

	writer.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary Update bench
// @Tags Benches
// @Produce mpfd
// @Param Bench body dto.UpdateBench true "bench data"
// @Param Authorization header string true "Bearer"
// @Param id path string true "Bench ID"
// @Success 201
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/private/benches/{id} [patch]
func (handler *Handler) updateBench(writer http.ResponseWriter, request *http.Request) error {
	errParseMultipartForm := request.ParseMultipartForm(0)
	if errParseMultipartForm != nil {
		return errParseMultipartForm
	}

	bench := dto.UpdateBench{}

	var errParseFloat error
	if value := request.PostForm.Get("lat"); value != "" {
		var lat float64
		if lat, errParseFloat = strconv.ParseFloat(value, 64); errParseFloat != nil {
			return apperror.ErrDecodeData
		}

		bench.Lat = lat
	}

	if value := request.PostForm.Get("lng"); value != "" {
		var lng float64
		if lng, errParseFloat = strconv.ParseFloat(request.PostForm.Get("lng"), 64); errParseFloat != nil {
			return apperror.ErrDecodeData
		}

		bench.Lng = lng
	}

	var images [][]byte
	for _, image := range request.MultipartForm.File["images"] {
		buffer := bytes.NewBuffer(nil)

		// Открываем файл
		openFile, errOpenFile := image.Open()
		if errOpenFile != nil {
			return apperror.ErrDecodeData
		}

		// Делаем список байт из файла
		if _, err := io.Copy(buffer, openFile); err != nil {
			return apperror.ErrDecodeData
		}

		// Закрываем файл
		errCloseFile := openFile.Close()
		if errCloseFile != nil {
			return errCloseFile
		}

		images = append(images, buffer.Bytes())
	}

	idBench := mux.Vars(request)["id"]

	errUpdate := handler.policy.UpdateBench(request.Context(), idBench, bench.Tags, bench.ToDomain(), images)
	if errUpdate != nil {
		return errUpdate
	}

	writer.WriteHeader(http.StatusOK)

	return nil
}

// @Summary Delete bench
// @Description Delete bench by ID
// @Tags Benches
// @Param Authorization header string true "Bearer"
// @Param id path string true "Bench ID"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/private/benches/{id} [delete]
func (handler *Handler) deleteBench(writer http.ResponseWriter, request *http.Request) error {
	idBench := mux.Vars(request)["id"]

	errDelete := handler.policy.DeleteBench(request.Context(), idBench)
	if errDelete != nil {
		return errDelete
	}

	writer.WriteHeader(http.StatusOK)

	return nil
}

// @Summary Detail bench
// @Description Get detail active bench
// @Tags Benches
// @Param id path string true "Bench ID"
// @Success 200 {object} domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/private/benches/{id} [get]
func (handler *Handler) detailBench(w http.ResponseWriter, r *http.Request) error {
	id := mux.Vars(r)["id"]
	bench, err := handler.policy.GetDetailBench(r.Context(), id, roles.Admin)
	if err != nil {
		return err
	}

	handler.ResponseJson(w, bench, http.StatusOK)
	return nil
}
