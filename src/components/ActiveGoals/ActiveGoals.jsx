import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
// import "./ActiveGoals.css";
import NoGoals from "./NoGoals";
import RenderedGoals from "./RenderedGoals";

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
        <div>
          {activeGoals.map((goal, index) => (
            <RenderedGoals goal={goal} index={index} />
          ))}
        </div>
      }

    </div>
  );
}
