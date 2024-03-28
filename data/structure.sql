BEGIN;

-- Comme c'est un script de création de tables ont s'assure que celles-ci
-- Soit supprimées avant de les créées.
-- On peut supprimer plusieurs tables en même temps

DROP TABLE IF EXISTS "user",
"question",
"quiz",
"answer",
"tag",
"level",
"play_quiz";


set client_encoding to 'utf-8';
-- -----------------------------------------------------
-- Table "level"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "level" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"name"	TEXT	NOT NULL UNIQUE,
"color" TEXT NOT NULL ,
"created_at"	TIMESTAMPTZ	NOT NULL DEFAULT now(),
"updated_at"	TIMESTAMPTZ

);

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"first_name"	TEXT	NOT NULL,
"last_name"	TEXT	NOT NULL,
"email"	TEXT	NOT NULL UNIQUE,
"password"	TEXT	NOT NULL,
"score"	INTEGER	NOT NULL DEFAULT 0,
"quiz_done"	INTEGER	DEFAULT 0,
"created_at"	TIMESTAMPTZ	NOT NULL DEFAULT now(),
"updated_at"	TIMESTAMPTZ

);

-- -----------------------------------------------------  
-- Table "tag"
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS "tag" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"name"	TEXT	NOT NULL UNIQUE,
"picture" TEXT UNIQUE,
"created_at"	TIMESTAMPTZ	NOT NULL DEFAULT now(),
"updated_at"	TIMESTAMPTZ

);


-- -----------------------------------------------------
-- Table "quiz"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "quiz" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"title"	TEXT	NOT NULL,
"picture" TEXT,
"level_id"	INTEGER	NOT NULL REFERENCES "level"("id"),
"tag_id"	INTEGER	NOT NULL REFERENCES "tag"("id"),
"user_id"	INTEGER	REFERENCES "user"("id"),
"created_at"	TIMESTAMPTZ	NOT NULL DEFAULT now(),
"updated_at"	TIMESTAMPTZ

);

-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "question" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"description"	TEXT	NOT NULL UNIQUE,
"point"	INTEGER	NOT NULL DEFAULT 1,
"quiz_id"	INTEGER REFERENCES "quiz"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
  
  );

-- -----------------------------------------------------
-- Table "answer"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "answer" (

"id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
"description"	TEXT	NOT NULL,
"is_valid" BOOLEAN	NOT NULL DEFAULT FALSE,
"question_id"	INTEGER	NOT NULL REFERENCES "question"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTz

); 

-- -----------------------------------------------------
-- Table "play_quiz"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "play_quiz" (

"user_id"	INTEGER	NOT NULL REFERENCES "user"("id"),
"quiz_id"	INTEGER	NOT NULL REFERENCES "quiz"("id") ,
"point"	INTEGER	NOT NULL DEFAULT 0,
"date"	TIMESTAMPTZ	NOT NULL DEFAULT now(),
"updated_at"	TIMESTAMPTZ

);

COMMIT;







