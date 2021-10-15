import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../CreateGoal/EditorToolbar";

// import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
// import "react-quill/dist/quill.snow.css";

// Import other components
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';
import BudgetTable from './ViewActiveGoalBudget';

export default function ViewActiveGoalDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {

    }, [budgetDetails]);

    // // Quill local state
    // const [state, setState] = React.useState('');

    // Obtaining data from reducers
    const goalDetails = useSelector(store => store.viewGoalDetails);
    const budgetDetails = useSelector(store => store.budgetTableReducer);
    const journal = useSelector(store => store.journalPosts);
    console.log("Goal details", goalDetails.name);
    // console.log("budgetDetails", budgetDetails);
    // console.log("budgetDetails", budgetDetails.length);
    console.log("Goal details", goalDetails.id);
    let goalId = goalDetails.id

    let totalExpenseCost = [];

    for (let i = 0; i < budgetDetails.length; i++){
        totalExpenseCost.push(parseInt(budgetDetails[i].price));
        console.log(totalExpenseCost);
    }
    function addExpenses(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + array[i]
        }
        return sum;
    }
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

    // const submitChanges = (e) => {
    //     e.preventDefault(e);
    //     console.log('ADD EXPENSE', totalGoalCost);
    //     dispatch({
    //         type: "UPDATE_TOTAL_GOAL_COST",
    //         payload: { goalId, totalGoalCost }
    //     });
       
    //     goalEdits={
    //         name: goal,
    //         reasons: state
    //     }
    //     history.push('/activegoals');
    //     dispatch({
    //         type: "UPDATE_GOAL",
    //         payload: goalEdits
    //     });
    // };

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
        {/* <Card>
                <CardContent>
                     <p>{goalDetails.name}</p>
                    <p>{goalDetails.price}</p>
                     <div dangerouslySetInnerHTML={{__html: goalDetails.reasons}}></div>                  
                    <p>{goalDetails.notes}</p>
                 </CardContent>
            </Card> */}

        <form>
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
            // value={<div dangerouslySetInnerHTML={{__html: goalEdits.reasons}}></div> }
            name="reasons"
            value={state}
            onChange={handleQuillEdits}
            placeholder={
              "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
            }
            modules={modules}
            formats={formats}
          />
          {/* <TextField
                    label="Reasons"
                    className="reasonsBox"
                    placeholder="What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                    multiline
                    rows={4}
                    name="reasons"
                    value={goalEdits.reasons}
                    onChange={handleGoalEdits}
                /> */}

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
          <Button type="submit">Submit Changes</Button>
        </form>

        <div>
          <JournalPosts journal={journal} />
        </div>
      </div>
    );
} // end export default function