import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* budgetSaga() {
    yield takeLatest("ADD_EXPENSE", addExpense)
    yield takeLatest("FETCH_ACTIVE_BUDGET_DETAILS", fetchActiveBudgetDetails);
    yield takeLatest("UPDATE_EXPENSE", updateExpense);
    yield takeLatest("DELETE_EXPENSE", deleteExpense);

    // Creates a new expense row for the user
    function* addExpense(action) {
        try {
            yield axios.post('/api/budget/new_expense', action.payload);
            const response = yield axios.get(`/api/budget/details/${action.payload}`);
            yield put({
                type: "SET_ACTIVE_BUDGET_DETAILS",
                payload: response.data
            })
        } catch {
            console.error('Failed to create new expense')
        }
    }

    // Delete an expense based on it's id
    function* deleteExpense(action) {
        try {
            yield axios.delete(`/api/budget/${action.payload}`);
        } catch (error) {
            console.error('Failed to delete expense', error)
        }
    }

    // Fetches the expenses pertaining to a specific goal
    function* fetchActiveBudgetDetails(action) {
        try {
            const response = yield axios.get(`/api/budget/details/${action.payload}`);
            yield put({
                type: "SET_ACTIVE_BUDGET_DETAILS",
                payload: response.data
            })
        } catch (error) {
            console.error('Failed to fetch budget details', error)
        }
    }

    // Handles updating a specific expense as the user makes changes
    function* updateExpense(action) {
        try {
            yield axios.put(`/api/budget/${action.payload.id}`, action.payload);
        } catch (error) {
            console.error('Failed to update expense');
        }
    }


} // end export default function budgetSaga