import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CompletedGoalCard from "./CompletedGoalCard";

// Material UI
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  gridContainer: {
    marginTop: "10px",
  },
});

export default function CompletedGoals() {
  // Set hooks as variables
  const dispatch = useDispatch();
  const classes = useStyles();

  // Reducer information
  const goals = useSelector((store) => store.completedGoal);
  console.log("HERE ARE MY COMPLETED GOALS##########", goals);

  // Fetch the completed goals and set them to a reducer
  React.useEffect(() => {
    dispatch({
      type: "FETCH_COMPLETED_GOALS",
    });
  }, []); //activeGoals?
  return (
    <div>
      <h2 align="center">Accomplished Goals</h2>
      <Divider />
      <Grid
        container
        spacing={4}
        justifyContent="center"
        className={classes.gridContainer}
      >
        {goals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={4}>
            <CompletedGoalCard goal={goal} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
