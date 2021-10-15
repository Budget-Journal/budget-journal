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

// Update the total budget based on user inputs
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('TESTING ******', req.body);
    const queryText = `
        UPDATE "user" 
        SET "total_budget" = $1
        WHERE "user".id=$2
    `;
    let queryParams = [
        req.body.total_budget,
        req.user.id
    ];
    pool.query(queryText, queryParams).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error in Put BUDGET AMT', error);
        res.sendStatus(500);
    })
})

// Fetch all expenses based on goal id
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT
            "budget"."id",
            "budget"."goal_id",
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

// Create a new expense based on id
router.post('/creating/new_expense/:id', rejectUnauthenticated, (req, res) => {
    console.log('Goal ID to add expense table too:', req.params.id);
})

// Update an existing expense based on id 
router.put('/:id', rejectUnauthenticated, (req, res) => {
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
    });
});

// Create a new expense row in the database
router.post('/editing/new_expense', rejectUnauthenticated, (req, res) => {
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

// Delete an expense based on id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        DELETE FROM "budget"
        WHERE "id" = $1
    `;
    
    const sqlParams = [
        req.params.id,
    ]
    
    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error deleting expense', error);
        res.sendStatus(500);
    })
});


module.exports = router;