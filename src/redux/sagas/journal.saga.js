import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* journalSaga() {
    yield takeLatest("FETCH_JOURNAL_POSTS", fetchJournalPosts)
    yield takeLatest("ADD_JOURNAL_POST", addJournalPost);

    function* addJournalPost(action) {
        try {
            console.log("payload", action.payload);
            axios.post('/api/journal', action.payload);

            // yield put({
            //     //Fetch from server
            //     type: 'FETCH_BREWERY',
            //     payload: action.payload
            // })

        } catch (error) {
            console.error("Error posting new journal entry", error);
        }
    } // end addJournalPost

    function* fetchJournalPosts() {
        try {
            const response = yield axios.get('/api/journal');
            console.log('axios response', response.data);
            yield put({ type: 'SET_JOURNAL_POST', payload: response.data })
            
        } catch (error) {
            console.error("Error fetching journal posts", error);
        }
    }

} // end export default journalSaga