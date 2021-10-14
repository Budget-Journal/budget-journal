import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';


import "./ActiveGoals.css";

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
        <Grid container item xs={12} justifyContent="center" direction="column" alignItems="center">
            {/* <Grid item> */}
                <Card>
            {/* <form name="frm" onSubmit={postBudget}> */}
            {/* <div className="borderHome"> */}
                <h2 className="home__title">Let's set a Goal</h2>

                <AddIcon onClick={() => history.push("/creategoal")} className="home__Icon" />

                <h4 className="home__subtitle">
                    Click the '+' to add a Goal
                    <br />
                    <br />
                    These goals should be something you strive to accomplish on a daily basis
                    <br />
                    <br /> **Set Funds for Budget: 
                    <input
                    placeholder="Funds"
                    onChange={handleBudget}
                    >
                    </input>
                    <button
                    type="submit">Set Budget</button>
                </h4>
            {/* </div> */}
            {/* </form> */}
                </Card>
                        {/* </Grid> */}

        </Grid>
    )
}