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



router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('TESTING ******', req.body);
    const queryText = `
    UPDATE "user" 
    SET "total_budget" = $1
    WHERE "user".id=$2
    `;
    let queryParams= [
        req.body.total_budget, 
        req.user.id
    ];
    pool.query(queryText, queryParams).then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error in Put BUDGET AMT', error);
        res.sendStatus(500);
    })
  })
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