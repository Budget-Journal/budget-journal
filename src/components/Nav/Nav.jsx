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
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


function Nav() {
  //Handle menu from Avatar
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //Grab from redux store
  const user = useSelector((store) => store.user);
  console.log('****TOTAL BUDGET', user.total_budget);

  var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background: '#71aac9'}} position="static">
        <Toolbar>
          <img height="100px" width="auto" src={JournalLogo} alt="" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          Total Budget: {formatter.format(user.total_budget)}
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
          <div className="user">
            {user ? <h6 className="userLog"> 
            <Stack direction="row" spacing={2}>
                  <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                 <Avatar 
                  alt={user.username}
                  src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</MenuItem>
              </Menu> 
            </Stack>
            <br/>
            </h6> : <h3>No user logged-in</h3>}
          </div>
        )}
        </Toolbar>
      </AppBar>
    </Box>

             
   
  );
}

export default Nav;

