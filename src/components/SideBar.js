import React from "react";
import "./Sidebar.css";
import SideBarRow from "./SideBarRow";
import { useHistory } from "react-router-dom";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';

function SideBar() {
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
    <div className="sidebar">
      <SideBarRow 
      Icon={PlaylistAddCheckIcon} 
      title="Active Goals" 
      link={goToActiveGoals} />
      
      <SideBarRow
        Icon={AddCircleIcon}
        title="Create Goal"
        link={createGoal}
      />
      
      <SideBarRow
        Icon={MenuBookIcon}
        title="Journal"
        link={journal}
      />
      <SideBarRow
        Icon={CelebrationIcon}
        title=" Accomplished Goals"
        link={accomplishedGoals}
      />
      
      <hr />
    </div>
  );
}

export default SideBar;

