import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../Logo1.png'
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


function Nav() {
  const user = useSelector((store) => store.user);

  const activeGoals = useSelector(store => store.activeGoals);
  const lengthOfActiveGoals = activeGoals.length
  console.log('*******************', activeGoals);

  let totalGoalCost = [];
  for (let i = 0; i < activeGoals.length; i++) {
    totalGoalCost.push(parseInt(activeGoals[i].total_goal_cost));
    console.log(totalGoalCost);
  }
  let totalGoalCostSum = 0;
  for (let i = 0; i < activeGoals.length; i++) {
    totalGoalCostSum = totalGoalCostSum + totalGoalCost[i];
    totalGoalCostSum.toFixed(2)
  }
  console.log('*****totalGoalCostSum', totalGoalCostSum.toFixed(2))

  const goalCost = user.total_budget - totalGoalCostSum;

  return (
    <div className="nav">

      <Link to="/activegoals">

        <div className="nav__left">

          {/* <img className="header__logo" src={Logo1} alt="" />  */}

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
            {/* <Link className="navLink" to="/activegoals">
             
            </Link>
            <Link className="navLink" to="/creategoal">
             
            </Link> */}

            {/* <Link className="navLink" to="/journal">
              
            </Link> */}
            {/* <Link className="navLink" to="/accomplishedgoals">
              
            </Link> */}
            <h1 className="user">{user ? <h2 className="userLog"> Username: {user.username} <br /><br />Total Budget: $ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
            <h2>Total Goal Cost: -{totalGoalCostSum.toFixed(2)}</h2>
            <h2>Remaining Balance: {goalCost.toFixed(2)}</h2>
            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
