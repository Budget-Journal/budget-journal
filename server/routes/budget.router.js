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
router.get('/', (req, res) => {
    // GET route code here
    const query = `SELECT * 
    FROM "budget"
    JOIN "goal"
        ON "budget"."id" = ;`;

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;