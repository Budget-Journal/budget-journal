import React from 'react';
import { useDispatch } from "react-redux";

// Material UI Imports
import { Button, TextField} from "@mui/material";

export default function CreateNewExpense({goal, expense}) {
    const dispatch = useDispatch();

    // Handle expense edits on keystrokes
    const handleExpenseEdits = (e) => {
        dispatch({
            type: "UPDATE_EXPENSE",
            payload: {
                id: expense.id,
                update: {...expense, [e.target.name]: e.target.value},
                goal_id: expense.goal_id
            }
        })
    }

    const deleteExpense = (id) => {
        console.log('Delete expense', id);
    }

    return (
        <tr key={expense.id}>
            <td>
                <TextField 
                    name="expense"
                    value={expense.expense}
                    onChange={(e) => handleExpenseEdits(e)}
                />
            </td>
            <td>
                <TextField 
                    name="price"
                    value={expense.price}
                    onChange={(e) => handleExpenseEdits(e)}
                />
                </td>
            <td>
                <TextField 
                    name="notes"
                    value={expense.notes}
                    onChange={(e) => handleExpenseEdits(e)}
                />
            </td>
            <td>
                <Button onClick={() => deleteExpense(expense)}>Delete</Button>
            </td>
        </tr>
    )
} // end CreateNewExpense