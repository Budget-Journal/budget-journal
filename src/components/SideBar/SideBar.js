import React from "react";
import { useDispatch } from "react-redux";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

//Bottom Navigation
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Paper from '@mui/material/Paper';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';
//End Bottom Navigation


function SideBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const history = useHistory();

  const goToActiveGoals = () => {
    history.push("/activegoals");
  };
  
  const createGoal = () => {
    history.push("/creategoal"); // HOW CAN I LINK can I pass it as prop
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

