import React from "react";
import { useSelector } from "react-redux";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
//Material UI Imports
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//End Material UI Imports


const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "30px",
    paddingRight: "10px"
  }
});


export default function GoalCard() {
  // Set hooks as variables
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

   const completedGoals= useSelector(store => store.completedGoal);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPLETED_GOALS'
          });
   }, []);

    // Will store the goal details in a reducer and fetch all the journal posts related to the goal 
    // Dispatch data will be displayed in ViewActiveGoalDetails
  const handleView = (detail) => {
    console.log('this goal id', detail.id);
    dispatch({
      type: 'CARD_VIEW_DETAILS',
      payload: detail.id
    })

    dispatch({
      type: "FETCH_GOAL_JOURNAL_POSTS",
      payload: detail.id
    })

    history.push('/view')
  }

  // Handles when a user deletes a completed goal
  const handleDelete =(detail) => {
    // let isConfirm = confirm('Are you sure you want to remove this goal?')
    //   if (isConfirm) {
    //     history.push('/accomplishedGoals')
    //   }
    //   else{
    //     return false;
    //   }
    console.log("Goal id", detail.id)
    goalId = {
      id: detail.id
    }
    dispatch({
      type: "DELETE_COMPLETED_GOAL",
      payload: goalId
    })
  }

  return (
    <Grid
      container
      className={classes.gridContainer}
      justify="center"
      spacing={4}
    >
      {completedGoals.map(detail => (
        <Grid item xs={12} sm={6} >
          <Card sx={{ width: '100%' }}>
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
            You wont be able to undo this goal once it is deleted. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDelete(detail)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
            {/* <CardContent>
                  <Typography variant="body2" color="text.secondary">
                
                  </Typography>
              </CardContent> */}
            <CardActions disableSpacing>

              <IconButton aria-label="add to favorites">

              </IconButton>


            </CardActions>
            <CardActions>
              &nbsp; 
              <Button onClick={() => handleView(detail)}><VisibilityIcon /></Button>
              {/* <Button onClick={() => handleDelete(detail)} color="secondary">Delete</Button> */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
    
};


