import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

export default function ViewActiveGoalBudget(props) {
  const dispatch = useDispatch();

  // Handle expense edits on keystrokes
  const handleBudgetEdits = (e) => {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: {
        id: props.detail.id,
        update: { ...props.detail, [e.target.name]: e.target.value },
        goal_id: props.goal.id,
      },
    });
  };

  // Delete an expense by id
  const deleteExpense = (detail) => {
    console.log(`Expense to delete ${detail.id} from Goal ${detail.goal_id}`);
    dispatch({
      type: "DELETE_EXPENSE",
      payload: {
        id: detail.id,
        goal_id: detail.goal_id,
      },
    });
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
      <td>
        <Button
          style={{ color: "red" }}
          onClick={() => deleteExpense(props.detail)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
