const activeGoalBudgetReducer = (state=[], action) => {
    switch (action.type) {
        case "SET_ACTIVE_BUDGET_DETAILS":
            return action.payload;

        case "UPDATE_EXPENSE":
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload.update
                    }
                }
                return item;
            })

        // case "ADD_EXPENSE":
        //     return [
        //         ...state, 
        //         {
        //             expense: "",
        //             price: Number(""),
        //             notes: ""
        //         }
        //     ];

        default:
            return state;
    }
};

export default activeGoalBudgetReducer;