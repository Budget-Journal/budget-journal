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
router.get('/last_goal', (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT
            "goal".id,
            "budget".id,
            "budget".goal_id,
            "budget".expense,
            "budget".price,
            "budget".notes
        FROM "goal"
        JOIN "budget"
            ON "goal".id = "budget"."goal_id"
        ORDER BY "goal"."id" DESC
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

// Creating a new goal, budget, and new expense?
router.post('/', rejectUnauthenticated, (req, res) => {

    const sqlText = `
        INSERT INTO "goal" ("user_id")
        VALUES ($1)
        RETURNING "id"
    `;

    const sqlParams = [req.user.id];

    // First query creates the goal
    pool.query(sqlText, sqlParams).then(result => {

        const sqlText = `
            INSERT INTO "budget" ("goal_id")
            VALUES ($1)
        `;

        const sqlParams = [result.rows[0].id];

        // Second query create a new expense
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

// Update an existing goal
router.put('/update_goal/:id', rejectUnauthenticated, (req, res) => {
    console.log('NEW UPDATES', req.body);
    const sqlText = `
        UPDATE "goal"
        SET "name" = $1, "reasons" = $2
        WHERE "id" = $3 AND "user_id" = $4
    `;

    const sqlParams = [
        req.body.name,
        req.body.reasons,
        req.params.id,
        req.user.id
    ]

    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Failed to update goal', error);
        res.sendStatus(500);
    })
})

// Set the total goal cost when the goal is first created
router.put('/total_goal_cost', rejectUnauthenticated, (req, res) => {

    const sqlText = `
            UPDATE "goal"
            SET "total_goal_cost" = $1
            WHERE "goal".id = $2 AND "user_id" = $3
        `;

    //console.log('goal id is:',goalId);
    const sqlParams = [
        req.body.totalGoalCostSum,
        req.body.goalId,
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

// Update the total goal cost once the goal is edited
router.put('/update_goal_cost', rejectUnauthenticated, (req, res) => {
    console.log('Data to add to total goal cost', req.body);
    const goalId = req.body.goalId

    const sqlText = `
            UPDATE "goal"
            SET "total_goal_cost" = $1
            WHERE "goal".id = $2 AND "user_id" = $3
        `;

    console.log('goal id is:', goalId);
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

// Handles edits to the goal name
router.put('/edit_goal_name/:id', rejectUnauthenticated,(req, res) => {
    
    const sqlText = `
        UPDATE "goal"
        SET "name" = $1
        WHERE "goal".id = $2 AND "user_id" = $3
    `;

    const sqlParams = [
      req.body.update.name,
      req.params.id,
      req.user.id, 
    ];

    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(200);
    }).catch (error => {
        console.error('Failed to update an exisiting goal', error);
        res.sendStatus(500);
    })
});

// Handle edits in the Quill editor
router.put('/edit_quill/:id', rejectUnauthenticated,(req, res) => {
    
    const sqlText = `
        UPDATE "goal"
        SET "reasons" = $1
        WHERE "goal".id = $2 AND "user_id" = $3
    `;

    const sqlParams = [
      req.body.update,
      req.params.id,
      req.user.id, 
    ];

    pool.query(sqlText, sqlParams).then(result => {
        res.sendStatus(200);
    }).catch (error => {
        console.error('Failed to update an exisiting goal', error);
        res.sendStatus(500);
    })
});


module.exports = router;

