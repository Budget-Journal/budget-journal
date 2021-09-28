-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- DB name: budget_journal
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "total_budget" DECIMAL(5,2)
);

CREATE TABLE "goals" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"journal" VARCHAR (65000),
	"key_motivation" VARCHAR (1000),
	"next_step" VARCHAR (1000),
	"deadline" DATE,
	"reward" VARCHAR (1000),
	"reflection_text" VARCHAR (1000),
	"reflection_img" VARCHAR (1000)
);

CREATE TABLE "budget" (
	"id" SERIAL PRIMARY KEY,
	"goals_id" INT REFERENCES "goals" NOT NULL,
	"expense" VARCHAR (1000),
	"price" DECIMAL(5,2),
	"notes" VARCHAR (1000)
);