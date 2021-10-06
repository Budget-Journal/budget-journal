import React from 'react'
import { Card } from '@mui/material';
function GoalCardDetails({detail}) {





    return (
        <div>
            
            <Card>
            <p>{detail.name}</p>
            <p>{detail.price}</p>
            <p>{detail.reasons}</p>
            <p>{detail.notes}</p>
            </Card>
        </div>
    )
}

export default GoalCardDetails;
