import React, { useEffect } from "react";
import { useSelector } from 'react-redux';


export default function ProfilePage() {

    const user = useSelector((store) => store.user);
    const activeGoals = useSelector(store => store.activeGoals);
    console.log('***', activeGoals )

    //Array for holding the cost of each goal
    let totalGoalCost = [];

    //Push each goal cost into array
    for (let i = 0; i < activeGoals.length; i++) {
        totalGoalCost.push(parseInt(activeGoals[i].total_goal_cost));
        console.log(totalGoalCost);
    }
    //Set the totalGoalCost sum to 0
    let totalGoalCostSum = 0;

    // Sum the totalGoalCost into the totalGoalCostSum
    for (let i = 0; i < activeGoals.length; i++) {
        totalGoalCostSum = totalGoalCostSum + totalGoalCost[i];
        totalGoalCostSum.toFixed(2)
    }

    // Subtract the totalGoalCost amount from the user budget total 
    const remainingBalance = user.total_budget - totalGoalCostSum;

    return (
        <div>
            <h1>Profile</h1>
            <h1>Total Budget: $ {user.total_budget}<button>Edit Budget</button></h1>
            <h2>Total Goal Cost: {totalGoalCostSum.toFixed(2)}</h2>
            <h2>Remaining Balance: {remainingBalance.toFixed(2)}</h2>
        </div>
    )
} 