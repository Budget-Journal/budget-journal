import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import "./ActiveGoals.css";
import NoGoals from "./NoGoals";
import Editor from '../Editor/Editor';
import RenderedGoals from "./RenderedGoals";

export default function ActiveGoals() {

  // Set hooks as variables
  const history = useHistory();
  const dispatch = useDispatch();

  const goals = useSelector(store => store.goals);

  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }, []);
 

  return (
    <>

      {goals.length > 0 ?
        <RenderedGoals />
      :
        <NoGoals />
      }

    </>
  );
}
