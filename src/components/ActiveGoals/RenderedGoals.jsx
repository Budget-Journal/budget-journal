import React, { useEffect } from "react";
import { Grid, CardContent, Card, CardActions, Typography, Button } from "@mui/material";

export default function RenderedGoals({goals}) {
    return(
        <Card>
            <h2>{goals.name}</h2>
            <Button>View</Button>
            <Button>Complete goal</Button>
            <Button>Delete</Button>
        </Card>
    )
}

