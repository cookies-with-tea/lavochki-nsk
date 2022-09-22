BEGIN;

CREATE TABLE benches (
    id TEXT NOT NULL PRIMARY KEY,
    position_x decimal,
    position_y decimal
);

COMMIT;