import React from 'react';
import { useSelector } from 'react-redux';

// Material UI Imports
import { TextField, Button } from "@mui/material";

// Quill Imports
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

// Component Imports
import CreateNewExpense from './CreateNewExpense';


export default function CreateNewGoal() {

    const expenses = useSelector(store => store.newExpense);

    const [quill, setQuill] = React.useState('');
    const [goal, setGoal] = React.useState("");

    const handleQuillChange = value => {
        // console.log('Change', value);
        setQuill(value);
    }

    const cancelCreateGoal = () => {
        console.log('Cancel Creating New Goal')
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
                value={quill}
                onChange={handleQuillChange}
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
                    {expenses.map((expense, index) => (
                        <CreateNewExpense expense={expense} index={index} />
                    ))}
                </tbody>
            </table>
            <Button onClick={() => addExpenseRow()}>Add Expense</Button>
            <Button onClick={() => cancelCreateGoal()}>Cancel</Button>
            <Button>Create Goal</Button>
        </div>
    )
} // end CreateNewGoal