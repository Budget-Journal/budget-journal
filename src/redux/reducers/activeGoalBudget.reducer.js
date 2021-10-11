const activeGoalsReducer = (state=[], action) => {
    switch (action.type) {
        case "SET_ACTIVE_BUDGET_DETAILS":
            return action.payload;
        default:
            return state;
    }
};

export default activeGoalsReducer;