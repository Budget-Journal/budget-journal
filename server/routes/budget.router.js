const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/*
    Handle the creation of a new budget
    Handle editing an existing budget
*/

/**
 * GET route template
 */

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    console.log('/budget/details Goal id', req.params.id);

    const sqlText = `
        SELECT
            "budget"."expense",
            "budget"."price",
            "budget"."notes"
        FROM "budget"
        JOIN "goal"
            ON "budget"."goal_id" = "goal"."id"
        WHERE "goal_id" = $1 AND "user_id" = $2; 
    `;

    const sqlParams = [
        req.params.id,
        req.user.id
    ]

    pool.query(sqlText, sqlParams).then(result => {
        console.log('Budget details', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.error('GET Error fetching budget details', error);
        res.sendStatus(500);
    })
})


/**
 * POST route template
 */
// router.post('/', (req, res) => {
//     // POST route code here
//     let query = `INSERT INTO "budget" ("expense", "price", "notes")
//                  VALUE($1, $2, $3)`;
//     pool.query(query, [])
// });

module.exports = router;