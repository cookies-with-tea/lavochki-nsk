FROM golang:1.19.1

WORKDIR /opt/benches-bot

COPY . .

RUN go mod tidy
RUN go build -o /app/build/app ./cmd/initiator/main.go
CMD /app/build/app
