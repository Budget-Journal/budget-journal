import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles, MenuItem } from '@material-ui/core';
import "./styles.css";

export default function Journal () {
  // Set react hooks to variables
  const dispatch = useDispatch();

  // Holds the value of the users post locally
  const [journalPost, setJournalPost] = useState({
    entry: '',
    goal: ''
  });

  useEffect(() => {
    fetchJournalPosts();
  }, []);

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
  }


  return (
   <Container>
    <h1>J's Journal</h1>

      <form onSubmit={PostEntry}>
        <TextField 
          type="text"
          name="entry"
          className="inputField"
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" 
          value={journalPost.entry}
          onChange={handlePostInput}
        />
        <Select
          name="goal"
          displayEmpty
          onChange={handlePostInput}
        >
          <MenuItem value="NULL"> <em>None</em> </MenuItem>
          <MenuItem value="1">Run a 5k</MenuItem>
          <MenuItem value="2">Buy a Maserati</MenuItem>
          <MenuItem value="3">Family trip to Barcelona</MenuItem>
        </Select>
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
      Feed will be posted here
    </div>
   </Container>
  );
};
