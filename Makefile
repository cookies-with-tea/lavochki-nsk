APP_BIN = build/app
SWAGGER_BIN = /home/saveme/go/bin/swag

.PHONY: lint
lint:
	golangci-lint run

$(APP_BIN):
	go build -o $(APP_BIN) ./cmd/initiator/main.go

.PHONY: swagger
swagger:
	$(SWAGGER_BIN) init --parseDependency --parseInternal --parseDepth 1 -g ./app/cmd/main.go -o ./app/docs

docker-dev:
	docker-compose up -d --build db redis minio
