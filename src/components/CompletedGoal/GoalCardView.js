import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Grid, styled, Paper } from '@mui/material';
import CompletedGoalsJournal from '../CompletedGoalsJournalPosts/CompletedGoalsJournalPosts';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function GoalCardView() {

    // Setting reducers to variables
    const details = useSelector(store => store.details);
    console.log("Goal details", details);
    const journal = useSelector(store => store.activePosts);
    console.log("Journal Entries related to this goal", journal);

    
    return (
        <div>
            {details.map(detail => (
                <div>
                    <Grid container>
                        <Grid item xs={12} >
                            <Item >
                            Goal Name: {detail.name}
                            <p>Item Expense: {detail.expense}</p>
                            <p>Item Price: {detail.price}</p>
                            <p>{detail.reasons}</p> 
                            <p>Notes: {detail.notes}</p>
                            <CompletedGoalsJournal journal={journal}/> 
                            </Item>
                        </Grid>
                    </Grid>
                </div>
            ))}
            
        </div>
    )
}

export default GoalCardView;
