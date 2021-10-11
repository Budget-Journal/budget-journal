import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* budgetSaga() {
    yield takeLatest("FETCH_ACTIVE_BUDGET_DETAILS", fetchActiveBudgetDetails);

    function* fetchActiveBudgetDetails(action) {
        try {
            const response = yield axios.get(`/api/budget/details/${action.payload}`);
            console.log(`Budget Details for goal ${action.payload}`, response.data);
            yield put ({
                type: "SET_ACTIVE_BUDGET_DETAILS",
                payload: response.data
            })
        } catch (error) {
            console.error('Failed to fetch budget details', error)
        }
    }


} // end export default function budgetSaga