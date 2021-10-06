import React from 'react';
import { useSelector } from 'react-redux';
import GoalCardDetails from './GoalCardDetails';


function GoalCardView() {

    
    
    const details = useSelector(store => store.details)
    console.log('Redux Store details', details)

    
    return (
        <div>
           {details.map(detail => (
               <GoalCardDetails key={detail.id} detail={detail} />
           ))}
        </div>
    )
}

export default GoalCardView;
