import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import NoGoals from "./NoGoals";
import RenderedGoals from "./RenderedGoals";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Button, TextField } from "@mui/material";
import './ActiveGoals.css'

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "50px",
    paddingRight: "10px",
    marginTop: 15,
  },
  subtractBudgetBtn: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  addBudgetBtn: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },
  totalGoalCostCard: {
    marginTop: 5,
    marginLeft: 30,
    paddingTop: 5,
    paddingBottom: 15
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

  // Set variable to user redux store data
  const userTotalBudget = user.total_budget;
  const userId = user.id;

  // State for adding to budget and subtracting from budget
  const [addToBudget, setAddToBudget] = useState('');
  const [subtractFromBudget, setSubtractFromBudget] = useState('');

  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }, []);

  // Function to funds to the budget when ADD TO BUDGET is clicked
  function handleAddToBudget(){
    // Sum of the users budget and the budget they enter in
    let sum = parseInt(userTotalBudget) + parseInt(addToBudget)
    // Dispatch the the user saga
    dispatch({
      type: 'UPDATE_ADD_TO_USER_BUDGET',
      payload: { userId, sum }
    })
    // Refresh the page when the ADD TO BUDGET button is clicked
    history.go(0);
  }

  // Function to funds to the budget when SUBTRACT FROM BUDGET is clicked
  function handleSubtractFromBudget(){
    // Difference of the users budget and the budget the enter in
    let difference = parseInt(userTotalBudget) - parseInt(subtractFromBudget);
    // Dispatch to the user saga
    dispatch({
      type: 'UPDATE_SUBTRACT_TO_USER_BUDGET',
      payload: { userId, difference }
    })
    // Refresh the page when the SUBTRACT FROM BUDGET button is clicked
    history.go(0);
  }

  return (
    <div>
      {lengthOfActiveGoals <= 0 ?
        <NoGoals />
        
      :
      
        <Grid container spacing={4} justify="center" className={classes.gridContainer}>
        <Card
            className={classes.totalGoalCostCard}
            sx={{ width: '100%' }}
          >
            <div>
              <center>
                <TextField
                  size="small"
                  className={classes.addInput}
                  value={addToBudget}
                  onChange={(e) => setAddToBudget(e.target.value)}
                >
                </TextField>
                <Button
                  size="small"
                  className={classes.addBudgetBtn}
                  variant="contained"
                  color="primary"
                  onClick={handleAddToBudget}
                >
                  Add to Budget
                </Button>

                <TextField
                  size="small"
                  value={subtractFromBudget}
                  onChange={(e) => setSubtractFromBudget(e.target.value)}
                ></TextField>
                <Button
                  size="small"
                  className={classes.subtractBudgetBtn}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubtractFromBudget}
                >
                  Subtract from Budget
                </Button>
              </center>
            </div>
          </Card>
        {/* <Card  
          className= "totalGoalCostCard" 
          sx={{width: '100%'}}
        >
            <div>
              <center>
                <TextField
                  className={classes.addInput}
                  value={addToBudget}
                  onChange={(e) => setAddToBudget(e.target.value)}
                >
                </TextField>
                <Button
                  className={classes.addBudgetBtn}
                  variant="contained"
                  color="primary"
                  onClick={handleAddToBudget}
                >
                  Add to Budget
                </Button>
                
                <TextField
                  value={subtractFromBudget}
                  onChange={(e) => setSubtractFromBudget(e.target.value)}
                ></TextField>
                <Button
                  className={classes.subtractBudgetBtn}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubtractFromBudget}
                >
                  Subtract from Budget
                </Button>
              </center>
            </div>
        </Card> */}
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
