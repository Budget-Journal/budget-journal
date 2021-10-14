import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import "./ActiveGoals.css";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const styles = {
    gridContainer: {
        backgroundImage: `url(${'https://www.emeraldgrouppublishing.com/sites/default/files/2019-12/SER1.1.1%20-%20FW%20-%20Stack%20of%20Journals.jpg'})`
    }
};
export default function NoGoals() {
    // Set hooks as variables 
    const history = useHistory();
    let [budget, setBudget]= useState("")
    const dispatch = useDispatch();

    const postBudget = () => {
        dispatch({
            type: "POST_BUDGET",
            payload:{
               total_budget: budget 
            },
        });
        setBudget("");
    }
    

    const handleBudget = (event) =>{
        setBudget(event.target.value);
    }
    

    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container align="center" >
            <Grid item xs>
                <Item>
                    <Card style={styles.gridContainer}>
                <form name="frm" onSubmit={postBudget}>
                    <h2 className="home__title">Let's set a Goal</h2>

                    <AddIcon 
                    fontSize="large" 
                    variant="outlined"
                    onClick={() => history.push("/creategoal")}/>

                    <h4 className="home__subtitle">
                        Click the '+' to add a Goal
                        <br />
                        <br />
                        These goals should be something you strive to accomplish on a daily basis
                        <br />
                        <br />
                        <TextField
                        label="Set Funds for Budget"
                        size="small"
                        placeholder="Funds"
                        required
                        onChange={handleBudget}
                        >
                        </TextField>
                        <br />
                        <Button
                        size="small"
                        variant="text"
                        color="primary"
                        type="submit">Set Budget</Button>
                    </h4>
                </form>
                    </Card>
                </Item>
            </Grid>
        </Grid>
        </Box>
    )
}