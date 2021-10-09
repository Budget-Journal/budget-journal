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
//End Material UI Imports


const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "30px",
    paddingRight: "10px"
  }
});


export default function GoalCard() {
  // Set hooks as variables
   const dispatch = useDispatch();
   const classes = useStyles();
   const history = useHistory();
   const completedGoals= useSelector(store => store.completedGoal);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPLETED_GOALS'
          });
   }, []);

   const handleView = (id) => {
    console.log('this goal id', id)
     dispatch({
       type: 'CARD_VIEW_DETAILS',
       payload: id
     });

     dispatch({
       type: "FETCH_GOAL_JOURNAL_POSTS",
       payload: id
     });

     history.push('/view')
   }
    
   

   const handleDelete =(id) => {
     confirm('Are you sure?');

    dispatch({ 
     type: "DELETE_GOAL",
     payload: id,
   });
   };
  
    return (
      
        <Grid container 
        className={classes.gridContainer} 
        justify="center"
        spacing={4}
        >
          {completedGoals.map(detail => (
              <Grid item xs={12} sm={6} >
               <Card  sx={{width: '100%'}}>
                  <CardHeader
                      avatar={
                      <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"/>                                
                      }
                      action={
                      <IconButton  aria-label="settings">
                          <DeleteOutlineIcon color="error" onClick={() => handleDelete(detail.id)} />
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
                  {/* <CardContent>
                      <Typography variant="body2" color="text.secondary">
                    
                      </Typography>
                  </CardContent> */}
                  <CardActions disableSpacing>

                      <IconButton aria-label="add to favorites">
                      
                      </IconButton> 

                      <IconButton aria-label="share">
                      <VisibilityIcon color="secondary" onClick={() => handleView(detail.id)}> </VisibilityIcon>
                      
                      </IconButton>
 
                  </CardActions>
                  </Card>
                  </Grid>
      ))}
      </Grid>
  );
}
