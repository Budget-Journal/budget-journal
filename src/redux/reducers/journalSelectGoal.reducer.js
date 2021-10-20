const journalSelectGoalReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOURNAL_SELECT_GOAL":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default journalSelectGoalReducer;
