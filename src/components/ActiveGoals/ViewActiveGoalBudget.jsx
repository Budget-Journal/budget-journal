import React, {useState} from 'react';
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

export default function ViewActiveGoalBudget (props) {
    const [budget, setBudget] = useState({
        expense: props.detail.expense,
        price: props.detail.price,
        notes: props.detail.notes
    })

    const handleBudgetEdits = (e) => {
        setBudget({
            ...budget, [e.target.name]: e.target.value
        })
    }

    console.log("Goal", props.goal.name)
    console.log("Budget", budget)

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
            </tr>
    )
}