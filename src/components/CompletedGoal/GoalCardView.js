import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@mui/material';
import CompletedGoalsJournal from '../CompletedGoalsJournalPosts/CompletedGoalsJournalPosts';


function GoalCardView() {

    // Setting reducers to variables
    const details = useSelector(store => store.details);
    console.log("Goal details", details);
    const journal = useSelector(store => store.journalPosts);
    console.log("Journal Entries related to this goal", journal);

    
    return (
        <div>
            {details.map(detail => (
                <div>
                    <Card>
                        <p>{detail.name}</p>
                        <p>{detail.price}</p>
                        <p>{detail.reasons}</p> 
                        <p>{detail.notes}</p>
                    </Card>
                </div>
            ))}
            <div> 
                <CompletedGoalsJournal journal={journal}/> 
            </div>
        </div>
    )
}

export default GoalCardView;
