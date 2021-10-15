import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* budgetSaga() {
    yield takeLatest("FETCH_ACTIVE_BUDGET_DETAILS", fetchActiveBudgetDetails);
    yield takeLatest("CREATE_NEW_EXPENSE", createNewExpense)
    yield takeLatest("ADD_EXPENSE", addExpense)
    yield takeLatest("UPDATE_EXPENSE", updateExpense);
    yield takeLatest("DELETE_EXPENSE", deleteExpense);


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

    // Creates a new expense row while creating a new goal
    function* createNewExpense(action) {
        try {
            yield axios.post(`/api/budget/creating/new_expense/${action.payload.id}`);
            const response = yield axios.get(`/api/budget/`)
        } catch (error) {
            console.error('Failed to create a new expense', error);
        }
    }

    // Creates a new expense row on a previously made goal
    function* addExpense(action) {
        try {
            yield axios.post('/api/budget/editing/new_expense', action.payload);
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
            yield axios.delete(`/api/budget/${action.payload.id}`);
            const response = yield axios.get(`/api/budget/details/${action.payload.goal_id}`);
            yield put({
                type: "SET_ACTIVE_BUDGET_DETAILS",
                payload: response.data
            })
        } catch (error) {
            console.error('Failed to delete expense', error)
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


} // end budgetSaga