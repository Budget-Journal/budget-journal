import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, TextField, Container, Select, Button,  Grid, InputLabel, FormControl, makeStyles, MenuItem, } from '@material-ui/core';
import "./styles.css";
import JournalEntries from "./journalEntries";
import userReducer from "../../redux/reducers/user.reducer";

import Box from '@mui/material/Box';




export default function Journal () {
  // Set react hooks to variables
  const dispatch = useDispatch();

  const journal = useSelector(store => store.journal);
  const selectGoal = useSelector(store => store.selectGoal);


  console.log('journalReducer******', journal);
  console.log('selectGoalsReducer******', selectGoal);

  // Holds the value of the users post locally
  const [journalPost, setJournalPost] = useState({
    entry: '',
    goal: ''
  });

  useEffect(() => {
    fetchActiveGoals();
    fetchJournalPosts();
  }, []);

  const fetchActiveGoals = () => {
    dispatch({
      type: "FETCH_ACTIVE_GOALS"
    })
  }

  const fetchJournalPosts = () => {
    dispatch({
      type: "FETCH_JOURNAL_POSTS"
    })
  }


  const handlePostInput = (e) => {
    setJournalPost({
      ...journalPost, [e.target.name]: e.target.value
    })
  }

  let newEntry;
  function PostEntry(e) {
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

    <br />
    <br />
    <div>
        {journal.map((entry, index) => (
          <JournalEntries entry={entry} index={index} />
        ))}
    </div>
   </Container>
  );
};
