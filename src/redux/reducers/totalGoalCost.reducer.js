const totalGoalCostReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TOTAL_GOAL_COST":
      return action.payload;
    default:
      return state;
  }
};

export default totalGoalCostReducer;
