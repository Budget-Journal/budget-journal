import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// NEED TO RENAME THIS COMPONENT LATER
// THIS WILL BE FOR THE COMPLETED GOAL CARDS
// DISPATCH WILL BE CALLED WHEN THE VIEW BUTTON IS CLICKED ON THE GOAL CARD
export default function CompletedGoalsJournalPosts({ journal }) {
  return (
    <div>
      {journal.map((entry) => (
        <p>{entry.post_text}</p>
      ))}
    </div>
  );
} // end export default CompletedGoals


