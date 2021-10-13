import { useSelector } from "react-redux";
import React from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';


export default function ViewActiveGoalDetails() {

    const goalDetails = useSelector(store => store.activeGoalDetails);
    const journal = useSelector(store => store.journalPosts);

    return(
        <div>
            <Card>
                <CardContent>
                    <p>{goalDetails.name}</p>
                    <p>{goalDetails.price}</p>
                    <div dangerouslySetInnerHTML={{__html: goalDetails.reasons}}></div>                  
                    <p>{goalDetails.notes}</p>
                </CardContent>
            </Card>
            <div> 
                <JournalPosts journal={journal}/> 
            </div>
        </div>
    )
} // end export default function