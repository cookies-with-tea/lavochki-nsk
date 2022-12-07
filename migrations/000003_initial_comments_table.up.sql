BEGIN;

CREATE TABLE comments (
    id TEXT NOT NULL PRIMARY KEY,
    bench_id TEXT NOT NULL,
    parent_id TEXT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES comments(id),
    FOREIGN KEY (bench_id) REFERENCES benches(id)
);

COMMIT;
