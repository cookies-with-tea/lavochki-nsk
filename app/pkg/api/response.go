package api

type Response struct {
	Messages []string `json:"messages"`
	Data     any      `json:"data"`
	Errors   any      `json:"errors"`
}
