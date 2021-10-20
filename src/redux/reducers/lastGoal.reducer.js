const lastGoalReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LAST_GOAL":
      return action.payload;
    default:
      return state;
  }
};

export default lastGoalReducer;
