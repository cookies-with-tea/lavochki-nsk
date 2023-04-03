package httpv1

import (
	"encoding/json"
	"net/http"
)

type BaseHandler struct {
}

func (b *BaseHandler) ResponseErrorJson(w http.ResponseWriter, error string, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	if error != "" {
		w.Write([]byte(`{"error":"` + error + `"}`)) //nolint:errcheck
	}
	return
}

func (b *BaseHandler) ResponseJson(w http.ResponseWriter, body interface{}, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(code)
	if body != nil {
		jsonBody, err := json.Marshal(body)
		if err != nil {
			b.ResponseErrorJson(w, "", http.StatusInternalServerError)
			return
		}
		w.Write(jsonBody) //nolint:errcheck
	}
	return
}
