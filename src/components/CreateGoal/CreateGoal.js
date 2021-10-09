import React, {useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";


//import Expenses from '../CreateGoal/Expenses';




export default function CreateGoal() {

    const history = useHistory();

    //const [state, setState] = React.useState({ value: null });
    const [reasons, setReasons] = useState("");
    const [goal, setGoal] = useState("");

    const [buttonClick, setButtonClick] = useState(true);
  
    
    const dispatch = useDispatch();


    // const handleChange = (value) => {
    //     setState({ value });
    // };

    // const postGoals = (event) => {
    //     event.preventDefault(event);

    //     dispatch({
    //         type: "POST_GOALS",
    //         payload: 
    //         {
    //             name: goal,
    //             reasons: reasons,
    //         },
    //     });
    // };


    let data = [{}];

    const [goalData, setGoalData] = useState(data);
    const [addFormData, setAddFormData] = useState({
        expense: '',
        price: '',
        notes: ''
    })

    const handleAddFormChange = (event) => {
        event.preventDefault(event);

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

    const handleBudgetSubmit = (event) => {
        event.preventDefault(event);

        // Create new object from addFormData
        const newGoalData = {
            expense: addFormData.expense,
            price: addFormData.price,
            notes: addFormData.notes
        };

        // Create new array to avoid mutating the state 
        const newGoalsData = [...goalData, newGoalData];
        setGoalData(newGoalsData);

        dispatch({
            type: "POST_NEW_EXPENSE",
            payload: newGoalData
            // {
            //     name: goal,
            //     reasons: reasons,
            // },
        });
    }

    const addExpenses = () => {
        setButtonClick(!buttonClick);
    }
    const submitExpenses = () => {
        if (buttonClick) {
            return;
        }
        else {
            dispatch({
                type: "POST_GOALS",
                payload:
                {
                    name: goal,
                    reasons: reasons,
                },
            });
            

            return (
                <div>
                    <table class="expenseTable">
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
                                    <td className="expenseTableData">{data.expense}</td>
                                    <td className="expenseTableData">{data.price}</td>
                                    <td className="expenseTableData">{data.notes}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div>
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
                        <Button onClick={handleBudgetSubmit} type="submit" variant="contained">Add Expense</Button>
                    </div>
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
                {/* <Button
                    type="submit"
                    size="small"
                    variant="contained"
                >
                    Add Expenses
                </Button> */}
                <Button
                    variant="contained"
                    onClick={addExpenses}
                >
                    Add Expenses
                </Button>
                {submitExpenses()}
               

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
