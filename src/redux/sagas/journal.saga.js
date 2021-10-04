import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export default function* journalSaga() {
    yield takeLatest("ADD_JOURNAL_POST", addJournalPost);

    function* addJournalPost(action) {
        try {
            axios.post('/api/journal', action.payload);


            
            // yield put({
            //     //Fetch from server
            //     type: 'FETCH_BREWERY',
            //     payload: action.payload
            // })

        } catch (error) {
            console.error("Error posting new journal entry", error)
        }
    } // end addJournalPost

} // end export default journalSaga