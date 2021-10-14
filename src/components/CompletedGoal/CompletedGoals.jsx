import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CompletedGoalCard from './CompletedGoalCard';

// Material UI
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "50px",
    paddingRight: "10px"
  }
});


export default function CompletedGoals() {
    // Set hooks as variables
    const dispatch = useDispatch();
    const classes = useStyles();

    // Reducer information
    const goals = useSelector(store => store.completedGoal);
    console.log('HERE ARE MY COMPLETED GOALS##########', goals);

    // Fetch the completed goals and set them to a reducer
    React.useEffect(() => {
        dispatch({
            type: "FETCH_COMPLETED_GOALS"
        })
    }, []); //activeGoals?
    return (
        <div>
            <Grid container spacing={4} justify="center" className={classes.gridContainer}>
                {goals.map((goal, index) => (
                    <Grid item xs={12} md={10}>
                        <CompletedGoalCard goal={goal} index={index} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}