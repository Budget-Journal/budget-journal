import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import NoGoals from "./NoGoals";
import RenderedGoals from "./RenderedGoals";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Button, TextField } from "@mui/material";

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
  const lengthOfActiveGoals = activeGoals.length;
  const user = useSelector((store) => store.user);
  //console.log('user data*****', user.total_budget);
  const userTotalBudget = user.total_budget;
  console.log('user total budget*****', userTotalBudget)
  
  const userId = user.id;
  console.log('*****USERID', userId)

  const [addToBudget, setAddToBudget] = useState('');
  const [subtractFromBudget, setSubtractFromBudget] = useState(0);

  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }, []); //activeGoals?


  function handleAddToBudget(){
    console.log('ADD TO BUDGET WORKS', addToBudget);
    let sum = parseInt(userTotalBudget) + parseInt(addToBudget)
    dispatch({
      type: 'UPDATE_ADD_TO_USER_BUDGET',
      payload: { userId, sum }
    })
    history.go(0);
  }

  function handleSubtractFromBudget(){
    console.log('SUBTRACT FROM BUDGET');
  }

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
                
                <TextField
                  value={addToBudget}
                  onChange={(e) => setAddToBudget(e.target.value)}
                >

                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  
                  onClick={handleAddToBudget}
                >
                  Add to Budget
                </Button>
                <br />
                <TextField></TextField>
                <Button
                  variant="contained"
                  color="secondary"
                  value={subtractFromBudget}
                  onChange={setSubtractFromBudget}
                  onClick={handleSubtractFromBudget}
                >
                  Subtract from Budget
                </Button>
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
