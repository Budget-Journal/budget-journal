import React from 'react';

// Material UI Imports
import { TextField, Button } from "@mui/material";

// Quill Imports
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";


export default function CreateNewGoal() {

    const [state, setState] = React.useState('');
    const [goal, setGoal] = React.useState("");

    const handleChange = value => {
        console.log('Change', value);
        setState(value);
    }

    const addExpenseRow = () => {
        console.log('Add Expense Row');
    }

    return (
        <div>
            <TextField 
                label="What is your next goal?"
                size="small"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
            
            />

            <EditorToolbar />
            <ReactQuill className="quill"
                theme="snow"
                value={state}
                onChange={handleChange}
                placeholder={
                    "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                }
                modules={modules}
                formats={formats}
            />
            <table>
                <thead>
                    <th>Expense</th>
                    <th>Price</th>
                    <th>Notes</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Expense</td>
                        <td>Price</td>
                        <td>Notes</td>
                    </tr>
                </tbody>
            </table>
            <Button onClick={() => addExpenseRow()}>Add Expense</Button>
        </div>
    )
} // end CreateNewGoal