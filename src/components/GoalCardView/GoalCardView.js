import React from 'react';
import { useSelector } from 'react-redux';
import GoalCardDetails from './GoalCardDetails';


function GoalCardView() {

    // Setting reducers to variables
    const details = useSelector(store => store.details);
    const journal = useSelector(store => store.journal);
    console.log("Journal Entries related to this goal", journal);

    
    return (
        <div>
           {details.map(detail => (
               <GoalCardDetails key={detail.id} detail={detail} />
           ))}
        </div>
    )
}

export default GoalCardView;
