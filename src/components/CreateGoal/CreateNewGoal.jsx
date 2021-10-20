import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// Material UI Imports
import { TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import Divider from "@mui/material/Divider";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

// Quill Imports
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

// Component Imports
import CreateNewExpense from "./CreateNewExpense";

export default function CreateNewGoal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const lastGoal = useSelector((store) => store.lastGoal);
  const budgetDetails = useSelector((store) => store.budgetTableReducer);

  // Set array to push each goal price into
  let totalGoalCost = [];

  // Push the price of the budgetDetails to the totalGoalCost array
  for (let i = 0; i < budgetDetails.length; i++) {
    totalGoalCost.push(parseInt(budgetDetails[i].price));
    console.log(totalGoalCost);
  }

  // Set totalGoalCostSum to 0
  let totalGoalCostSum = 0;

  // Add each price of the totalGoalCost array to the totalGoalCostSum
  for (let i = 0; i < budgetDetails.length; i++) {
    totalGoalCostSum = totalGoalCostSum + totalGoalCost[i];
    totalGoalCostSum.toFixed(2);
  }

  const [state, setState] = React.useState("");
  const [goal, setGoal] = React.useState("");

  React.useEffect(() => {}, [budgetDetails]);

  const handleQuillChange = (value) => {
    // console.log('Change', value);
    setState(value);
  };

  // Delete goal and expenses
  // Take user back to home page
  const cancelCreateGoal = () => {
    history.push("/activegoals");
    console.log("Cancel Creating New Goal");
    // Will dispatch to delete the created goal
  };

  // Add a new expense row
  const addExpenseRow = () => {
    console.log("Add Expense Row");
    dispatch({
      type: "CREATE_NEW_EXPENSE",
      payload: {
        id: lastGoal[0].goal_id,
      },
    });
  };

  // Update the goal's information from user inputs
  const createGoal = () => {
    console.log("Create new goal");
    dispatch({
      type: "UPDATE_LATEST_GOAL_CREATED",
      payload: {
        id: lastGoal[0].goal_id,
        name: goal,
        reasons: state,
      },
    });

    // Update the total goal cost
    dispatch({
      type: "PUT_TOTAL_GOAL_COST",
      payload: { goalId: lastGoal[0].goal_id, totalGoalCostSum },
    });

    history.push("/activegoals");
  };

  return (
    <div justifyContent="center">
      <TextField
        label="Set a Goal..."
        size="small"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
      />
      <br />
      <br />

      <EditorToolbar />
      <ReactQuill
        className="quill"
        theme="snow"
        value={state}
        onChange={handleQuillChange}
        placeholder={
          "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
        }
        modules={modules}
        formats={formats}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Expense</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Notes</TableCell>
          </TableHead>
          <TableBody>
            {budgetDetails.map((expense) => (
              <CreateNewExpense lastGoal={goal} expense={expense} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Divider />
      <br />
      <Button variant="outlined" onClick={() => addExpenseRow()}>
        Add Expense
      </Button>
      <Button
        variant="outlined"
        style={{ float: "right" }}
        align="right"
        onClick={() => createGoal()}
      >
        Create Goal
      </Button>
      <Button
        style={{ color: "red", float: "right" }}
        onClick={() => cancelCreateGoal()}
      >
        Cancel
      </Button>
    </div>
  );
} // end CreateNewGoal
