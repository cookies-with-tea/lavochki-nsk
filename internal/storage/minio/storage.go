package minio

import (
	"bytes"
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
)

const (
	benchesContentTypeJpeg = "image/jpeg"
)

type Storage struct {
	client     *minio.Client
	bucketName string
	publicURL  string
}

func NewMinioStorage(client *minio.Client, bucketName string, publicURL string) *Storage {
	return &Storage{
		client:     client,
		bucketName: bucketName,
		publicURL:  publicURL,
	}
}

func (s *Storage) CreateImageFromBytes(ctx context.Context, imageName string, imageData []byte) error {
	reader := bytes.NewReader(imageData)
	_, err := s.client.PutObject(
		ctx, s.bucketName, imageName, reader, int64(len(imageData)), minio.PutObjectOptions{ContentType: benchesContentTypeJpeg},
	)
	if err != nil {
		return fmt.Errorf("upload image to minio: %v", err)
	}
	return nil
}

func (s *Storage) GetImageURL(imageID string) string {
	return fmt.Sprintf("%s/%s/%s", s.publicURL, s.bucketName, imageID)
}
