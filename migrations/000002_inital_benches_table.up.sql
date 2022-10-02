BEGIN;

CREATE TABLE benches (
    id TEXT NOT NULL PRIMARY KEY,
    lat decimal,
    lng decimal,
    image TEXT,
    owner_id TEXT,
    CONSTRAINT fk_owner
    FOREIGN KEY(owner_id)
    REFERENCES users(id)
);

COMMIT;