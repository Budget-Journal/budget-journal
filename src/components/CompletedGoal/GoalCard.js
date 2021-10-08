import React from "react";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
//Material UI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import VisibilityIcon from '@mui/icons-material/Visibility';
//End Material UI Imports





export default function GoalCard() {
  // Set hooks as variables
   const dispatch = useDispatch();
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
      <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {completedGoals.map(detail => (
          <div>
            
              <Grid item xs={12} sm={6}>
               <Card  sx={{width: '100%'}}>
                  <CardHeader
                      avatar={
                      <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"/>                                
                      }
                      action={
                      <IconButton  aria-label="settings">
                          <DeleteOutlineIcon onClick={() => handleDelete(detail.id)} />
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
                      <VisibilityIcon onClick={() => handleView(detail.id)}> </VisibilityIcon>
                      
                      </IconButton>
 
                  </CardActions>
                  </Card>
                  </Grid>
                  
          </div>
          
      ))}
      </Grid>

      

      
  </div>
  );
}
