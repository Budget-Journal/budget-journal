import React from "react";
<<<<<<< HEAD:src/components/SideBar/SideBar.js
import { useDispatch } from "react-redux";
import "./Sidebar.css";
=======
>>>>>>> master:src/components/BottomNavBar/BottomNavBar.js
import { useHistory } from "react-router-dom";

//Bottom Navigation
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';
//End Bottom Navigation


function SideBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  // Set hooks to variables
  const history = useHistory();
  const dispatch = useDispatch();

  const goToActiveGoals = () => {
    history.push("/activegoals");
  };
  
<<<<<<< HEAD:src/components/SideBar/SideBar.js
  // Handles functionality when create goal tab is clicked
  const createGoal = () => {
    // Create a new goal to be used in create goal page
    dispatch({
      type: "CREATE_NEW_GOAL"
    })
    history.push("/creategoal"); // HOW CAN I LINK can I pass it as prop
=======
  const createGoal = (value) => {
    setValue(false)
     history.push("/creategoal"); // HOW CAN I LINK can I pass it as prop
>>>>>>> master:src/components/BottomNavBar/BottomNavBar.js
  };
  
  const journal = () => {
    history.push("/journal");
  };
  const accomplishedGoals = () => {
    history.push("/accomplishedgoals");
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction 
          onClick={goToActiveGoals}
          label="Active Goals" 
          icon={<HomeIcon />} />

          <BottomNavigationAction 
          onClick={createGoal}
          value= {value}
          label="Create a Goal" 
          icon={<AddToPhotosIcon />} />

          <BottomNavigationAction 
          onClick={journal}
          label="Journal" 
          icon={<MenuBookIcon />} />

          <BottomNavigationAction 
          onClick={accomplishedGoals}
          label="Accomplished Goals" 
          icon={<AssignmentTurnedInIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default SideBar;

