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
    "total_budget" DECIMAL(38,2)
);

CREATE TABLE "goal" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"name" VARCHAR(1000),
	"reasons" TEXT,
	"total_goal_cost" DECIMAL(38,2),
	"completed" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "budget" (
	"id" SERIAL PRIMARY KEY,
	"goal_id" INT REFERENCES "goal" NOT NULL,
	"expense" VARCHAR (1000),
	"price" DECIMAL(38,2),
	"notes" VARCHAR (1000)
);

CREATE TABLE "journal_post" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"goal_id" INT REFERENCES "goal" DEFAULT NULL,
	"post_text" VARCHAR(1000),
	"date_posted" TIMESTAMP DEFAULT NOW() NOT NULL
);
