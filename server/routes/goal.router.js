const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
    Handles fetching a goal
    Handles posting of a new goal
    Handle editing goal
    Handles deleting a goal
    
*/


router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;