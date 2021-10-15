import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Button, TextField } from "@mui/material";


// const useStyles = makeStyles({
//     gridContainer: {
//         paddingLeft: "50px",
//         paddingRight: "10px",
//         marginTop: 15,
//     },
//     subtractBudgetBtn: {
//         margin: 5,
//         paddingTop: 12,
//         paddingBottom: 8
//     },
//     addBudgetBtn: {
//         margin: 5,
//         paddingTop: 12,
//         paddingBottom: 8,
//         paddingRight: 88,
//     },
//     totalGoalCostCard: {
//         marginTop: 65,
//         marginLeft: 30,
//         paddingTop: 15,
//         paddingBottom: 15
//     }
// });


export default function ProfilePage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    const activeGoals = useSelector(store => store.activeGoals);
    console.log('***', activeGoals )

    useEffect(() => {
        dispatch({
            type: "FETCH_ACTIVE_GOALS"
        })
    }, []);

    // State for adding to budget and subtracting from budget
    const [addToBudget, setAddToBudget] = useState('');
    const [subtractFromBudget, setSubtractFromBudget] = useState('');

    const [editBudgetButtonClick, setEditBudgetButtonClick] = useState(true);

    //const classes = useStyles();

    // Set variable to user redux store data
    const userTotalBudget = user.total_budget;
    const userId = user.id;

    //Array for holding the cost of each goal
    let totalGoalCost = [];

    //Push each goal cost into array
    for (let i = 0; i < activeGoals.length; i++) {
        totalGoalCost.push(parseInt(activeGoals[i].total_goal_cost));
        console.log(totalGoalCost);
    }
    //Set the totalGoalCost sum to 0
    let totalGoalCostSum = 0;

    // Sum the totalGoalCost into the totalGoalCostSum
    for (let i = 0; i < activeGoals.length; i++) {
        totalGoalCostSum = totalGoalCostSum + totalGoalCost[i];
        totalGoalCostSum.toFixed(2)
    }

    function handleAddToBudget() {
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
    function handleSubtractFromBudget() {
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

    const toggleUpdateBudget = () => {
        setEditBudgetButtonClick(!editBudgetButtonClick)
    }
    const updateBudget = () => {
        if (editBudgetButtonClick) {
            return;
        } else {
            return (
                <div>
                    <TextField
                        // className={classes.addInput}
                        value={addToBudget}
                        onChange={(e) => setAddToBudget(e.target.value)}
                    >
                    </TextField>
                    <Button
                        // className={classes.addBudgetBtn}
                        variant="contained"
                        color="primary"
                        onClick={handleAddToBudget}
                    >
                        Add Funds
                    </Button>

                    <TextField
                        value={subtractFromBudget}
                        onChange={(e) => setSubtractFromBudget(e.target.value)}
                    ></TextField>
                    <Button
                        // className={classes.subtractBudgetBtn}
                        variant="contained"
                        color="secondary"
                        onClick={handleSubtractFromBudget}
                    >
                        Subtract Funds
                    </Button>
                </div>
            )
        }
    }


    // Subtract the totalGoalCost amount from the user budget total 
    const remainingBalance = user.total_budget - totalGoalCostSum;

    return (
        <div>
            <h1>Profile</h1>
            <h1>Total Budget: $ {user.total_budget}</h1>
            <Button onClick={toggleUpdateBudget}>Update Budget</Button>
            {updateBudget()}
            
            <h2>Total Goal Cost: {totalGoalCostSum.toFixed(2)}</h2>
            <h2>Balance: {remainingBalance.toFixed(2)}</h2>


                <div>
                    <center>
                        {/* <TextField
                            // className={classes.addInput}
                            value={addToBudget}
                            onChange={(e) => setAddToBudget(e.target.value)}
                        >
                        </TextField>
                        <Button
                            // className={classes.addBudgetBtn}
                            variant="contained"
                            color="primary"
                            onClick={handleAddToBudget}
                        >
                            Add Funds
                        </Button>

                        <TextField
                            value={subtractFromBudget}
                            onChange={(e) => setSubtractFromBudget(e.target.value)}
                        ></TextField>
                        <Button
                            // className={classes.subtractBudgetBtn}
                            variant="contained"
                            color="secondary"
                            onClick={handleSubtractFromBudget}
                        >
                            Subtract Funds
                        </Button> */}
                    </center>
                </div>
            
        </div>
    )
} 