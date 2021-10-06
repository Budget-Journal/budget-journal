const journalReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_JOURNAL_POST':
            return action.payload;
        case 'SET_COMPLETED_GOAL_JOURNAL_POSTS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default journalReducer;