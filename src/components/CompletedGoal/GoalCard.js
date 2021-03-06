import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//Material UI Imports

//End Material UI Imports

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "30px",
    paddingRight: "10px",
  },
});

export default function GoalCard() {
  // Set hooks as variables
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  let goalId;

  const completedGoals = useSelector((store) => store.completedGoal);

  useEffect(() => {
    dispatch({
      type: "FETCH_COMPLETED_GOALS",
    });
  }, []);

  // Will store the goal details in a reducer and fetch all the journal posts related to the goal
  // Dispatch data will be displayed in ViewActiveGoalDetails
  const handleView = (detail) => {
    console.log("this goal id", detail.id);
    dispatch({
      type: "COMPLETED_GOAL_DETAILS",
      payload: detail.id,
    });

    dispatch({
      type: "FETCH_GOAL_JOURNAL_POSTS",
      payload: detail.id,
    });

    history.push("/view");
  };

  // Handles when a user deletes a completed goal
  const handleDelete = (detail) => {

    console.log("Goal id", detail.id);
    goalId = {
      id: detail.id,
    };
    dispatch({
      type: "DELETE_COMPLETED_GOAL",
      payload: goalId,
    });
  };

  return (
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      spacing={4}
    >
      {completedGoals.map((detail) => (
        <Grid item xs={12} sm={6}>
          <Card sx={{ width: "100%" }}>
            <CardHeader
              avatar={
                <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg" />
              }
              action={
                <IconButton aria-label="settings">
                  <DeleteOutlineIcon color="error" onClick={handleClickOpen} />
                </IconButton>
              }
              title={detail.name}
              subheader="Completed Goal"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"
              alt="Paella dish"
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
                <Button onClick={() => handleDelete(detail)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites"></IconButton>
            </CardActions>
            <CardActions>
              &nbsp;
              <Button onClick={() => handleView(detail)}>
                <VisibilityIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
