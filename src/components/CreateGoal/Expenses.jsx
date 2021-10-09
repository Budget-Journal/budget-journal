import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

export default function Expenses(){
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
        });
    }

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