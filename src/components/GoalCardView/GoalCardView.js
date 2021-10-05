import React from 'react';
import {useSelector } from 'react-redux';
import GoalCardDetails from './GoalCardDetails';


function GoalCardView() {
    
    const details = useSelector(store => store.goal)
    
    
    
    return (
        <div>
            {details.map(details => (
                <GoalCardDetail key={i} details = {details} />
            ))}
        </div>
    )
}

export default GoalCardView
