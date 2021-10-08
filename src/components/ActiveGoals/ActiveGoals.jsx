import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
// import "./ActiveGoals.css";
import NoGoals from "./NoGoals";
import RenderedGoals from "./RenderedGoals";
import Grid from '@mui/material/Grid';
export default function ActiveGoals() {

  // Set hooks as variables
  const history = useHistory();
  const dispatch = useDispatch();

  const activeGoals = useSelector(store => store.activeGoals);
  const lengthOfActiveGoals = activeGoals.length
  console.log('*******************', lengthOfActiveGoals);

  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }, []); //activeGoals?

 

  return (
    <div>
      {lengthOfActiveGoals <= 0 ?
        <NoGoals />
      :
        <Grid container spacing={4}>
          {activeGoals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <RenderedGoals goal={goal} index={index} />
            </Grid>
          ))}
        </Grid>
      }
    </div>
  );
}
