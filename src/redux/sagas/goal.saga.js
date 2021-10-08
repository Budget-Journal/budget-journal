import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* 
    Handles fetchCards
    Handles creating a new goal
    Handles modifying a goal
    Handles completing a goal
*/

function* fetchActiveGoals() {
    try{
        const response = yield axios.get ("api/goal/active");
        console.log("Current active goals*****************", response.data);
        yield put ({
            type: 'SET_ACTIVE_GOALS',
            payload: response.data
        })
    } catch(error) {
        console.error('Failed to fetch active goals', error);
    }
};

function* fetchCompletedGoals() {
    try{
        const goals = yield axios.get ("api/goal/completed") //Server
        console.log("get goals", goals.data);
        yield put({ 
            type: 'SET_COMPLETED_GOALS', //Set
            payload: goals.data
        });
    }catch(error){
        console.log('fetchGoals Error at goal.saga', error)
    }
};
// Card View Details
function* cardViewDetails(action) {
    try{
        const cardDetails = yield axios.get(`/api/goal/details/${action.payload}`)
        console.log('WHERES MY STUFF*******', cardDetails)
        yield put ({ 
            type: 'SET_CARD_DETAILS', 
            payload: cardDetails.data})
    }
    catch(error) {
        console.log('cardDetails saga ERROR', error)
    }
};

function* postGoals(action) {
    try{
        yield axios.post('/api/goal', action.payload)
        // Takes information retrieved from DB
        // Why do we have this?
        yield put({ 
            type: 'SET_GOALS'
        })  
        // puts it in Fetch Goals Saga and is assigned fetchGoals Function
    }
    catch(error) {
        console.log('Post Goals has an error', error)
    }
};


function* updateGoal(action){
    try {
        yield axios.put(`/api/completed/${action.payload.id}`)
    }
    catch (error) {
        console.error('PUT updateGoal has an error', error)
    }
}

function* deleteActiveGoal(action){
    try {
        yield axios.delete(`/api/goal/${action.payload.id}`)
    }
    catch (error) {
        console.error('DELETE goal has an error', error)
    }
}


function* deleteGoal(action){
    try{
        yield axios.delete(`/api/goal/${action.payload}`);
        yield put({
            type: 'FETCH_COMPLETED_GOALS',
        });
    }
    catch(error){
        console.log('DELETE error')     
}
};


export default function* goalSaga(){
    yield takeLatest('FETCH_ACTIVE_GOALS', fetchActiveGoals);
    yield takeLatest('FETCH_COMPLETED_GOALS', fetchCompletedGoals);
    yield takeLatest('POST_GOALS', postGoals);
    yield takeLatest('CARD_VIEW_DETAILS', cardViewDetails);
    yield takeLatest('UPDATE_GOAL_COMPLETED', updateGoal);
    yield takeLatest('DELETE_ACTIVE_GOAL', deleteActiveGoal)
    yield takeLatest('DELETE_GOAL', deleteGoal);
}