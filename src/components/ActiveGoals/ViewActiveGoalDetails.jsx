import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react";
import { TextField, Button } from "@mui/material";

// import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "./EditorToolbar";
// import "react-quill/dist/quill.snow.css";

// Import other components
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';
import BudgetTable from './ViewActiveGoalBudget';



export default function ViewActiveGoalDetails() {
    const dispatch = useDispatch();

    React.useEffect(() => {

    }, [budgetDetails]);

    // // Quill local state
    // const [state, setState] = React.useState('');

    // Obtaining data from reducers
    const goalDetails = useSelector(store => store.viewGoalDetails);
    const budgetDetails = useSelector(store => store.budgetTableReducer);
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
             {/* <Card>
                <CardContent>
                     <p>{goalDetails.name}</p>
                    <p>{goalDetails.price}</p>
                     <div dangerouslySetInnerHTML={{__html: goalDetails.reasons}}></div>                  
                    <p>{goalDetails.notes}</p>
                 </CardContent>
            </Card> */}

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