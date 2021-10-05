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
    const query = `SELECT * FROM "goal"
    `;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('GET budget Error', error)
        res.sendStatus(500)
    })
});
    //GET Card Details
    router.get('/details/:id', (req, res) => {
        const clubId = [req.params.id];
        const query = `SELECT 
        "budget"."id" as "budgetid",
        "budget"."expense" as "expense"
        "budget"."price" as "price"
        "budget".notes" as "notes"
        FROM "budget"
        JOIN "goal"
        ON "budget"."goal_id" = "goal"."id" 
        WHERE "budget"."id" = $1;
        GROUP BY "expense", "price", "notes", "budgetid";`;
      
          pool.query(query, clubId)
          .then(result => {
            console.log('result', result)
            res.send(result.rows)
          }).catch(error => {
            console.log('Details GET error', error)
            res.sendStatus(500)
          });
      });
/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('WHATS GOING ON HERE!?', req.body);
    // POST route code here
        let query = `INSERT INTO "goal" ("user_id", "name", "reasons", "completed")
                     VALUES($1, $2, $3, $4)
                     RETURNING "id";`;
        pool.query(query, [req.user.id, req.body.name, req.body.reasons, req.body.completed])
        .then(result => {
            console.log('Post results', result.data);
            // res.sendStatus(201);
            const goalId = result.rows[0].id;

            let insertBudgetquery = ` INSERT INTO "budget" ("goal_id", "expense", "price", "notes")
                                    VALUES($1, $2, $3, $4)`;
            pool.query(insertBudgetquery, [goalId, req.body.expense, req.body.price, req.body.notes])
            .then(result => {
                //Should sent back created successful if both query are posted
                res.sendStatus(201)
            }).catch(error => {
                console.log('insertBudgetquery post Error', error)
            });
            //First post query Error
        }).catch(error => {
            console.log("GOAL post has Error", error)
            res.sendStatus(500)
        })
    });

module.exports = router;