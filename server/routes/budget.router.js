const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
    Handle the creation of a new budget
    Handle editing an existing budget
*/

/**
 * GET route template
 */
// router.get('/', (req, res) => {
//     // GET route code here
//     const query = `SELECT * 
//     FROM "budget"
//     JOIN "goal"
//         ON "budget"."id" = "goal"."id" 
//     WHERE "budget" = $1;`;
//     pool.query(query)
//     .then(result => {
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('GET budget Error', error)
//         res.sendStatus(500)
//     })
// });

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