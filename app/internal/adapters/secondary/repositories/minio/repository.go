package minio

import (
	"bytes"
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
)

const (
	contentTypeImage = "image/jpeg"
)

type Repository struct {
	client     *minio.Client
	bucketName string
	publicURL  string
}

func NewRepository(client *minio.Client, bucketName string, publicURL string) *Repository {
	return &Repository{
		client:     client,
		bucketName: bucketName,
		publicURL:  publicURL,
	}
}

func (repository *Repository) UploadImage(ctx context.Context, name string, image []byte) error {
	reader := bytes.NewReader(image)

	_, err := repository.client.PutObject(
		ctx,
		repository.bucketName,
		name,
		reader,
		int64(len(image)),
		minio.PutObjectOptions{
			ContentType: contentTypeImage,
		},
	)

	if err != nil {
		return err
	}

	return nil
}

func (repository *Repository) GetImageURL(imageID string) string {
	return fmt.Sprintf("%s/%s/%s", repository.publicURL, repository.bucketName, imageID)
}
