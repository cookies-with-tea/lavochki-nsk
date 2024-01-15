BEGIN;

CREATE TABLE comments_reports (
    id TEXT NOT NULL PRIMARY KEY,
    cause TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

COMMIT;
