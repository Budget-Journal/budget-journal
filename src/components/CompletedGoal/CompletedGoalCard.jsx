import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

//Material UI Imports
import Button  from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//End Material UI Imports

export default function CompletedGoalCard ({goal, index}) {
    // Set hooks to variables
    const dispatch = useDispatch();
    const history = useHistory();

    // Will store the goal details in a reducer and fetch all the journal posts related to the goal
    
    const handleViewGoalDetails = (goal) => {
        console.log('Goal id', goal.id);

        // Store goal information in a reducer
        dispatch({
            type: "SET_ACTIVE_GOAL_DETAILS",
            payload: goal
        });

        // Fetch expenses related to the goal
        dispatch({
            type: "FETCH_ACTIVE_BUDGET_DETAILS",
            payload: goal.id
        })

        // Fetch the journal posts related to the goal
        dispatch({
            type: "FETCH_GOAL_JOURNAL_POSTS",
            payload: goal.id
        })

        // Go to view page
        history.push('/view');
    }
    

    // Will delete a goal from the dom and database
    const handleDeleteGoal = (goal) => {
        console.log('Goal id', goal.id);

        dispatch({
            // type: "DELETE_ACTIVE_GOAL",        NEED TO CHANGE TO COMPLETE GOAL
            payload: goal.id
        })
        history.go(0);
    }

    return (
        <div>
            <div>
                <Card sx={{ width: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg" />
                        }
                        title={goal.name}
                        subheader={goal.total_goal_cost}
                    />
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => { handleViewGoalDetails(goal) }}>
                            View
                        </Button>

                        <Button
                            color="error"
                            size="small"
                            onClick={() => { handleDeleteGoal(goal) }}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}