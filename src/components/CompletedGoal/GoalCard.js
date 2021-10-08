import React from "react";
import { Grid, CardContent, Card, CardActions, Typography, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    // card: {
    //   padding: theme.spacing(2),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // },
  }));

export default function GoalCard() {
  // Set hooks as variables
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   let goalId;

   const completedGoals= useSelector(store => store.completedGoal);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPLETED_GOALS'
          });
   }, []);


    // Will store the goal details in a reducer and fetch all the journal posts related to the goal 
    // Dispatch data will be displayed in ViewActiveGoalDetails
  const handleView = (goal) => {
    console.log('this goal id', goal.id);
    dispatch({
      type: 'CARD_VIEW_DETAILS',
      payload: goal.id
    })

    dispatch({
      type: "FETCH_GOAL_JOURNAL_POSTS",
      payload: goal.id
    })

    history.push('/view')
  }

   // Handles when a user deletes a completed goal
   const handleDelete =(goal) => {
    console.log("Goal id", goal.id)
    goalId = {
      id: goal.id
    }
    dispatch({ 
     type: "DELETE_COMPLETED_GOAL",
     payload: goalId,
    });
    history.go(0);
   };
  
    return (
    <Grid item xs={6} sm={3}>
      <Grid container>
        {completedGoals.map((goal) => (
          <Grid item xs>
            {/* {" "} */}
            &nbsp;
            <Card key={goal.id}>
              <CardContent className={classes.card}>
                <Typography>Goal: {goal.name} </Typography>

              </CardContent>
              <CardActions>
                {/* {" "} */}
                &nbsp; &nbsp; &nbsp;
                <Button onClick={() => handleView(goal)}>View</Button>
                <Button onClick={() => handleDelete(goal)}
                  
                  color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
