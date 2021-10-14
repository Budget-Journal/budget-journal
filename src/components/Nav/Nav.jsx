import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../Logo1.png'
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { use } from 'passport';


function Nav() {
  const user = useSelector((store) => store.user);

  let totalGoalCost = [];
  const goal = useSelector((store) => store.activeGoals)
  let goalCost = goal.total_goal_cost
  console.log('goalCost', goalCost);
  totalGoalCost.push(goalCost);
  console.log('*******totalGoalCost', totalGoalCost);

  let sumTotalGoal = 0;

  for (let i = 0; i < totalGoalCost.length; i++){
    sumTotalGoal = sumTotalGoal[i]
    console.log('******SUM GOAL',sumTotalGoal);
  }

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
            <h1 className="user">{user ? <h2 className="userLog"> {user.username} <br /><br />$ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
            <h2>Hi</h2>
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
