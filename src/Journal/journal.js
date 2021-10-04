import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles, MenuItem } from '@material-ui/core';
import "./styles.css";

export default function Journal () {
  // Set react hooks to variables
  const dispatch = useDispatch();

  // Holds the value of the users post locally
  const [journalPost, setJournalPost] = useState();
  let newEntry;

  function handlePostInput(e) {
    setJournalPost(e.target.value)
  }
  
  function PostEntry(e) {
    e.preventDefault(e);
    console.log("Post", journalPost);
    newEntry = {entry: journalPost}


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
          className="inputField"
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" 
          value={journalPost}
          onChange={handlePostInput}
        />
        <Select
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="NULL"> <em>None</em> </MenuItem>
          <MenuItem value="Run a 5k">Run a 5k</MenuItem>
          <MenuItem value="Buy a Maserati">Buy a Maserati</MenuItem>
          <MenuItem value="Family trip to Barcelona">Family trip to Barcelona</MenuItem>
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
