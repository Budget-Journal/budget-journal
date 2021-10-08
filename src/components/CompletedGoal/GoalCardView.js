import React from 'react';
import { useSelector } from 'react-redux';
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';

//Material UI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
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

function GoalCardView() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    // Setting reducers to variables
    const details = useSelector(store => store.details);
    console.log("Goal details", details);
    const journal = useSelector(store => store.journalPosts);
    console.log("Journal Entries related to this goal", journal);

    
    return (
        <div>
            {details.map(detail => (
                <div>
                     <Card  sx={{width: '200%'}}>
                        <CardHeader
                            avatar={
                            <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"/>                                
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
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
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Expense: {detail.expense}
                            <br />
                            Price: ${detail.price}
                            <br />
                            Notes: {detail.notes}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            </IconButton>

                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>

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
                               <JournalPosts journal = {journal}/>
                            </Typography>
                            </CardContent>
                        </Collapse>
                        </Card>
                </div>
            ))}

            

            
        </div>
    )
}

export default GoalCardView;
