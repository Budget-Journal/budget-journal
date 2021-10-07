import React, { useEffect } from "react";
import { Grid, CardContent, Card, CardActions, Typography, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import ViewActiveGoalDetails from "./ViewActiveGoalDetails";

export default function RenderedGoals({goal, index}) {

    // Set hooks to variables
    const dispatch = useDispatch();
    const history = useHistory();
    let goalId = {};
    
    // Will store the goal details in a reducer and fetch all the journal posts related to the goal
    // Dispatch data will be displayed in ViewActiveGoalDetails
    const handleViewGoalDetails = (goal) => {
        console.log('Goal id', goal);
        dispatch({
            type: "SET_ACTIVE_GOAL_DETAILS",
            payload: goal
        });

        dispatch({
            type: "FETCH_GOAL_JOURNAL_POSTS",
            payload: goal.id
        })

        history.push('/active_goal_details');
    }
    
    // Will change a goal from being uncompleted to completed
    const handleCompleteGoal = (goal) => {
        console.log('Goal id', goal.id);
        goalId = {
            id: goal.id
        }
        dispatch({
            type: "UPDATE_GOAL_COMPLETED",
            payload: goalId
        })
    }

    return(
        <Card key={index}>
            <h2>{goal.name}</h2>
            <Button onClick={() => { handleCompleteGoal(goal) }}>Complete goal</Button>
            <Button onClick={() => { handleViewGoalDetails(goal) }}>View</Button>
            <Button>Delete</Button>
        </Card>
    )
}

