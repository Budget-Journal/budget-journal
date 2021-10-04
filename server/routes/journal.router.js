const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
    Handles fetching a journal post
    Handles posting a journal post
*/

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});


router.post('/', (req, res) => {

    // if (req.body.goal === NULL){

    // } else {

    // }

    const sqlText = `
        INSERT INTO "journal_post" ("user_id", "post_text")
        VALUES = $1, $2
    `;

    const sqlParams = [
        req.user.id;
        req.body
    ];

    pool.query
});

module.exports = router;