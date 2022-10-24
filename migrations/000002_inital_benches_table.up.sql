BEGIN;

CREATE TABLE benches (
    id TEXT NOT NULL PRIMARY KEY,
    lat decimal,
    lng decimal,
    images TEXT[],
    owner_id TEXT,
    is_active BOOLEAN DEFAULT false,
    CONSTRAINT fk_owner
    FOREIGN KEY(owner_id)
    REFERENCES users(id)
);

COMMIT;