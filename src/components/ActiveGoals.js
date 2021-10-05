import React from "react";
import "./ActiveGoals.css";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

function ActiveGoals() {
  const history = useHistory();

 

  return (
    <>
      <div className="home">
        <div className="border">
          <h2 className="home__title">Let's set a Goal</h2>

          <AddIcon className="home__Icon" />

          <h4 className="home__subtitle">
            Click the '+' to add a Goal
            <br/>
            <br/>
            These goals should be something you strive to accomplish on a daily basis
          </h4>
        </div>
       
      </div>

   
    </>
  );
}

export default ActiveGoals;
