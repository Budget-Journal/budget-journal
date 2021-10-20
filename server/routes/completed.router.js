const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/*
    Handles when a goal is completed
*/

// Handles changing a goal from incomplete to complete
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `
        UPDATE "goal"
        SET "completed" = TRUE
        WHERE "goal".id = $1 AND "user_id" = $2;
    `;
  let sqlParams = [req.params.id, req.user.id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error UPDATING goal", error);
      res.sendStatus(500);
    });
});

module.exports = router;
