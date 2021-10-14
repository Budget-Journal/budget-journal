import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../Logo1.png'
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


function Nav() {
  //Grab from redux store
  const user = useSelector((store) => store.user);
  const activeGoals = useSelector(store => store.activeGoals);

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
    <div className="nav">

      <Link to="/activegoals">

        <div className="nav__left">

          <div className="nav_left">

            <img src={Logo1} alt="" />

          </div>
        </div>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <h1 className="user">{user ? <h2 className="userLog"> Username: {user.username} <br /><br />Total Budget: $ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
            <h2>Total Goal Cost: {totalGoalCostSum.toFixed(2)}</h2>
            <h2>Remaining Balance: {remainingBalance.toFixed(2)}</h2>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
