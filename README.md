# Benches Backend

# Установка проекта

- скопировать репозиторий
    ```console
    $ git clone https://github.com/anime-team-pet-projects/lavochki-nsk.git -b backend/production benches-backend
    $ cd benches-backend
    ```
- установить `.env` файл
- создать данные для бота в telegram
  ```console
  $ go run ./cmd/bot/main.go -username username_bot -tg_id telegram_id
  ```
- запустить контейнер
    ```console
    $ docker-compose up --build -d
    ```
