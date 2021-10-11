import { useSelector } from "react-redux";
import React, {useState} from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';


export default function ViewActiveGoalDetails() {

    // Obtaining data from reducers
    const goalDetails = useSelector(store => store.activeGoalDetails);
    const journal = useSelector(store => store.journalPosts);

    // Local state to handle any edits a user makes to their goals
    // State begins as their previous information
    const [edits, setEdits] = useState({
        name: goalDetails.name,
        reasons: goalDetails.reasons 
    })
    //const [name, setName] = useState(goalDetails.name);
    //const [reasons, setReasons] = useState(goalDetails.reasons);

    const handleEdits = (e) => {
        setEdits({
            ...edits, [e.target.name]: e.target.value
        })
    }



    return(
        <div>
            <Card>
                <CardContent>
                    <form>
                        <TextField
                            label="Goal Name"
                            size="small"
                            placeholder="Goal Name"
                            name="name"
                            value={edits.name}
                            onChange={handleEdits}
                        /> 
                        <br /><br />

                        <TextField
                            label="Reasons"
                            className="reasonsBox"
                            placeholder="What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                            multiline
                            rows={4}
                            name="reasons"
                            value={edits.reasons}
                            onChange={handleEdits}
                        />
                    </form>
                </CardContent>
            </Card>
            <div> 
                <JournalPosts journal={journal}/> 
            </div>
        </div>
    )
} // end export default function