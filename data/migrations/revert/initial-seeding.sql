-- Revert quizotron:initial-seeding from pg

BEGIN;

TRUNCATE "level" CASCADE;
TRUNCATE "tag" CASCADE;
TRUNCATE "quiz" CASCADE;
TRUNCATE "question" CASCADE;
TRUNCATE "answer" CASCADE;

COMMIT;
