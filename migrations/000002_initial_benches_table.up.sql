BEGIN;

CREATE TABLE tags (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT
);

CREATE TABLE benches (
    id TEXT NOT NULL PRIMARY KEY,
    lat DECIMAL NOT NULL,
    lng DECIMAL NOT NULL,
    images TEXT[] NOT NULL,
    owner_id TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT fk_owner
    FOREIGN KEY(owner_id)
    REFERENCES users(id)
);

CREATE TABLE tags_benches (
    bench_id TEXT REFERENCES benches (id) ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id TEXT REFERENCES tags (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tag_bench_pkey PRIMARY KEY (bench_id, tag_id)
);

COMMIT;