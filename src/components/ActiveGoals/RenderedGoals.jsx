import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//Material UI Imports
import Button  from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
            <Grid container>
                <Grid item xs={12}>
                    <Card  sx={{width: '100%'}}>
                        <CardHeader
                            avatar={
                            <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"/>                                
                            } 
                            title={goal.name}
                            subheader="<Render date here???>"
                        />
                        <CardActions disableSpacing>
                            <Button size="small" onClick={() => { handleCompleteGoal(goal) }}>Complete goal</Button>
                            <Button size="small" onClick={() => { handleViewGoalDetails(goal) }}>View</Button>                          
                            <Button size="small" onClick={() => { handleDeleteGoal(goal) }}>Delete</Button>                    
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>           
        </div>
    )
}

{/* <Card key={index}>
            <h2>{goal.name}</h2>
            <Button onClick={() => { handleCompleteGoal(goal) }}>Complete goal</Button>
            <Button onClick={() => { handleViewGoalDetails(goal) }}>View</Button>
            <Button onClick={() => { handleDeleteGoal(goal) }}>Delete</Button>
        </Card> */}