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

   const completedGoals= useSelector(store => store.completedGoal);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPLETED_GOALS'
          });
   }, []);
  
   const handleView = (id) => {
    console.log('this goal id', id)
     dispatch({
       type: 'CARD_VIEW_DETAILS',
       payload: id
     })

     dispatch({
       type: "FETCH_COMPLETED_GOAL_POSTS",
       payload: id
     })

     history.push('/view')
   }

   const handleDelete =(id) => {
    dispatch({ 
     type: "DELETE_GOAL",
     payload: id,
   });
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
                <Button onClick={() => handleView(goal.id)}>View</Button>
                <Button onClick={() => handleDelete(goal.id)}
                  
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
