import React from 'react';
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

export default function ViewActiveGoalBudget (props) {
    const dispatch = useDispatch();

    const handleBudgetEdits = (e) => {
        dispatch({
            type: "UPDATE_EXPENSE",
            payload: 
            {
                id: props.detail.id,
                update: { ...props.detail, [e.target.name]: e.target.value},
                goal_id: props.goal.id
            }
        })
    };

    const deleteExpense = (id) => {
        console.log('Expense to delete', id);
    };

    return (
            <tr key={props.detail.id}>
                <td>
                    <TextField
                        name="expense"
                        value={props.detail.expense}
                        onChange={(e) => handleBudgetEdits(e)}
                    />
                </td>
                <td>
                    <TextField
                        name="price"
                        value={props.detail.price}
                        onChange={handleBudgetEdits}
                    />
                </td>
                <td>
                    <TextField
                        name="notes"
                        value={props.detail.notes}
                        onChange={handleBudgetEdits}
                    />
                </td>
                <td><Button onClick={() => deleteExpense(props.detail.id)}>Delete</Button></td>
            </tr>
    )
}