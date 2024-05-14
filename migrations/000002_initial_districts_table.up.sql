BEGIN;

CREATE TABLE districts
(
    id    SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

INSERT INTO districts (title)
VALUES ('Центральный округ'),
       ('Калининский район'),
       ('Дзержинский район'),
       ('Октябрьский район'),
       ('Первомайский район'),
       ('Советский район'),
       ('Кировский район'),
       ('Ленинский район');

COMMIT;
