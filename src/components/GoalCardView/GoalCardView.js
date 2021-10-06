import React from 'react';
import { useSelector } from 'react-redux';
import GoalCardDetails from './GoalCardDetails';
import CompletedGoalsJournal from '../CompletedGoalsJournalPosts/CompletedGoalsJournalPosts';


function GoalCardView() {

    // Setting reducers to variables
    const details = useSelector(store => store.details);
    console.log("Goal details", details);
    const journal = useSelector(store => store.activePosts);
    console.log("Journal Entries related to this goal", journal);

    
    return (
        <div>
           {details.map(detail => (
               <GoalCardDetails key={detail.id} detail={detail} />
           ))}
            <div> 
                <CompletedGoalsJournal journal={journal}/> 
            </div>
        </div>
    )
}

export default GoalCardView;
