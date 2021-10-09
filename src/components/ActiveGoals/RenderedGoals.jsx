import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//Material UI Imports
import Button  from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

//End Material UI Imports

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
        history.go(0);
    }

    // Will delete a goal from the dom and database
    const handleDeleteGoal = (goal) => {
        console.log('Goal id', goal.id);
        goalId = {
            id: goal.id
        }
        dispatch({
            type: "DELETE_ACTIVE_GOAL",
            payload: goalId
        })
        history.go(0);
    }

    return(
                <div>
                    <Card  sx={{width: '100%'}}>
                        <CardHeader
                            avatar={
                            <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"/>                                
                            } 
                            title={goal.name}
                            subheader="<Render date here???>"
                        />
                        <CardActions>
                            <Button size="small" onClick={() => { handleCompleteGoal(goal) }}>Complete goal</Button>
                            <Button size="small" onClick={() => { handleViewGoalDetails(goal) }}>View</Button>                          
                            <Button color="error" size="small" onClick={() => { handleDeleteGoal(goal) }}>Delete</Button>                    
                        </CardActions>
                    </Card>
                </div>
    )
};