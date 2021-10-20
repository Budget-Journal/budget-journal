const ViewActiveGoalDetails = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVE_GOAL_DETAILS":
      return action.payload;

    case "UPDATE_GOAL":
      return { ...state, ...action.payload.update };

    case "UPDATE_QUILL":
      return { ...state, ...action.payload.update };

    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default ViewActiveGoalDetails;
