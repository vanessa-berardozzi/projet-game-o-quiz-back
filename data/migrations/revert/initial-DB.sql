-- Revert quizotron:initial-DB from pg

BEGIN;
DROP TABLE IF EXISTS "user",
"question",
"quiz",
"answer",
"tag",
"level",
"play_quiz";


COMMIT;
