import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
//Material UI Imports
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
//End Material UI Imports

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
});

export default function CompletedGoalCard({ goal, index }) {
  //Material UI
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Set hooks to variables
  const dispatch = useDispatch();
  const history = useHistory();

  // Will store the goal details in a reducer and fetch all the journal posts related to the goal

  const handleViewGoalDetails = (goal) => {
    console.log("Goal id", goal.id);

    // Store goal information in a reducer
    dispatch({
      type: "SET_ACTIVE_GOAL_DETAILS",
      payload: goal,
    });

    // Fetch expenses related to the goal
    dispatch({
      type: "FETCH_ACTIVE_BUDGET_DETAILS",
      payload: goal.id,
    });

    // Fetch the journal posts related to the goal
    dispatch({
      type: "FETCH_GOAL_JOURNAL_POSTS",
      payload: goal.id,
    });

    // Go to view page
    history.push("/view");
  };

  // Will delete a goal from the dom and database
  const handleDeleteGoal = (goal) => {
    console.log("Goal id", goal.id);

    dispatch({
      type: "DELETE_COMPLETED_GOAL", //NEED TO FIX THIS
      payload: goal.id,
    });
  };

  return (
    <div>
      <div>
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg" />
            }
            action={
              <IconButton>
                <DeleteOutlineIcon color="error" onClick={handleClickOpen} />
              </IconButton>
            }
            title={goal.name}
            subheader={goal.total_goal_cost}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure about deleting this goal?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You wont be able to undo this goal once it is deleted. Are you
                sure?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                handleViewGoalDetails(goal);
              }}
            >
              <VisibilityIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
