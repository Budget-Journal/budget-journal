import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react";
import { TextField, Button } from "@mui/material";

// Import other components
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';
import BudgetTable from './ViewActiveGoalBudget';



export default function ViewActiveGoalDetails() {
    const dispatch = useDispatch();

    React.useEffect(() => {

    }, [budgetDetails]);

    // Obtaining data from reducers
    const goalDetails = useSelector(store => store.activeGoalDetails);
    const budgetDetails = useSelector(store => store.activeGoalBudgetReducer);
    const journal = useSelector(store => store.journalPosts);
    console.log("Goal details", goalDetails);

    // Local state to handle any edits a user makes to their goals
    // State begins as their previous information
    const [goalEdits, setGoalEdits] = useState({
        name: goalDetails.name,
        reasons: goalDetails.reasons 
    });

    const handleGoalEdits = (e) => {
        setGoalEdits({
            ...goalEdits, [e.target.name]: e.target.value
        });
    };

    const submitChanges = (e) => {
        e.preventDefault(e);
        dispatch({
            type: "UPDATE_GOAL",
            payload: goalEdits
        });
    };

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

    return(
        <div>
            <form onSubmit={submitChanges}>
                <TextField
                    label="Goal Name"
                    size="small"
                    placeholder="Goal Name"
                    name="name"
                    value={goalEdits.name}
                    onChange={handleGoalEdits}
                /> 
                <br /><br />

                <TextField
                    label="Reasons"
                    className="reasonsBox"
                    placeholder="What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
                    multiline
                    rows={4}
                    name="reasons"
                    value={goalEdits.reasons}
                    onChange={handleGoalEdits}
                />
                <br /><br />

                <table>
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Price</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetDetails.map(detail => (
                            <BudgetTable goal={goalDetails} detail={detail} />
                        ))}
                    </tbody>
                </table>
                <Button onClick={(() => addExpenseRow())}>New Expense</Button> 
                <br />
                <Button type="submit">Submit Changes</Button>
       
            </form>
            <div> 
                <JournalPosts journal={journal}/> 
            </div>
        </div>
    )
} // end export default function