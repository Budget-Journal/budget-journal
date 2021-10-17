import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Button, TextField } from "@mui/material";
import { Paper, TableBody, TableCell, TableSortLabel, TableRow, TableHead, Table} from '@material-ui/core';

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

    // Toggle update total button
    const [editBudgetButtonClick, setEditBudgetButtonClick] = useState(true);

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
                <br />
                    
                    <TextField
                        // className={classes.addInput}
                        value={addToBudget}
                        onChange={(e) => setAddToBudget(e.target.value)}
                        fullWidth
                    >
                    </TextField>

                    <center>
                        <Button
                            // className={classes.addBudgetBtn}
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            onClick={handleAddToBudget}
                            size="small"
                        >
                            Add Funds
                        </Button>
                    </center>
                </div>
            )
        }
    }


    // Subtract the totalGoalCost amount from the user budget total 
    const remainingBalance = user.total_budget - totalGoalCostSum;

    // Style Table and buttons
    const useStyles = makeStyles(theme => ({
        table: {
            marginTop: 10,
            width: 60,
            marginTop: 80,
            '& tr': {
                fontWeight: '600',
                color: '1F4364',
                backgroundColor: '#71aac9',
            },
            '& td': {
                fontWeight: '500',
            },
            '& tr:hover': {
                backgroundColor: 'grey',
                cursor: 'pointer'
            },
        },
        btn: {
            backgroundColor: '#71aac9',
            color: 'white',
            '&:hover': {
                backgroundColor: 'grey'
            }
        }
    }))
    const classes = useStyles();

    return (
        <div>
            <center>
                <Table className={classes.table} style={{ width: 700 }}>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>{user.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Budget:</TableCell>
                        <TableCell>$ {user.total_budget}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Goal Cost:</TableCell>
                        <TableCell>{totalGoalCostSum.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Balance: </TableCell>
                        <TableCell>{remainingBalance.toFixed(2)}</TableCell>
                    </TableRow>
                <Button className={classes.btn} onClick={toggleUpdateBudget} align="right" color="error"
                    size="small" >Update Total Budget</Button>
                <br />
                {updateBudget()}
                </Table>
                <br />
            </center>
        </div>
    )
} 