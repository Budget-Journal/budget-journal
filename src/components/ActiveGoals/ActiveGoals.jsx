import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import NoGoals from "./NoGoals";
import RenderedGoals from "./RenderedGoals";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "50px",
    paddingRight: "10px"
  }
});

export default function ActiveGoals() {
  
  // Set hooks as variables
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Get activeGoals from the Redux store.
  const activeGoals = useSelector(store => store.activeGoals);
  const lengthOfActiveGoals = activeGoals.length

  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }, []); //activeGoals?

  return (
    <div>
      {lengthOfActiveGoals <= 0 ?
        <NoGoals />
        
      :
        <Grid container spacing={4} justify="center" className={classes.gridContainer}>
        <Card  
          className= "totalGoalCostCard" 
          sx={{width: '79%'}}
        >
            <div>
              <center>
                <h1>ADD/SUBTRACT FUNDS HERE</h1>
              </center>
            </div>
        </Card>
          {activeGoals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <RenderedGoals goal={goal} index={index} />
            </Grid>
          ))}
        </Grid>
      }
    </div>
  );
}
