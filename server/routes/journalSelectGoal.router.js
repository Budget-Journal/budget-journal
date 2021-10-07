const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Obtains all the users goals that are currently active
router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM "goal"
        WHERE "user_id" = $1 AND "completed" = FALSE;
    `;
    const sqlParams = [
        req.user.id
    ]
    pool.query(sqlText, sqlParams).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.error("Failed to GET active goals");
        res.sendStatus(500)
    })
});



module.exports = router;