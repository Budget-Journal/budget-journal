import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from "../Logo1.png";
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/activegoals">
      <div className="nav__left">
     
        <img className="header__logo" src={Logo1} alt="" />
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
            <h1 className="user">{user ? <h2> {user.username}</h2> : <h3>No user logged-in</h3>}</h1>
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
