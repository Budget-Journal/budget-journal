import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";

//Array to hold each expense price
//This needs to be outside the function to work
let totalExpenseCost = [];

export default function Expenses() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grab the last goal from the redux store
  const lastGoal = useSelector((store) => store.lastGoal);

  // Extract goalId out of array so this work in payload
  let goalId = lastGoal[0];

  // Empty Data for goal form (expense, price, notes)
  let data = [{}];

  //Set state for goal data and form data
  const [goalData, setGoalData] = useState(data);
  const [addFormData, setAddFormData] = useState({
    expense: "",
    price: "",
    notes: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault(event);

    // Get the name attribute from TextField on handleAddSubmit form (expense, price, notes)
    const fieldName = event.target.getAttribute("name");

    // Get the value the user enters into the TextField (expense, price, notes)
    const fieldValue = event.target.value;

    // Spread operator to copy existing form data
    const newFormData = { ...addFormData };

    // Update the object with the new value the user inputs
    newFormData[fieldName] = fieldValue;

    // Set newFormData to state
    setAddFormData(newFormData);
  };

  const handleBudgetSubmit = (event) => {
    event.preventDefault(event);

    // Create new object from addFormData
    const newGoalData = {
      expense: addFormData.expense,
      price: addFormData.price,
      notes: addFormData.notes,
    };

    // Create new array to avoid mutating the state
    const newGoalsData = [...goalData, newGoalData];
    setGoalData(newGoalsData);

    //Set goal id
    newGoalData.goalId = goalId;

    // Push price into totalExpenseCost array as a number
    totalExpenseCost.push(parseInt(newGoalData.price));

    dispatch({
      type: "POST_NEW_EXPENSE",
      payload: newGoalData,
    });
  };

  // function to add each price to the total cost array
  function addExpenses(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum = sum + array[i];
    }
    return sum;
  }
  let totalGoalCost = addExpenses(totalExpenseCost);
  console.log("goalId***", goalId);

  // Adds Total cos of a goal to the database on submit
  const submitTotalGoalCost = () => {
    dispatch({
      type: "PUT_TOTAL_GOAL_COST",
      payload: { goalId, totalGoalCost },
    });
    history.push("/activegoals");
  };

  // Delete expense for the expense table
  function deleteExpense(id) {
    console.log("DELETE BUTTON WORKS");
  }

  console.log(totalGoalCost);

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
          {goalData.map((data, i) => (
            <tr key={i}>
              <td className="expenseTableData">{data.expense}</td>
              <td className="expenseTableData">{data.price}</td>
              <td className="expenseTableData">{data.notes}</td>
              <td>
                <Button
                  onClick={() => deleteExpense(i)}
                  variant="contained"
                  color="secondary"
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total Expense Cost:</td>
            <td>{addExpenses(totalExpenseCost)}</td>
          </tr>
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
        <Button onClick={handleBudgetSubmit} type="submit" variant="contained">
          Add Expense
        </Button>
        <br />
        <Button onClick={submitTotalGoalCost} variant="contained">
          Submit Goal
        </Button>
      </div>
    </div>
  );
}
