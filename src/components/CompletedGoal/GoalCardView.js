import React from "react";
import { useSelector } from "react-redux";
import JournalPosts from "../JournalPostsByGoal/JournalPostsByGoal";

//Material UI Imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//End Material UI Imports

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
});
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function GoalCardView() {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Setting reducers to variables
  const details = useSelector((store) => store.details);
  const journal = useSelector((store) => store.journalPosts);
  const completedGoals = useSelector((store) => store.completedGoal);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={11.5}>
        <Card>
          <CardHeader
            avatar={
              <Avatar src="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg" />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={details.name}
            subheader="Completed Goal"
          />
          <CardMedia
            component="img"
            height="194"
            image="https://www.royalcaribbean.com/content/dam/royal/ports-and-destinations/destinations/alaska-cruise-tours/wonder-lake-denali-national-park-mountains-background.jpg"
            alt="Paella dish"
          />
          <CardContent>
            {details.map((detail) => (
              <Typography variant="body2" color="text.secondary">
                Expense: {detail.expense}
                <br />
                Price: ${detail.price}
                <br />
                Notes: {detail.notes}
              </Typography>
            ))}
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
                <JournalPosts journal={journal} />
              </Typography>
              <Typography paragraph>
                <div
                  dangerouslySetInnerHTML={{ __html: goalDetails.reasons }}
                ></div>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
