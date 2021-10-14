import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    console.log('SET USER ******', response.data);
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* postBudget(action){
  try{
    yield axios.put('/api/budget', action.payload);
    console.log("Testing the Budget", action.payload);
    yield put({type: 'FETCH_USER'})
    
  }catch{
    console.log("put/Error");
  }
}

function* updateAddToBudget(action){
  try {
    yield axios.put('/api/budget/add_to_budget', action.payload);
  } catch {
    console.log("put/Error");
  }
}
 
    




function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('POST_BUDGET', postBudget);
  yield takeLatest('UPDATE_ADD_TO_USER_BUDGET', updateAddToBudget);
}

export default userSaga;
