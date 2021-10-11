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
    const [addExpensesButtonClick, setAddExpensesButtonClick] = useState(true);
  
    const dispatch = useDispatch();

    const submitGoal = () => {
        history.push('/activegoals');
    }


    // Toggle the Add Expenses Button (we need to make this untoggleable later)
    const addExpenses = () => {
        setAddExpensesButtonClick(!addExpensesButtonClick);
    }
    const submitExpenses = () => {
        if (addExpensesButtonClick) {
            return;
        }
        else {
            dispatch({
                type: "POST_GOALS",
                payload:
                {
                    name: goal,
                    reasons: reasons,
                }
            });
            //Render the Expenses after ADD EXPENSES button is clicked
            return (
                <div>
                    <Expenses />
                    <Button 
                        onClick={submitGoal}
                        variant="contained"
                    >
                        Submit Goal
                    </Button>
                </div>
            )
        }
    }
       


    return (
        <div className="text-editor">
            <form name="frm" onSubmit={submitExpenses} >
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
                    variant="contained"
                    onClick={addExpenses}
                >
                    Add Expenses
                </Button>
                {submitExpenses()}
               

                    {/* <td>
                        <TextField
                            label="Price"
                            size="small"
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </td> */}


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
            </form>
        </div>
    );
};
