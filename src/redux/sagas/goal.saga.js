import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/* 
    Handles fetchCards
    Handles creating a new goal
    Handles modifying a goal
    Handles completing a goal
*/

function* fetchGoals() {
    try{
        const goals = yield axios.get ("api/goal") //Server
        console.log("get goals", goals.data);
        yield put({ 
            type: 'SET_GOALS', //Set
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


export default function* goalSaga(){
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('POST_GOALS', postGoals);
    yield takeLatest('CARD_VIEW_DETAILS', cardViewDetails);


}