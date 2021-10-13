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

router.get('/details/:id', rejectUnauthenticated, (req, res) => {

    const sqlText = `
        SELECT
            "budget"."id",
            "budget"."expense",
            "budget"."price",
            "budget"."notes"
        FROM "budget"
        JOIN "goal"
            ON "budget"."goal_id" = "goal"."id"
        WHERE "goal_id" = $1 AND "user_id" = $2
        ORDER BY "id" ASC; 
    `;

    const sqlParams = [
        req.params.id,
        req.user.id
    ]

    pool.query(sqlText, sqlParams).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.error('GET Error fetching budget details', error);
        res.sendStatus(500);
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('Expense to be changed', req.body);

    const sqlText = `
        UPDATE "budget"
        SET "expense" = $1, "price" = $2, "notes" = $3
        WHERE "id" = $4;
    `;

    const sqlParams = [
        req.body.update.expense,        // $1
        req.body.update.price,          // $2
        req.body.update.notes,          // $3
        req.body.update.id              // $4
    ]
    
    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error UPDATING expenses', error);
        res.sendStatus(500);
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('payload', req.body);

    const sqlText = `
        INSERT INTO "budget" ("goal_id", "expense", "price", "notes")
        VALUES ($1, $2, $3, $4)
    `;

    const sqlParams = [
        req.body.goal_id,
        req.body.update.expense,
        req.body.update.price,
        req.body.update.notes
    ]

    pool.query(sqlText, sqlParams).then(res => {
        res.sendStatus(201);
    }).catch(error => {
        console.error('Error creating new expense', error);
        res.send(500);
    })
});

router.post('/new_expense', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
    const sqlText = `
        INSERT INTO "budget" ("goal_id")
        VALUES ($1)
    `;
    const sqlParams = [
        req.body.id
    ]

    pool.query(sqlText, sqlParams).then(res => {
        res.sendStatus(201);
    }).catch(error => {
        console.error('Error creating new expense', error);
        res.sendStatus(500);
    })
});

module.exports = router;