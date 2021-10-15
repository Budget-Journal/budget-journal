import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI Imports
import { TextField, Button } from "@mui/material";

// Quill Imports
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

// Component Imports
import CreateNewExpense from './CreateNewExpense';


export default function CreateNewGoal() {
    const dispatch = useDispatch();

    const lastGoal = useSelector(store => store.lastGoal);
    const expenses = useSelector(store => store.newExpense);

    const [state, setState] = React.useState('');
    const [goal, setGoal] = React.useState('');

    React.useEffect(() => {

    }, [])

    const handleQuillChange = value => {
        // console.log('Change', value);
        setState(value);
    };

    const cancelCreateGoal = () => {
        console.log('Cancel Creating New Goal');
        // Will dispatch to delete the created goal
    };

    const addExpenseRow = () => {
        console.log('Add Expense Row');
        dispatch({
            type: "CREATE_NEW_EXPENSE",
            payload: {
                id: lastGoal[0].goal_id
            }
        })
    };

    const createGoal = () => {
        console.log('Create new goal')
        dispatch({
            type: "UPDATE_LATEST_GOAL_CREATED",
            payload: {
                id: lastGoal[0].id,
                name: goal,
                reasons: state
            }
        })
    };

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
                    {lastGoal.map((expense, index) => (
                        <CreateNewExpense expense={expense} index={index} />
                    ))}
                </tbody>
            </table>
            <Button onClick={() => addExpenseRow()}>Add Expense</Button>
            <Button onClick={() => cancelCreateGoal()}>Cancel</Button>
            <Button onClick={() => createGoal()}>Create Goal</Button>
        </div>
    )
} // end CreateNewGoal