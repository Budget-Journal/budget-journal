const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*
    Handles fetching a goal
    Handles posting of a new goal
    Handle editing goal
    Handles deleting a goal
    
*/

// Delete a goal, it's expenses, and journal posts
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        DELETE FROM "budget"
        WHERE "budget".goal_id = $1
    `;

    const sqlParams = [req.params.id]

    pool.query(sqlText, sqlParams).then(result => {
        const sqlText = `
            DELETE FROM "journal_post"
            WHERE "journal_post".goal_id = $1
        `;

        const sqlParams = [req.params.id]

        pool.query(sqlText, sqlParams).then(result => {
            const sqlText = `
                DELETE FROM "goal"
                WHERE "goal".id = $1
            `;
            
            const sqlParams = [req.params.id]

            pool.query(sqlText, sqlParams).then(result => {
                res.sendStatus(200);
            }).catch(error => {
                console.error('Failed to DELETE goal', error);
                res.sendStatus(500);
            })
        })
    })
});

// Fetch all goals that have not been completed
router.get('/active', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT * FROM "goal"
        WHERE "completed" = FALSE AND "user_id" = $1;
    `;

    const sqlParams = [
        req.user.id
    ]

    pool.query(sqlText, sqlParams).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('GET active goals Error', error)
        res.sendStatus(500)
    })
});

// Fetch all goals that have been completed
router.get('/completed', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT * FROM "goal"
        WHERE "completed" = TRUE AND "user_id" = $1;
    `;

    const sqlParams = [
        req.user.id
    ]

    pool.query(sqlText, sqlParams).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('GET budget Error', error)
        res.sendStatus(500)
    })
});

// Get last goal that was created
// I WILL USE THIS ROUTE *******************************************************
router.get('/last_goal', (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT "goal"."id"
        FROM "goal"
            ORDER BY "id" DESC
        LIMIT 1;
    `;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('GET budget Error', error)
        res.sendStatus(500)
    })
});

// Fetch goal details
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    // TO DO -- If statement to check if there is a budget or not
    // If there is now budget data for a goal, the below query will fail
    const sqlText = `
        SELECT 
            "budget"."id",
            "budget"."expense",
            "budget"."price",
            "budget"."notes",
            "goal"."name",
            "goal"."user_id"
        FROM "budget"
        JOIN "goal"
            ON "budget"."goal_id" = "goal"."id" 
        WHERE "goal"."id" = $1 AND "user_id" = $2;
    `;
    
    const sqlParams = [
        req.params.id, 
        req.user.id
    ];
    
        pool.query(sqlText, sqlParams).then(result => {
            console.log('result', result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('Details GET router has an error', error)
            res.sendStatus(500)
        });
});

// Creating a new goal and budget
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('***Create New Goal***');

    const sqlText = `
        INSERT INTO "goal" ("user_id")
        VALUES ($1)
        RETURNING "id"
    `;

    const sqlParams = [req.user.id];

    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(201);
        console.log('New Goal ID', result.rows[0].id);

        const sqlText = `
            INSERT INTO "budget" ("goal_id")
            VALUES ($1)
        `;

        const sqlParams = [result.rows[0].id];

        pool.query(sqlText, sqlParams).then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.error('Failed to create budget table', error);
            res.sendStatus(500);
        })

    }).catch(error => {
        console.error('Failed to create new goal', error);
        res.sendStatus(500);
    });
});




// router.post('/', rejectUnauthenticated, (req, res) => {
//     //console.log('Goal to POST:', req.body);
    
//     const sqlText = `
//         INSERT INTO "goal" ("user_id", "name", "reasons")
//         VALUES ($1, $2, $3)
//         RETURNING "id";
//     `;

//     const sqlParams = [
//         req.user.id,            // $1
//         req.body.name,          // $2
//         req.body.reasons,       // $3
//     ]

//     // First query makes the goal
//     pool.query(sqlText, sqlParams).then(result => {
//         //console.log('Post results', result.rows);
//         res.sendStatus(200);
//     }).catch(error => {
//         console.error("Creating Goal & Budget Failed", error);
//         res.sendStatus(500);
//     })
// });

// router.post('/budget', rejectUnauthenticated, (req, res) => {
//     //console.log('Data to add too budget', req.body);
//     //const goalId = result.rows[0].id;

//     const sqlText = `
//             INSERT INTO "budget" ("goal_id", "expense", "price", "notes")
//             VALUES ($1, $2, $3, $4)
//         `;

//     console.log(req.body.goalId.id);
//     const sqlParams = [
//         req.body.goalId.id,             // $1
//         req.body.expense,   // $2
//         req.body.price,     // $3
//         req.body.notes      // $4
//     ]
//         //console.log('*******', sqlParams);

//     // Second query creates the budget
//     pool.query(sqlText, sqlParams).then(result => {
//         res.sendStatus(201)
//     }).catch(error => {
//         console.error("Creating Budget Failed", error);
//         res.sendStatus(500);
//     })
// });

router.put('/total_goal_cost', rejectUnauthenticated, (req, res) => {
    console.log('Data to add to total goal cost', req.body);
    const goalId = req.body.goalId.id

    const sqlText = `
            UPDATE "goal"
            SET "total_goal_cost" = $1
            WHERE "goal".id = $2 AND "user_id" = $3
        `;

    console.log('goal id is:',goalId);
    const sqlParams = [
        req.body.totalGoalCost,
        goalId,
        req.user.id
    ]
    console.log('******* SqlParams is:', sqlParams);

    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(201)
    }).catch(error => {
        console.error("Creating Total Goal Cost Failed", error);
        res.sendStatus(500);
    })
});


module.exports = router;

