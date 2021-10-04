import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Container, Select, Button, Grid, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import "./styles.css";

export default function Journal () {
  // Set react hooks to variables
  const dispatch = useDispatch();

  // Holds the value of the users post locally
  const [journalPost, setJournalPost] = useState();

  
  function PostEntry(e) {
    e.preventDefault(e);
    console.log("Post", journalPost);

    dispatch({
      type: "ADD_NEW_JOURNAL_POST",
      payload: journalPost
    });

    // Clear user inputs
    setJournalPost('');
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
          onChange={(e) => setJournalPost(e.target.value)}
        />
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
