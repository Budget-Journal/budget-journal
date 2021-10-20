import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Material UI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
//End Material UI Imports

import ViewActiveGoalDetails from "./ViewActiveGoalDetails";

export default function RenderedGoals({ goal, index }) {
  console.log("***goal is", goal.total_goal_cost);

  // Set hooks to variables
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);

  let goalId;
  let goalCost = goal.total_goal_cost;
  let updateBudget = user.total_budget - goalCost;

  // Will store the goal details in a reducer and fetch all the journal posts related to the goal
  // Dispatch data will be displayed in ViewActiveGoalDetails
  const handleViewGoalDetails = (goal) => {
    console.log("Goal id", goal.id);
    dispatch({
      type: "SET_ACTIVE_GOAL_DETAILS",
      payload: goal,
    });

    dispatch({
      type: "FETCH_ACTIVE_BUDGET_DETAILS",
      payload: goal.id,
    });

    dispatch({
      type: "FETCH_GOAL_JOURNAL_POSTS",
      payload: goal.id,
    });

    history.push("/active_goal_details");
  };

  // Will change a goal from being uncompleted to completed
  const handleCompleteGoal = (goal) => {
    //Alerts user to either confirm if the goal is completed or cancel if its not.
    let isConfirm = confirm(
      "Is this trip really completed? You wont be able to undo once completed."
    );
    if (isConfirm) {
      goalId = {
        id: goal.id,
      };
      dispatch({
        type: "UPDATE_GOAL_COMPLETED",
        payload: goalId,
      });
      dispatch({
        type: "UPDATE_BUDGET_ON_COMPLETE_GOAL",
        payload: { updateBudget },
      });
      history.go(0);
    } else {
      return false;
    }
  };

  // Will delete a goal from the dom and database
  const handleDeleteGoal = (goal) => {
    console.log("Goal id", goal.id);
    goalId = {
      id: goal.id,
    };
    dispatch({
      type: "DELETE_ACTIVE_GOAL",
      payload: goalId,
    });
    history.go(0);
  };

  var formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg" />
          }
          title={goal.name}
          subheader={formatter.format(goal.total_goal_cost)}
        />
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              handleCompleteGoal(goal);
            }}
          >
            <Checkbox {...label} default color="success" />
          </Button>

          <Button
            size="small"
            onClick={() => {
              handleViewGoalDetails(goal);
            }}
          >
            Edit
          </Button>

          <Button
            color="error"
            size="small"
            onClick={() => {
              handleDeleteGoal(goal);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
