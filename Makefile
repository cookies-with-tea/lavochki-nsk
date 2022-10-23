APP_BIN = build/app

.PHONY: lint
lint:
	golangci-lint run

$(APP_BIN):
	go build -o $(APP_BIN) ./cmd/initiator/main.go

.PHONY: swagger
swagger:
	swag init --parseDependency --parseInternal --parseDepth 1 -g ./cmd/initiator/main.go -o ./docs



