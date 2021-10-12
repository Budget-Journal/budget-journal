import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

export default function ViewActiveGoalBudget (props) {
    const dispatch = useDispatch();

    const [budget, setBudget] = useState({
        expense: props.detail.expense,
        price: props.detail.price,
        notes: props.detail.notes
    })

    const handleBudgetEdits = (e) => {
        
        setBudget({
            ...budget, [e.target.name]: e.target.value
        })

        dispatch({
            type: "NEW_BUDGET",
            payload: {
                id: props.detail.id,
                goal: props.goalDetails,
                expense: budget
            }
        })
    }

    return (
            <tr key={props.index}>
                <td>
                    <TextField
                        name="expense"
                        value={budget.expense}
                        onChange={handleBudgetEdits}
                    />
                </td>
                <td>
                    <TextField
                        name="price"
                        value={budget.price}
                        onChange={handleBudgetEdits}
                    />
                </td>
                <td>
                    <TextField
                        name="notes"
                        value={budget.notes}
                        onChange={handleBudgetEdits}
                    />
                </td>
                <td><Button>Delete</Button></td>
            </tr>
    )
}