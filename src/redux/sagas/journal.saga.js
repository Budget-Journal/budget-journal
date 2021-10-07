import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* journalSaga() {
    yield takeLatest("FETCH_ACTIVE_GOALS", fetchActiveGoals);
    yield takeLatest("FETCH_COMPLETED_GOAL_POSTS", fetchCompletedGoalPosts);
    yield takeLatest("FETCH_JOURNAL_POSTS", fetchJournalPosts);
    yield takeLatest("ADD_JOURNAL_POST", addJournalPost);
    
    // Fetch the current goals that listed as incomplete
    function* fetchActiveGoals() {
        try {
            const response = yield axios.get('/api/journalSelectGoal');
            console.log("current active goals", response);
            yield put({
                type: "SET_JOURNAL_SELECT_GOAL",
                payload: response.data
            })
        } catch (error) {
            console.error("Error fetching active goals", error)
        };
    };

    // Fetch the journal posts related the goal card
    function* fetchCompletedGoalPosts(action) {
        try {
            const response = yield axios.get(`/api/journal/${action.payload}`);
            // IF ^ doesn't work, use the code below
            // const response = yield axios.get('/api/journal/', {params: {id: action.payload}});
            yield put({
                type: 'SET_COMPLETED_GOAL_JOURNAL_POSTS',
                payload: response.data
            })
        } catch (error) {
            console.error("Error fetching completed ")
        }
    }; 

    // Fetch all the journal posts related to the user
    function* fetchJournalPosts() {
        try {
            const response = yield axios.get('/api/journal');
            console.log('axios response', response.data);
            yield put({ 
                type: 'SET_JOURNAL_POST', 
                payload: response.data
             })
        } catch (error) {
            console.error("Error fetching journal posts", error);
        };
    };
    
    // Add journal post in the db related to the user
    function* addJournalPost(action) {
        try {
            console.log("payload", action.payload);
            axios.post('/api/journal', action.payload);
        } catch (error) {
            console.error("Error posting new journal entry", error);
        };
    }; // end addJournalPost

    

}; // end export default journalSaga