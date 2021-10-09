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



export default function CreateGoal () {

    const history = useHistory();

    const [state, setState] = React.useState({ value: null });
    const [goal, setGoal] = useState("");
    const [notes, setNotes] = useState("");
    const [price, setPrice] = useState("");
    const [expense, setExpense] = useState("");
    const dispatch = useDispatch();

    const handleChange = (value) => {
        setState({ value }); 
    };

    const handleAddRow =()=>{
        console.log('Am i working')
        return(
            <>
            <div>
                <tbody>
                    <td><TextField/></td>
                    <td><TextField/></td>
                    <td><TextField/></td>
                </tbody>
            </div>
            </>
            
        )
    }

    const postGoals = (event) => {
        if (goal == "" || state == "" || expense == "" || price == "" || notes == "") { 
            alert('Please fill in all inputs');
            return false;
        };
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
                <br/>
                <br/>
                
            
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

            <table>
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Price</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <TextField 
                            label="Specific" 
                            size="small"
                            value={expense}
                            onChange={(event) => setExpense(event.target.value)}
                        />
                    </td>

                    <td>
                        <TextField
                            label="Price"
                            size="small"
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </td>

                    <td>
                        <TextField 
                            label="Notes"
                            size="small"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />
                    </td>
                    
                    <td>
                        <Button 
                            onClick={handleAddRow}
                            size="small" 
                            variant="contained">Add Row
                        </Button>
                    </td>
                </tbody>
            </table>
            <Button type="submit">Add New Goal</Button>
            </form>
        </div>
    );
    
    
};
