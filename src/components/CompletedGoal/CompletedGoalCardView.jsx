import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';


//Material UI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
//End Material UI Imports

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "50px",
      paddingRight: "50px"
    }
  });
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


export default function CompletedGoalCardView() {
    // Material UI, handles the expand
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Setting reducers to variables
    const goalDetails = useSelector(store => store.viewGoalDetails);
    const journal = useSelector(store => store.journalPosts);
    const budgetDetails = useSelector(store => store.budgetTableReducer);


    return (
        <Grid container className={classes.gridContainer}>
            <Grid>
                <Card>
                    <CardHeader 
                        action={
                             <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={goalDetails.name}
                        subheader="Completed Goal"

                    />
                    <CardMedia
                        height="194"
                    />
                    <CardActions disableSpacing>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                <div dangerouslySetInnerHTML={{__html: goalDetails.reasons}}></div>                  
                            </Typography>
                            <Typography paragraph>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Expense</th>
                                            <th>Price</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {budgetDetails.map((expense, index)=> (
                                            <tr key={index}>
                                                <td>{expense.expense}</td>
                                                <td>{expense.price}</td>
                                                <td>{expense.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Typography>
                            <Typography paragraph>
                                <JournalPosts journal = {journal}/>
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </Grid>
    )
}





{/* <table>
        <thead>
            <tr>
                <th>Expense</th>
                <th>Price</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            {details.map(detail => (
                <BudgetTable goal={goalDetails} detail={detail} />
            ))}
        </tbody>
    </table>

    <div>
        <JournalPosts journal={journal} />
    </div> */}