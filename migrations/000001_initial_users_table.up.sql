BEGIN;

CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    telegram_id INT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
);

COMMIT;
