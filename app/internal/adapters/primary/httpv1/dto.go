package httpv1

type Paginate struct {
	Count       int `json:"count"`
	Pages       int `json:"pages"`
	CurrentPage int `json:"current_page"`
}

type Response struct {
	Messages []string `json:"messages"`
	Data     any      `json:"data"`
	Errors   any      `json:"errors"`
}

func NewResponse(data any, messages []string, errors any) *Response {
	return &Response{
		Messages: messages,
		Data:     data,
		Errors:   errors,
	}
}
