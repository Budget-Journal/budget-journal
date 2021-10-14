import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../Logo1.png'
import JournalLogo from '../JournalLogo.png'
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CardMedia from '@mui/material/CardMedia';
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

    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background: '#71aac9'}} position="static">
        <Toolbar placement="right-bottom">
          <img height="100px" width="auto" src={JournalLogo} alt="" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          </Typography>
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
            <h1 className="user">{user ? <h2 className="userLog"> {user.username} <br/>$ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
           <h2>Total Goal Cost: {totalGoalCostSum.toFixed(2)}</h2>
            <h2>Remaining Balance: {remainingBalance.toFixed(2)}</h2>
            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about"> */}
          
        {/* </Link> */}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
    // <div className="nav"> 
    
    //   <Link to="/activegoals">

    //   <div className="nav__left">
         
    //         {/* <img className="header__logo" src={Logo1} alt="" />  */}

    //   <div className="nav_left">
     
    //     <img src={Logo1} alt="" />
        
    // </div>
    //   </div>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */}
    //     {user.id === null &&
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     }

    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>
    //         {/* <Link className="navLink" to="/activegoals">
             
    //         </Link>

    //         <Link className="navLink" to="/creategoal">

             
    //         </Link> */}

    //         {/* <Link className="navLink" to="/journal">
              
    //         </Link> */}
    //         {/* <Link className="navLink" to="/accomplishedgoals">
              

    //         </Link> */}
    //         <h1 className="user">{user ? <h2 className="userLog"> {user.username} <br/><br/>$ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
           
    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

            // </Link> */}
//             <h1 className="user">{user ? <h2 className="userLog"> Username: {user.username} <br /><br />Total Budget: $ {user.total_budget}</h2> : <h3>No user logged-in</h3>}</h1>
//             <h2>Total Goal Cost: -{totalGoalCostSum.toFixed(2)}</h2>
//             <h2>Remaining Balance: {remainingBalance.toFixed(2)}</h2>
//             <LogOutButton className="navLink" />
        //   </>
        // )}


    //     {/* <Link className="navLink" to="/about">
          
    //     </Link> */}
    //   </div>
    // </div>
  );
}

export default Nav;

