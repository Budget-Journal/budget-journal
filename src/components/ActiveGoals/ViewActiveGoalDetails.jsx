import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../CreateGoal/EditorToolbar";
 
// Import other components
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';
import BudgetTable from './ViewActiveGoalBudget';

export default function ViewActiveGoalDetails() {
    // Set hooks to variables 
    const dispatch = useDispatch();
    const history = useHistory();

    // When budgetDetails.reducer updates, rerender the page
    React.useEffect(() => {}, [budgetDetails]);

    // Obtaining data from reducers
    const goalDetails = useSelector(store => store.viewGoalDetails);
    const budgetDetails = useSelector(store => store.budgetTableReducer);
    const journal = useSelector(store => store.journalPosts);
    let goalId = goalDetails.id

    // Create an array to store all the prices
    let totalExpenseCost = [];

    // Add prices to the totalExpenseCost array
    for (let i = 0; i < budgetDetails.length; i++){
        totalExpenseCost.push(parseInt(budgetDetails[i].price));
        console.log(totalExpenseCost);
    }

    // Calculate the sum of the prices
    function addExpenses(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + array[i]
        }
        return sum;
    }
    // Variable used to send off
    let totalGoalCost = addExpenses(totalExpenseCost)


    // Local state of Quill
    const [state, setState] = React.useState(goalDetails.reasons);

    // Handles edits to the goal title
    const handleEditGoal = (e) => {
        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goalDetails.id,
                update: {...goalDetails, [e.target.name]: e.target.value},
            } 
        })
    }

    // Handle edits to Quill
    const handleQuillEdits = value => {
        setState(value);
        dispatch({
            type: "UPDATE_QUILL",
            payload:{
                id: goalDetails.id, 
                update: state
            }
        })
    }

    // Updates the total goal cost in DB
    // Sends user back to home page
    const submitChanges = () => {
        console.log('Total Goal Cost', totalGoalCost);

        dispatch({
            type: "UPDATE_TOTAL_GOAL_COST",
            payload: { 
                goalId, 
                totalGoalCost }
        });
       
        history.push('/activegoals');
    };

    // Add a new expense row
    const addExpenseRow = () => {
        console.log('Add Expense Row');
        dispatch({
            type: "ADD_EXPENSE",
            payload: {id: goalDetails.id}
        });
        dispatch({
            type: "FETCH_ACTIVE_BUDGET_DETAILS",
            payload: goalDetails.id
        })
    };

    return (
      <div>
    
          <TextField
            label="Goal Name"
            size="small"
            name="name"
            value={goalDetails.name}
            onChange={handleEditGoal}
          />
          <br />
          <br />
          <EditorToolbar />
          <ReactQuill
            className="quill"
            theme="snow"
            value={state}
            onChange={handleQuillEdits}
            placeholder={
              "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
            }
            modules={modules}
            formats={formats}
          />

          <br />
          <br />

          <table>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Price</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {budgetDetails.map((detail) => (
                <BudgetTable goal={goalDetails} detail={detail} />
              ))}
            </tbody>
          </table>
          <Button onClick={() => addExpenseRow()}>New Expense</Button>
          <br />
          <Button onClick={submitChanges}>Submit Changes</Button>

        <div>
          <JournalPosts journal={journal} />
        </div>
      </div>
    );
} // end export default function