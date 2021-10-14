import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
// import "./ActiveGoals.css";
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
  console.log('*******************', activeGoals);

  let totalGoalCost = [];
  for (let i = 0; i < activeGoals.length; i++){
    totalGoalCost.push(parseInt(activeGoals[i].total_goal_cost));
    console.log(totalGoalCost);
  }
  let totalGoalCostSum = 0;
  for (let i = 0; i < activeGoals.length; i++){
    totalGoalCostSum = totalGoalCostSum + totalGoalCost[i];
    totalGoalCostSum.toFixed(2)
  }
  console.log('*****totalGoalCostSum', totalGoalCostSum.toFixed(2))
  



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
                <h1>Total Goal Cost: {totalGoalCostSum.toFixed(2)}</h1>
              </center>
            </div>
        </Card>
          {activeGoals.map((goal, index) => (
            <Grid item xs={12} md={10}>
              <RenderedGoals goal={goal} index={index} />
            </Grid>
          ))}
        </Grid>
      }
    </div>
  );
}
