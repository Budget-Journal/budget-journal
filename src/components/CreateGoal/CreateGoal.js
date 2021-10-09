import React, {useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";


import Expenses from '../CreateGoal/Expenses';




export default function CreateGoal() {

    const history = useHistory();

    //const [state, setState] = React.useState({ value: null });
    const [reasons, setReasons] = useState("");
    const [goal, setGoal] = useState("");
  
    
    const dispatch = useDispatch();


    // const handleChange = (value) => {
    //     setState({ value });
    // };

    const postGoals = (event) => {
        event.preventDefault(event);

        dispatch({
            type: "POST_GOALS",
            payload: 
            {
                name: goal,
                reasons: reasons,
            },
        });
    };



    return (


        <div className="text-editor">
            <form name="frm" onSubmit={postGoals} >
                <p>Goal:</p>
                <TextField
                    label="Goal Name"
                    size="small"
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                />
                <br />
                <br />


                <TextField
                    className="reasonsBox"
                    placeholder="What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                    multiline
                    rows={4}
                    value={reasons.value}
                    onChange={(event) => setReasons(event.target.value)}
                />
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                >
                    Add Expenses
                </Button>
               

                {/* <EditorToolbar />
                <ReactQuill className="quill"
                    theme="snow"
                    value={state.value}
                    onChange={handleChange}
                    placeholder={
                        "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                    }
                    modules={modules}
                    formats={formats}
                /> */}

                
                {/* {goalStuffIsCool <= 0 ?
                    <div>Completed a goal first :)s</div>
                    :       
                  <Expenses  />
                } */}
            </form>
        </div>
    );
};
