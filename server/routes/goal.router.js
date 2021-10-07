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
router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    const id= req.params.id;
    const queryText =`DELETE FROM "goal" WHERE "goal"."id" = $1 RETURNING *;`;
    pool.query(queryText, [id])
    .then((result) => {
      res.sendStatus(201)
    }).catch((error)=> {
      res.sendStatus(500);
    })
  
  });

router.get('/active', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT * FROM "goal"
        JOIN "budget" 
            ON "goal".id = "budget".goal_id
        WHERE "completed" = FALSE
    `;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('GET budget Error', error)
        res.sendStatus(500)
    })
});

router.get('/completed', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `
        SELECT * FROM "goal"
        JOIN "budget" 
            ON "goal".id = "budget".goal_id
        WHERE "completed" = TRUE
    `;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('GET budget Error', error)
        res.sendStatus(500)
    })
});

//GET Card Details
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id];
    console.log("Goal id", sqlParams)
    const sqlText = `
        SELECT 
            "budget"."id",
            "budget"."expense",
            "budget"."price",
            "budget"."notes",
            "goal"."name"
        FROM "budget"
        JOIN "goal"
            ON "budget"."goal_id" = "goal"."id" 
        WHERE "goal"."id" = $1;
        `;
    
        pool.query(sqlText, sqlParams).then(result => {
            console.log('result', result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('Details GET router has an error', error)
            res.sendStatus(500)
        });
});


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('Goal to POST:', req.body);
    
    const sqlText = `
        INSERT INTO "goal" ("user_id", "name", "reasons")
        VALUES ($1, $2, $3)
        RETURNING "id";
    `;

    const sqlParams = [
        req.user.id,            // $1
        req.body.name,          // $2
        req.body.reasons,       // $3
    ]

    // First query makes the goal
    pool.query(sqlText, sqlParams).then(result => {
        console.log('Post results', result.rows);
        
        const goalId = result.rows[0].id;

        const sqlText = `
            INSERT INTO "budget" ("goal_id", "expense", "price", "notes")
            VALUES ($1, $2, $3, $4)
        `;

        const sqlParams = [
            goalId,             // $1
            req.body.expense,   // $2
            req.body.price,     // $3
            req.body.notes      // $4
        ]
        console.log('*******', sqlParams);

        // Second query creates the budget
        pool.query(sqlText, sqlParams).then(result => {
            res.sendStatus(201)
        })
    }).catch(error => {
        console.error("Creating Goal & Budget Failed", error);
        res.sendStatus(500);
    })
});

module.exports = router;