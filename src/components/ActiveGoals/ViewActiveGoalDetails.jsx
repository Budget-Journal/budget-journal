import { useSelector } from "react-redux";
import React from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";


export default function ViewActiveGoalDetails() {

    const goalDetails = useSelector(store => store.activeGoalDetails);
    const journal = useSelector(store => store.journalPosts);

    return(
        <Card>
            <CardContent>
                <p>{goalDetails.name}</p>
                <p>{goalDetails.price}</p>
                <p>{goalDetails.reasons}</p>
                <p>{goalDetails.notes}</p>
            </CardContent>
        </Card>
    )
} // end export default function