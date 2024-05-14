package image

import "context"

type Repository interface {
	UploadImage(context.Context, string, []byte) error
	GetImageURL(string) string
}
