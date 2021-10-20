const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Obtains all journal posts related to the user logged in
// Displays all journal posts in the feed
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
        SELECT
            "journal_post"."post_text",
            "journal_post"."date_posted",
            "goal"."name"
        FROM "journal_post"
        JOIN "user" 
            ON "journal_post".user_id = "user".id
        LEFT JOIN "goal"
	        ON "journal_post".goal_id = "goal".id
        WHERE "user".id = $1
        ORDER BY "date_posted" DESC;
    `;
  const sqlParams = [
    req.user.id, // $1
  ];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log("Results", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Fetching all journal posts failed", error);
      res.sendStatus(500);
    });
});

// Used to select the journal posts related to a specific goal (based on id)
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `
        SELECT * FROM "journal_post"
        WHERE "goal_id" = $1;
    `;

  const sqlParams = [req.params.id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Failed fetching journal posts", error);
      res.sendStatus(500);
    });
});

// Responsible for adding new posts to the database
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.body", req.body);
  let sqlText;
  let sqlParams;

  // If req.body.goal is NULL (meaning the user didn't relate the journal post to a goal)
  if (req.body.goal === "NULL") {
    sqlText = `
            INSERT INTO "journal_post" ("user_id", "post_text")
            VALUES ($1, $2);
        `;
    sqlParams = [
      req.user.id, // $1
      req.body.entry, // $2
    ];
  } else {
    sqlText = `
            INSERT INTO "journal_post" ("user_id", "goal_id", "post_text")
            VALUES ($1, $2, $3);
        `;
    sqlParams = [
      req.user.id, // $1
      req.body.goal, // $2
      req.body.entry, // $3
    ];
  }

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error /POST new journal entry", error);
      res.sendStatus(500);
    });
});

module.exports = router;
