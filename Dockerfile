# Build project
FROM golang:1.19.1-alpine as builder

WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/build/app ./cmd/initiator/main.go

# Run project
FROM alpine:latest

WORKDIR /opt/benches

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/build/app /bin/main

CMD /bin/main
