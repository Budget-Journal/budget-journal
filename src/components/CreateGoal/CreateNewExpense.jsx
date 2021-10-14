import React from 'react';
import { useDispatch } from "react-redux";

// Material UI Imports
import { TextField} from "@mui/material";

export default function CreateNewExpense({expense, index}) {
    const dispatch = useDispatch();

    // Handle expense edits on keystrokes
    const handleExpenseEdits = (e) => {
        dispatch({
            type: "THIS_WILL_CHANGE_TESTING",
            payload: {...expense, [e.target.name]: e.target.value}
        })
    }

    return (
        <tr>
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
        </tr>
    )
} // end CreateNewExpense