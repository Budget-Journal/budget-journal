import React, { useEffect } from "react";
import { Grid, CardContent, Card, CardActions, Typography, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import ViewActiveGoalDetails from "./ViewActiveGoalDetails";

export default function RenderedGoals({goal, index}) {

    // Set hooks to variables
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleViewGoal = (goal) => {
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

    return(
        <Card key={index}>
            <h2>{goal.name}</h2>
            <Button>Complete goal</Button>
            <Button onClick={() => { handleViewGoal(goal) }}>View</Button>
            <Button>Delete</Button>
        </Card>
    )
}

