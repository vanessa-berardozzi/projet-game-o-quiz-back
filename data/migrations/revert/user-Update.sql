-- Revert quizotron:user-Update from pg

BEGIN;

DROP TABLE IF EXISTS "role" CASCADE;

ALTER TABLE "user"
DROP COLUMN "role_id",
DROP COLUMN "pseudo";



COMMIT;
