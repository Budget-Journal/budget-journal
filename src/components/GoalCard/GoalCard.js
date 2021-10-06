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

function GoalCard() {
   const classes = useStyles();
   const fetchGoal = useSelector(store => store.goal)
   const dispatch = useDispatch();
   const history = useHistory();

   useEffect(() => {
       dispatch({
            type: 'FETCH_GOALS'       });
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
  
    return (
    <Grid item xs={6} sm={3}>
      <Grid container>
        {fetchGoal.map((fetchGoal) => (
          <Grid item xs>
            {/* {" "} */}
            &nbsp;
            <Card key={fetchGoal.id}>
              <CardContent className={classes.card}>
                <Typography>Goal: {fetchGoal.name} </Typography>
                {/* <Typography>{fetchGoal.reasons}</Typography>
                <Typography>{fetchGoal.expense}</Typography>
                <Typography>{fetchGoal.price}</Typography>
                <Typography>{fetchGoal.notes}</Typography> */}
              </CardContent>
              <CardActions>
                {/* {" "} */}
                &nbsp; &nbsp; &nbsp;
                <Button onClick={() => handleView(fetchGoal.id)}>View</Button>
                <Button
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

export default GoalCard;
