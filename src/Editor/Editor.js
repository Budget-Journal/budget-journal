import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = () => {


    const [state, setState] = React.useState({ value: null });
    // const [goal, setGoal] = useState("");
    const handleChange = (value) => {
        setState({ value });


        // const postGoals = () => {
        //     dispatch({
        //         type: "POST_GOALS",
        //         payload: {
        //             goal: goal,
        //             state: state,

        //         },
        //     });

        // };

        // const handleGoal = (event) => {
        //     //Handles input from Goal Input Field
        //     console.log("handleGoal");
        //     setGoal(event.target.value);
        // };

        return (

            <div className="text-editor">
                <h1>Goal:<TextField size="small" > </TextField></h1>
                <EditorToolbar />
                <ReactQuill
                    theme="snow"
                    value={state.value}
                    onChange={handleChange}
                    placeholder={
                        "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                    }
                    modules={modules}
                    formats={formats}
                />
                <br />
                <br />
                <br />

                <table>
                    <tr>
                        <th>Expense</th>
                        <th>Price</th>
                        <th>Notes</th>


                    </tr>
                    <td><TextField size="small"></TextField></td>
                    <td><TextField size="small"></TextField></td>
                    <td><TextField size="small"></TextField></td>
                    <td><Button size="small" variant="contained">Add Row</Button></td>
                </table>
                {/* <Button onClick={postGoals}>Set Goal</Button> */}
                <br />
                <br />
                <br />
                {/* <Card>
            <CardContent>
                <Typography className="recentlistings" variant="h5" component="h3">Feed to Display Entries</Typography>
            </CardContent>

        </Card> */}



            </div>
        );
    };
    
}

export default Editor;
