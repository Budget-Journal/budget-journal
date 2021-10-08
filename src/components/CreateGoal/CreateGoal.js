import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { useDispatch } from "react-redux";
import "./styles.css";




export default function CreateGoal() {

    const history = useHistory();

    const [state, setState] = React.useState({ value: null });
    const [goal, setGoal] = useState("");
    const [notes, setNotes] = useState("");
    const [price, setPrice] = useState("");
    const [expense, setExpense] = useState("");
    const dispatch = useDispatch();

    // Empty Data for goal form (expense, price, notes)
    let data = [{}];
    const [goalData, setGoalData] = useState(data);
    const [addFormData, setAddFormData] = useState({
        expense: '',
        price: '',
        notes: ''
    })

    const handleAddFormChange = (event) => {
        event.preventDefault();

        // Get the name attribute from TextField on handleAddSubmit form (expense, price, notes)
        const fieldName = event.target.getAttribute('name');
        // Get the value the user enters into the TextField (expense, price, notes)
        const fieldValue = event.target.value;

        // Spread operator to copy existing form data
        const newFormData = { ...addFormData };
        // Update the object with the new value the user inputs
        newFormData[fieldName] = fieldValue;

        // Set newFormData to state
        setAddFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Create new object from addFormData
        const newGoalData = {
            expense: addFormData.expense,
            price: addFormData.price,
            notes: addFormData.notes
        };

        // Create new array to avoid mutating the state 
        const newGoalsData = [...goalData, newGoalData];
        setGoalData(newGoalsData);
    }

    const handleChange = (value) => {
        setState({ value });
    };

    const postGoals = (event) => {
        dispatch({
            type: "POST_GOALS",
            payload: {
                name: goal,
                reasons: state,
                expense: expense,
                price: price,
                notes: notes
            },
        });

        history.push('/activegoals')
        history.go(0);
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


                <EditorToolbar />
                <ReactQuill className="quill"
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
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Price</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {goalData.map((data) => (
                        <tr>
                            <td>{data.expense}</td>
                            <td>{data.price}</td>
                            <td>{data.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleAddFormSubmit}>
                <TextField
                    placeholder="Expense"
                    name="expense"
                    onChange={handleAddFormChange}
                />
                <TextField
                    placeholder="Price"
                    name="price"
                    onChange={handleAddFormChange}
                />
                <TextField
                    placeholder="Notes"
                    name="notes"
                    onChange={handleAddFormChange}
                />
                <Button type="submit" variant="contained">Add</Button>
            </form>
        </div>
    );


};
