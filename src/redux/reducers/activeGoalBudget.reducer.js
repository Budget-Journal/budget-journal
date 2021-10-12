const activeGoalsReducer = (state=[], action) => {
    switch (action.type) {
        case "SET_ACTIVE_BUDGET_DETAILS":
            return action.payload;
        case "UPDATE_EXPENSE":
            return state.map(item => {
                if (item.id === action.payload.id){
                    return {
                        ...item,
                        ...action.payload
                    }     
                }
                return state;
            })
        case "ADD_EXPENSE":
            return [
                ...state, 
                {
                    expense: "",
                    notes: "",
                    price: ""
                }
            ]
        default:
            return state;
    }
};

export default activeGoalsReducer;