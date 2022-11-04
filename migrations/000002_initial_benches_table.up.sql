BEGIN;

CREATE TABLE tags (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT
);

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

CREATE TABLE tags_benches (
    bench_id TEXT REFERENCES benches (id) ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id TEXT REFERENCES tags (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tag_bench_pkey PRIMARY KEY (bench_id, tag_id)
);

COMMIT;