import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* 
    Handles fetchCards
    Handles creating a new goal
    Handles modifying a goal
    Handles completing a goal
*/

// Fetch all the goals marked as false
function* fetchActiveGoals() {
    try{
        const response = yield axios.get ("api/goal/active");
        yield put ({
            type: 'SET_ACTIVE_GOALS',
            payload: response.data
        })
    } catch(error) {
        console.error('Failed to fetch active goals', error);
    }
};

// Fetch all goals marked as true
function* fetchCompletedGoals() {
    try{

        const goals = yield axios.get ("api/goal/completed")

        yield put({ 
            type: 'SET_COMPLETED_GOALS', 
            payload: goals.data
        });
    }catch(error){
        console.log('fetchGoals Error at goal.saga', error)
    }
};


// Fetch the most recent goal
// function* fetchLastGoal(){
//     try {
//         const response = yield axios.get("api/goal/last_goal")
//         yield put({
//             type: 'SET_LAST_GOAL', 
//             payload: response.data
//         });
//     } catch (error) {
//         console.log('fetchLastGoal', error)
//     }
// }

// Card View Details
function* cardViewDetails(action) {
    try{
        const cardDetails = yield axios.get(`/api/goal/details/${action.payload}`)
        yield put ({ 
            type: 'SET_CARD_DETAILS', 
            payload: cardDetails.data})
    }
    catch(error) {
        console.log('cardDetails saga ERROR', error)
    }
};


// Creates new goal on "Create Goal" in navbar or "+" button on welcome page
function* createNewGoal() {
    try {
        // Create new goal and budget in DB
        yield axios.post('/api/goal');

        // Fetch most recent goal created
        const response = yield axios.get("api/goal/last_goal");
        console.log('***** NEW GOAL INFO *****', response.data);
        let goalId = response.data[0].goal_id
        console.log('**********NEW GOAL ID FOR FETCHING EXPENSES', goalId);
        yield put({
            type: 'SET_LAST_GOAL',
            payload: response.data
        });

        // Fetch expenses to new goal
        const expenses = yield axios.get(`/api/budget/details/${goalId}`);
        yield put({
            type: "SET_ACTIVE_BUDGET_DETAILS",
            payload: expenses.data
        })
    } catch (error) {
        console.error('Failed to create new goal', error);
    }
}

// Updates the goal that create when user selects "Create Goal" or "+" button on welcome page
function* updateNewGoal(action) {
    try {
        yield axios.put(`/api/goal/update_goal/${action.payload.id}`, action.payload);
    } catch (error) {
        console.error('Failed to update new goal', error);
    }

};


// Post goals to DB
function* postGoals(action) {
    try{
        yield axios.post('/api/goal', action.payload)
        // Takes information retrieved from DB
        yield put({ 
            type: 'FETCH_LAST_GOAL',
            payload: action.payload
        })  
        // puts it in Fetch Goals Saga and is assigned fetchGoals Function
    }
    catch(error) {
        console.log('Post Goals has an error', error)
    }
};

// Post new expense to the DB
function* postNewExpense(action){
    try {
        yield axios.post('/api/goal/budget', action.payload)
    }
    catch (error) {
        console.log('Post New Expense has an error', error)
    }
}

//Set the Total goal cost once the goal is first created based on expense data
function* putTotalGoalCost(action) {
    try {
        yield axios.put('/api/goal/total_goal_cost', action.payload);
        console.log('******PutTOTALGOALCOST', action.payload);
    }
    catch (error) {
        console.log('Post total goal cost has an error', error)
    }
}

//Update the total goal cost on the active goals view card page
function* updateTotalGoalCost(action){
    try {
        yield axios.put('/api/goal/update_goal_cost', action.payload);
    }
    catch (error) {
        console.log('Post total goal cost has an error', error)
    }
}

//Update a goal
function* updateGoal(action){
    try {
        yield axios.put(`/api/completed/${action.payload.id}`)
    }
    catch (error) {
        console.error('PUT updateGoal has an error', error)
    }
}

function* updateGoalName(action){
    try {
        yield axios.put(`/api/goal/edit_goal_name/${action.payload.id}`, action.payload);
    }
    catch (error) {
        console.error('PUT updateGoal has an error', error)
    }
}

function* updateQuillReasons(action){
    try {
        yield axios.put(`/api/goal/edit_quill/${action.payload.id}`, action.payload);
    }
    catch (error) {
        console.error('PUT updateQuill has an error', error)
    }
}

// Delete an active goal
function* deleteActiveGoal(action){
    try {
        yield axios.delete(`/api/goal/${action.payload.id}`)
    }
    catch (error) {
        console.error('DELETE goal has an error', error)
    }
}

//Delete a completed goal
function* deleteCompletedGoal(action){
    try{
        yield axios.delete(`/api/goal/${action.payload}`);
        yield put({ type: 'FETCH_COMPLETED_GOALS'})
    }
    catch(error){
        console.log('DELETE error')     
    }
};


export default function* goalSaga(){
    yield takeLatest('FETCH_ACTIVE_GOALS', fetchActiveGoals);
    yield takeLatest('FETCH_COMPLETED_GOALS', fetchCompletedGoals);
    // yield takeLatest('FETCH_LAST_GOAL', fetchLastGoal);
    yield takeLatest('CREATE_NEW_GOAL', createNewGoal);
    yield takeLatest('UPDATE_LATEST_GOAL_CREATED', updateNewGoal)

    // Used when a user is editing their previous information
    yield takeLatest('UPDATE_GOAL', updateGoalName);
    yield takeLatest('UPDATE_QUILL', updateQuillReasons);

    yield takeLatest('POST_GOALS', postGoals);
    yield takeLatest('COMPLETED_GOAL_DETAILS', cardViewDetails);
    yield takeLatest('UPDATE_GOAL_COMPLETED', updateGoal);
    yield takeLatest('DELETE_ACTIVE_GOAL', deleteActiveGoal)
    yield takeLatest('DELETE_COMPLETED_GOAL', deleteCompletedGoal);
    yield takeLatest('POST_NEW_EXPENSE', postNewExpense);
    yield takeLatest('PUT_TOTAL_GOAL_COST', putTotalGoalCost);
    yield takeLatest('UPDATE_TOTAL_GOAL_COST', updateTotalGoalCost);
}``