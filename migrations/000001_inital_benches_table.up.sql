BEGIN;

CREATE TABLE benches (
    id TEXT NOT NULL PRIMARY KEY,
    lat decimal,
    lng decimal,
    image TEXT
);

COMMIT;