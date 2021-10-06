import React, {useEffect} from "react";
import { useSelector } from 'react-redux';

// NEED TO RENAME THIS COMPONENT LATER
// THIS WILL BE FOR THE COMPLETED GOAL CARDS
// DISPATCH WILL BE CALLED WHEN THE VIEW BUTTON IS CLICKED ON THE GOAL CARD
export default function CompletedGoalsJournalPosts({journal}) {

    return (
        <div>
            <h5>Journal Posts</h5>
            {journal.map(entry => (
                <p>{entry.post_text}</p>
            ))}
        
        </div>
    )
} // end export default CompletedGoals



// need to do a fetch based on goal id
// return only the posts related to that goal id