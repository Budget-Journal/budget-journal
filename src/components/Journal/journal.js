import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, TextField, Container, Select, Button,  Grid, InputLabel, FormControl, makeStyles, MenuItem, } from '@material-ui/core';
import "./styles.css";
import JournalEntries from "./journalEntries";
import userReducer from "../../redux/reducers/user.reducer";




export default function Journal () {
  // Set react hooks to variables
  const dispatch = useDispatch();

  // Pulling stored data from Redux
  const journal = useSelector(store => store.journal);
  const selectGoal = useSelector(store => store.selectGoal);


  console.log('journalReducer******', journal);
  console.log('selectGoalsReducer******', selectGoal);

  // Holds the value of the users post locally
  const [journalPost, setJournalPost] = useState({
    entry: '',
    goal: ''
  });

  // Run on page load
  useEffect(() => {
    fetchActiveGoals();
    fetchJournalPosts();
  }, []);

  // Responsible for fetching all the active goals related to the user
  const fetchActiveGoals = () => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }

// Responsible for fetching all journal posts related to the user
  const fetchJournalPosts = () => {
    dispatch({
      type: "FETCH_JOURNAL_POSTS"
    })
  }

  // Responsible for grabbing user inputs and setting the state 
  const handlePostInput = (e) => {
    setJournalPost({
      ...journalPost, [e.target.name]: e.target.value
    })
  }

  // Variable used to pass to the database
  let newEntry;

  // Responsible for sending user inputs to the database
  const PostEntry = (e) => {
    e.preventDefault(e);
    console.log("Post", journalPost);
    newEntry = {
      entry: journalPost.entry,
      goal: journalPost.goal
    }

    dispatch({
      type: "ADD_JOURNAL_POST",
      payload: newEntry
    });

    
    // Handle refresh
    // window.location.reload();
    history.go(0)
    
  }


  return (
   <Container>
      <form onSubmit={PostEntry}>
        <TextField 
          type="text"
          name="entry"
          className="inputField"
          id="outlined-basic" 
          label="Write a new journal post" 
          variant="outlined"
          value={journalPost.entry}
          onChange={handlePostInput}
        />

        <FormControl className="dropdown-menu">
          <InputLabel id="current-active-goals">Select Goal</InputLabel>
          <Select
            labelId="current-active-goals"
            id="demo-simple-select"
            label="Select Goal"
            name="goal"
            onChange={handlePostInput}
          > 
            <MenuItem value="NULL"> <em>None</em> </MenuItem>
            {selectGoal.map((goal, index) => (
              <MenuItem value={goal.id}>{goal.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormHelperText>Optional: Select a Goal this post is related too</FormHelperText>
        <br />
        <Button
          variant="outlined"
          type="submit"
        >
          Post
        </Button>
      </form>

    <div>
        {journal.map((entry, index) => (
          <JournalEntries entry={entry} index={index} />
        ))}
    </div>
   </Container>
  );
};
