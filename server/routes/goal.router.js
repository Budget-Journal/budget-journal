const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
    Handles fetching a goal
    Handles posting of a new goal
    Handle editing goal
    Handles deleting a goal
    
*/

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    router.post('/', (req, res) => {
        // POST route code here
        let query = `INSERT INTO "goal" ("name", "reasons", "completed")
                     VALUE($1, $2, $3);`;
        pool.query(query, [req.body.name, req.body.reasons, req.body.completed])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log("POST budget has Error", error)
            res.sendStatus(500)
        })
    });
});

module.exports = router;