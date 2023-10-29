# Benches Backend

# Установка проекта

- скопировать репозиторий
    ```console
    $ git clone https://github.com/anime-team-pet-projects/lavochki-nsk.git -b backend/production benches-backend
    $ cd benches-backend
    ```
- установить `.env` файл
- запустить контейнер
    ```console
    $ docker-compose up --build -d
    ```

# Режим разработки
- Запустить watcher
  ```console
  $ go get -u github.com/radovskyb/watcher
  $ watcher -cmd="go run ./cmd/initiator/main.go" -ignore "./migrations,./docs,./.idea" -pipe=true
  ```
- Запустить linter'ы
  ```console
  $ golangci-lint run --config=./.golangci.yml
  ```
